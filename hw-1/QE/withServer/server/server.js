const express = require('express');
const app = express();
const home = require('./routes/home').router;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/', home);

app.listen(3502, () => {
  console.log(`listen on port 3502`);
});