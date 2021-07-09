const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  try {
    const jwtToken = req.header('token');

    if (!jwtToken) {
      res.status(403).json({ msg: 'Não autorizado' });
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    req.user = payload.user;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(403).json('Não autorizado');
  }
};
