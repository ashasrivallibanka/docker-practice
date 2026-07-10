const express = require('express');
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  res.send('Hello from Dockerized Node.js App!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


