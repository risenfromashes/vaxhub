// server.js
const express = require("express");
const app = express();
const pool = require("./pool");

const cors = require("cors");
const port = 3001;

app.use(cors());

app.use(express.json());
app.use(express.static("frontend/dist"));

// Define a route to handle GET requests
app.get("/api/hello", (req, res) => {
  res.send("Hello, World!");
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
      console.log("Received response from database.");
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
      SELECT vaccination_date, is_vaccinated FROM "Vaccination" WHERE nid = '${formData.nid}';
      `;
    client.query(query, (err, res) => {
      if (err) {
        console.log(err);
        response.sendStatus(400);
        return;
      }
      console.log("Received response from database.");
      if (res.rows.length == 0) {
        // date not yet allocated
        response.sendStatus(400);
        response.status(200).json({ date: null, status: false });
        return;
      } else {
        console.log("User found!");
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
    SELECT current_date + INTERVAL '3 days' AS date_in_three_days;
    SELECT id FROM "User" WHERE nid = '${formData.nid}' AS user_id;
    SELECT vaccine_id FROM your_table_name ORDER BY count ASC LIMIT 1 AS vaccine_id;
    INSERT INTO "Vaccination" (user_id, vaccine_id, vaccination_date, is_vaccinated) VALUES (user_id, vaccine_id, date_in_three_days, false);
      `;
    client.query(query, (err, res) => {
      if (err) {
        console.log(err);
        response.sendStatus(400);
        return;
      }
      console.log("Received response from database.");
      if (res.rows.length == 0) {
        // date not yet allocated
        response.sendStatus(400);
        response.status(200).json({ date: null, status: false });
        return;
      } else {
        console.log("User found!");
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

// Start the server
module.exports = app;

pool.connect((err, client, release) => {
  if (err) {
    console.log(`Failed to start database: ${err}`);
  } else {
    global.client = client;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
