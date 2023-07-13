const express = require('express');
// Constants
const PORT = 3001;
const HOST = '0.0.0.0';
// App
const app = express();

app.get('/', (req, res) => {
  res.send('GGWP!!!');
});

app.listen(PORT, HOST);
console.log("app running on port: ${port}")
