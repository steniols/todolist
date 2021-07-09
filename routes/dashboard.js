const router = require('express').Router();
const authorization = require('../middleware/authorization');
const queriesUsers = require('../database/queriesUsers');

router.get('/', authorization, async (req, res) => {
  try {
    const user = await queriesUsers.getOne(req.user);
    console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
