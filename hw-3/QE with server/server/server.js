const express = require('express');
const app = express();
const home = require('./routes/home').router;
const cors = require('cors');
const helmet = require('helmet');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/', home);

app.listen(3502, () => {
  console.log(`listening on port 3502...`);
});