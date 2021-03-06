const { v4: uuidv4 } = require('uuid');

exports.up = function(knex) {
  return knex.schema.createTable('records', function (table) {
    table.uuid('id').primary().defaultTo(uuidv4());
    table.uuid('user_id').notNullable();
    table.date('date').notNullable();
    table.time('time').notNullable();
    table.json('location').notNullable();
    table.text('picture').notNullable();
    table.boolean('enabled').defaultTo(true);
    table.timestamps(false, true);

    table.foreign('user_id').references('users.id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('records');
};
