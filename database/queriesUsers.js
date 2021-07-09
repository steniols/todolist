const knex = require('./knex');

module.exports = {
  async getOne(id) {
    return knex('users').where('user_id', id).first();
  },
  async getOneByEmail(email) {
    return knex('users').where('user_email', email).first();
  },
  async create(data) {
    return knex('users').insert(data, '*');
  },
};
