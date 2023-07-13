const express = require("express");
// Constants
const PORT = 3001;
const HOST = "0.0.0.0";
// App
const app = express();

function decodeBase64(str) {
  return Buffer.from(str, "base64").toString("ascii");
}

app.get("/", (req, res) => {
  res.send(process.env.DB_USERNAME);
});

app.listen(PORT, HOST);
