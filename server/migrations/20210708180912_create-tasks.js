exports.up = function (knex) {
  return knex.schema.createTable('tasks', function (t) {
    t.increments('task_id').unsigned().primary();
    t.text('task_title').notNull();
    t.text('task_description').notNull();
    t.integer('task_user_id').notNull();
    t.integer('task_status');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tasks');
};
