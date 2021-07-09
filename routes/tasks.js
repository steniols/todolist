const router = require('express').Router();
const authorization = require('../middleware/authorization');
const queries = require('../database/queriesTasks');
const queriesUsers = require('../database/queriesUsers');

router.get('/', authorization, async (req, res) => {
  try {
    const tasks = await queries.getAll(req.user);
    res.json(tasks);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Ocorreu um erro no servidor');
  }
});

router.post('/save', authorization, async (req, res) => {
  let errors = [];

  if (!req.body.task_title) {
    errors.push('O título é obrigatório');
  }

  if (errors.length) {
    res.status(400).json({ message: errors });
    return;
  }
  try {
    const user = await queriesUsers.getOne(req.user);
    console.log('user', user);
    const data = {
      task_title: req.body.task_title,
      task_description: req.body.task_description,
      task_user_id: user.user_id,
    };

    const created = await queries.create(data);
    res.json({
      message: 'A tarefa foi salva',
      id: created[0].task_id,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Ocorreu um erro no servidor');
  }
});

router.post('/finish', authorization, async (req, res) => {
  let errors = [];
  console.log(req.body);
  if (!req.body.task_id) {
    errors.push('O ID é obrigatório');
  }

  if (errors.length) {
    res.status(400).json({ message: errors });
    return;
  }
  try {
    const data = {
      task_status: 1,
    };
    const updated = await queries.update(req.body.task_id, data);
    res.json({
      message: 'A tarefa foi concluída',
      id: updated[0].task_id,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Ocorreu um erro no servidor');
  }
});

router.post('/delete', authorization, async (req, res) => {
  let errors = [];
  console.log(req.body);
  if (!req.body.task_id) {
    errors.push('O ID é obrigatório');
  }

  if (errors.length) {
    res.status(400).json({ message: errors });
    return;
  }
  try {
    await queries.delete(req.body.task_id);
    res.json({
      message: 'A tarefa foi excluída',
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Ocorreu um erro no servidor');
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
