
exports.up = function(knex) {
  return knex.schema.createTable('records', function (table) {
    table.increments();
    table.date('date').notNullable();
    table.time('time').notNullable();
    table.json('location').notNullable();
    table.text('picture').notNullable();
    table.boolean('enabled').defaultTo(true);
    table.timestamps(false, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('records');
};
