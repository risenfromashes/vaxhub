// server.js
const express = require("express");
const app = express();
const pool = require("./pool");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const cors = require("cors");
const port = 3001;
const promBundle = require("express-prom-bundle");
// Add the options to the prometheus middleware most option are for http_request_duration_seconds histogram metric
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: {
    project_name: "vaxhub",
    project_type: "test_metrics_labels",
  },
  promClient: {
    collectDefaultMetrics: {},
  },
});

// add the prometheus middleware to all routes
app.use(metricsMiddleware);

app.use(cors());

app.use(express.json());
app.use(express.static("frontend/dist"));

function generatePDF(name, nid, date, vaccine_name) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream("certificate.pdf"));
  doc.fontSize(25).text("Vaccination Certificate", 100, 50);
  doc.fontSize(15).text("Name: " + name, 100, 150);
  doc.fontSize(15).text("NID: " + nid, 100, 200);
  doc.fontSize(15).text("Vaccination Date: " + date, 100, 250);
  doc.fontSize(15).text("Vaccine Name: " + vaccine_name, 100, 300);
  return doc;
}

// Define a route to handle GET requests
app.get("/api/hello", (req, res) => {
  res.send("Hello, World!");
});

app.get("/", (req, res) => {
  res.sendFile("frontend/dist/index.html");
});

app.post("/login", (req, response) => {
  const formData = req.body;
  console.log(formData);
  try {
    const query = `
      SELECT * FROM "User" WHERE nid = '${formData.nid}';
      `;
    client.query(query, (err, res) => {
      if (err) {
        console.log(err);
        response.sendStatus(400);
        return;
      }
      console.log("Received response from database for login.");
      if (res.rows.length == 0) {
        response.sendStatus(400);
        return;
      } else {
        console.log("User found!");
        response.status(200).json(res.rows[0].name);
        for (let row of res.rows) {
          console.log(row);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
});

app.post("/register", (req, response) => {
  const formData = req.body;
  console.log(formData);
  try {
    const query1 = `
      SELECT * FROM "User" WHERE nid = '${formData.nid}';
      `;

    client.query(query1, (err, res) => {
      if (err) {
        console.log(err);
        response.sendStatus(400);
        return;
      }
      console.log("Received response1 from database for register.");
      if (res.rows.length > 0) {
        console.log("User already exists!");
        response.sendStatus(400);
        return;
      }
      const query2 = `
      INSERT INTO "User" (nid, name, address) VALUES ('${formData.nid}', '${formData.name}', '${formData.address}');
      `;
      client.query(query2, (err) => {
        if (err) {
          console.log(err);
          response.sendStatus(400);
        } else {
          console.log("Received response2 from database for register.");
          response.sendStatus(200);
          console.log("User added to database!");
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
});

app.post("/getdate", (req, response) => {
  const formData = req.body;
  console.log(formData);
  try {
    const query = `
    SELECT vaccination_date::DATE, is_vaccinated FROM "Vaccination" WHERE user_id = (
      SELECT id FROM "User" WHERE nid = '${formData.nid}'
      );
    `;
    client.query(query, (err, res) => {
      if (err) {
        console.log(err);
        response.sendStatus(400);
        return;
      }
      console.log("Received response from database for getdate.");
      if (res.rows.length == 0) {
        // date not yet allocated
        response.status(400).json({ date: null, status: false });
        return;
      } else {
        console.log("Vaccination Date Already Allocated!");
        response.status(200).json({
          date: res.rows[0].vaccination_date,
          status: res.rows[0].is_vaccinated,
        });
        for (let row of res.rows) {
          console.log(row);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
});

app.post("/allocatedate", (req, response) => {
  const formData = req.body;
  console.log(formData);
  try {
    const query = `
    INSERT INTO "Vaccination" (user_id, vaccine_id, vaccination_date, is_vaccinated)
    VALUES (
      ( SELECT id FROM "User" WHERE nid = '${formData.nid}'), 
      ( SELECT vaccine_id FROM "Vaccine" ORDER BY (SELECT COUNT(*) FROM "Vaccination" 
        WHERE vaccine_id = "Vaccine".vaccine_id) ASC LIMIT 1), 
      ( SELECT current_date + INTERVAL '3 days' AS date_in_three_days), false);
      `;
    client.query(query, (err) => {
      if (err) {
        console.log(err);
        response.sendStatus(400);
      } else {
        console.log("Received response1 from database for allocatedate.");
        response.sendStatus(200);
        console.log("Vaccination Date Allocated Now!");
      }
    });
  } catch (e) {
    console.log(e);
  }
});

app.post("/vaccinated", (req, response) => {
  const formData = req.body;
  console.log(formData);
  try {
    const query = `
    SELECT vaccine_id FROM "Vaccination" WHERE user_id = (
      SELECT id FROM "User" WHERE nid = '${formData.nid}'
      );
    `;
    client.query(query, (err, res) => {
      if (err) {
        console.log(err);
        response.sendStatus(400);
        return;
      }
      console.log("Received response from database for is_vaccinated");
      if (res.rows.length == 0) {
        // not vaccinated
        response.sendStatus(400);
        return;
      } else {
        console.log("Vaccinated");
        response.sendStatus(200);
      }
    });
  } catch (e) {
    console.log(e);
  }
});

app.post("/getcert", (req, response) => {
  const formData = req.body;
  console.log(formData);
  try {
    const query = `
    SELECT "User".name AS name, "User".nid AS nid, "Vaccination".vaccination_date AS date, "Vaccine".vaccine_name AS vaccine_name
    FROM "User", "Vaccination", "Vaccine"
    WHERE "User".id = "Vaccination".user_id AND "Vaccination".vaccine_id = "Vaccine".vaccine_id
    AND "User".nid = '${formData.nid}';
    `;

    client.query(query, (err, res) => {
      if (err) {
        console.log(err);
        response.sendStatus(400);
        return;
      }
      console.log("Received response from database for getcert.");
      if (res.rows.length == 0) {
        // not vaccinated
        response.sendStatus(400);
        return;
      } else {
        console.log("Certificate Generated", res.rows[0]);
        // response.sendStatus(200);
        res.rows[0].date = res.rows[0].date.toDateString().slice(0, 10);
        const pdfDoc = generatePDF(
          res.rows[0].name,
          res.rows[0].nid,
          res.rows[0].date,
          res.rows[0].vaccine_name
        );
        response.setHeader("Content-Type", "application/pdf");
        response.setHeader(
          "Content-Disposition",
          "attachment; filename=certificate.pdf"
        );

        pdfDoc.pipe(response);
        pdfDoc.end();

        console.log("PDF sent");
      }
    });
  } catch (e) {
    console.log(e);
  }
});

app.get("/*", function (req, res) {
  res.redirect("/");
});

// Start the server
module.exports = app;

pool.connect((err, client, release) => {
  if (err) {
    console.log(`Failed to start database: ${err}`);
  } else {
    global.client = client;
    app.listen(port, () => {
      console.log(`Server is running on port ${port} `);
    });
  }
});
