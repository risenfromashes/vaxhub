const express = require('express');
// Constants
const PORT = 3001;
const HOST = '0.0.0.0';
// App
const app = express();

app.get('/', (req, res) => {
  res.send(process.env.DB_USERNAME);
});

app.listen(PORT, HOST);
