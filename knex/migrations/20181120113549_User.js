
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('email');
      table.string('first_name');
      table.string('last_name');
      table.timestamp('date');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
  ]);
};
