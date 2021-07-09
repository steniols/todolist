exports.up = function (knex) {
  return knex.schema.createTable('users', function (t) {
    t.increments('user_id').unsigned().primary();
    t.text('user_name').notNull();
    t.text('user_email').notNull();
    t.text('user_password').notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
