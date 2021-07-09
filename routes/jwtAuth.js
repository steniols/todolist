const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validinfo');
const authorization = require('../middleware/authorization');
const queries = require('../database/queriesUsers');

router.post('/register', validInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await queries.getOneByEmail(email);

    if (user) {
      return res.status(401).json('Usuário já existente');
    }
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await queries.create({
      user_name: name,
      user_email: email,
      user_password: bcryptPassword,
    });

    const token = jwtGenerator(newUser[0].user_id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Ocorreu um erro no servidor');
  }
});

router.post('/login', validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await queries.getOneByEmail(email);
    console.log(user);

    if (!user) {
      return res.status(401).json('Dados incorretos');
    }

    const validPassword = await bcrypt.compare(password, user.user_password);

    if (!validPassword) {
      return res.status(401).json('Dados incorretos');
    }

    const token = jwtGenerator(user.user_id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Ocorreu um erro no servidor');
  }
});

router.get('/is-verify', authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Ocorreu um erro no servidor');
  }
});

module.exports = router;
