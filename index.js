const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}
app.use(express.static(path.join(__dirname, 'client/build')));

console.log(path.join(__dirname, 'client/build'));

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

app.use('/auth', require('./routes/jwtAuth'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/tasks', require('./routes/tasks'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
