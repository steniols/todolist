const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res, next) => {
    if (req.url.includes('api')) return next();
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.unsubscribe(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/jwtAuth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
