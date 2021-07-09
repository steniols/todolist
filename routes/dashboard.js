const router = require('express').Router();
const authorization = require('../middleware/authorization');
const queriesUsers = require('../database/queriesUsers');

router.get('/', authorization, async (req, res) => {
  try {
    const user = await queriesUsers.getOne(req.user);
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Ocorreu um erro no servidor');
  }
});

module.exports = router;
