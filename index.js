const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
require('dotenv').config();
app.use(cors());
app.use(express.json());

const dbConnection = require('./config/mongoose');

dbConnection().then(() => {
  app.use('/api', require('./routes/userRoutes'));
  app.use('/api', require('./routes/noteRoutes'));
  app.listen(PORT, () => {
    console.log('server successfully connected on', PORT);
  });
});
