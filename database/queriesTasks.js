const knex = require('./knex');

module.exports = {
  async getAll(user_id) {
    return knex('tasks').where('task_user_id', user_id);
  },

  async create(data) {
    return knex('tasks').insert(data, '*');
  },

  async update(id, data) {
    return knex('tasks').where('task_id', id).update(data, '*');
  },

  async delete(id) {
    return knex('tasks').where('task_id', id).del();
  },
};
