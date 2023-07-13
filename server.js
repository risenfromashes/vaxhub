// server.js
const express = require("express");
const app = express();
const pool = require("./pool");
const prom = require("prom-client");

const collectDefaultMetrics = prom.collectDefaultMetrics();
const registry = new prom.Registry();
const httpRequestTimer = new prom.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10], // 0.1 to 10 seconds
});
registry.registerMetric(httpRequestTimer);

const cors = require("cors");
const port = 3001;

app.use(cors());

app.use(express.json());
app.use(express.static("frontend/dist"));

app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", prom.register.contentType);
    res.end(await prom.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

// Define a route to handle GET requests
app.get("/api/hello", (req, res) => {
  res.send("Hello, World!");
});

app.post("/login", (req, response) => {
  const end = httpRequestTimer.startTimer();
  const route = req.route.path;
  const formData = req.body;
  try {
    const query = `
      SELECT * FROM "User" WHERE nid = '${formData.nid}';
      `;
    client.query(query, (err, res) => {
      if (err) {
        console.log(err);
        response.sendStatus(400);
        end({ route, code: response.statusCode, method: req.method });
        return;
      }
      console.log("Received response from database.");
      if (res.rows.length == 0) {
        response.sendStatus(400);
        end({ route, code: response.statusCode, method: req.method });
        return;
      } else {
        console.log("User found!");
        response.status(200).json(res.rows[0].name);
        end({ route, code: response.statusCode, method: req.method });
      }
    });
  } catch (e) {
    console.log(e);
    response.status(500).end(e);
    end({ route, code: response.statusCode, method: req.method });
  }
});

app.post("/register", (req, response) => {
  const end = httpRequestTimer.startTimer();
  const route = req.route.path;
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
        end({ route, code: response.statusCode, method: req.method });
        return;
      }
      if (res.rows.length > 0) {
        console.log("User already exists!");
        response.sendStatus(400);
        end({ route, code: response.statusCode, method: req.method });
        return;
      }
      const query2 = `
      INSERT INTO "User" (nid, name, address) VALUES ('${formData.nid}', '${formData.name}', '${formData.address}');
      `;
      client.query(query2, (err) => {
        if (err) {
          console.log(err);
          response.sendStatus(400);
          end({ route, code: response.statusCode, method: req.method });
        } else {
          response.sendStatus(200);
          console.log("User added to database!");
          end({ route, code: response.statusCode, method: req.method });
        }
      });
    });
  } catch (e) {
    console.log(e);
    response.status(500).end(e);
    end({ route, code: response.statusCode, method: req.method });
  }
});

app.post("/getdate", (req, response) => {
  const end = httpRequestTimer.startTimer();
  const route = req.route.path;
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
        end({ route, code: response.statusCode, method: req.method });
        return;
      }
      console.log("Received response from database.");
      if (res.rows.length == 0) {
        // date not yet allocated
        response.sendStatus(400);
        response.status(200).json({ date: null, status: false });
        end({ route, code: response.statusCode, method: req.method });
        return;
      } else {
        console.log("User found!");
        response.status(200).json({
          date: res.rows[0].vaccination_date,
          status: res.rows[0].is_vaccinated,
        });
        end({ route, code: response.statusCode, method: req.method });
        for (let row of res.rows) {
          console.log(row);
        }
      }
    });
  } catch (e) {
    console.log(e);
    response.status(500).end(e);
    end({ route, code: response.statusCode, method: req.method });
  }
});

app.post("/allocatedate", (req, response) => {
  const end = httpRequestTimer.startTimer();
  const route = req.route.path;
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
        end({ route, code: response.statusCode, method: req.method });
        return;
      }
      console.log("Received response from database.");
      if (res.rows.length == 0) {
        // date not yet allocated
        response.sendStatus(400);
        response.status(200).json({ date: null, status: false });
        end({ route, code: response.statusCode, method: req.method });
      } else {
        console.log("User found!");
        response.status(200).json({
          date: res.rows[0].vaccination_date,
          status: res.rows[0].is_vaccinated,
        });
        end({ route, code: response.statusCode, method: req.method });
        for (let row of res.rows) {
          console.log(row);
        }
      }
    });
  } catch (e) {
    console.log(e);
    response.status(500).end();
    end({ route, code: response.statusCode, method: req.method });
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
