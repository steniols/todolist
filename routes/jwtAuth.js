const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validinfo');
const authorization = require('../middleware/authorization');
const queries = require('../database/queriesUsers');

router.post('/register', validInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
    //   email,
    // ]);
    const user = await queries.getOneByEmail(email);

    if (user) {
      return res.status(401).json('User already exists');
    }
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // const newUser = await pool.query(
    //   'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
    //   [name, email, bcryptPassword]
    // );

    const newUser = await queries.create({
      user_name: name,
      user_email: email,
      user_password: bcryptPassword,
    });

    const token = jwtGenerator(newUser[0].user_id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/login', validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;

    // const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
    //   email,
    // ]);
    const user = await queries.getOneByEmail(email);
    console.log(user);

    if (!user) {
      return res.status(401).json('Password or Email is incorrect');
    }

    const validPassword = await bcrypt.compare(password, user.user_password);

    if (!validPassword) {
      return res.status(401).json('Password or Email is incorrect');
    }

    const token = jwtGenerator(user.user_id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/is-verify', authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
