const { Pool } = require("pg");

function decodeBase64(str) {
  return Buffer.from(str, "base64").toString("ascii").trim();
}

const pool = new Pool({
  user: decodeBase64(process.env.DB_USERNAME),
  host: decodeBase64(process.env.DB_HOST),
  database: "postgres",
  password: decodeBase64(process.env.DB_PASSWORD),
  port: parseInt(decodeBase64(process.env.DB_PORT)), // Default PostgreSQL port is 5432
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
