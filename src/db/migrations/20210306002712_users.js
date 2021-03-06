const { v4: uuidv4 } = require('uuid');

exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').primary().defaultTo(uuidv4());
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.enum('role', ['employee', 'manager']).notNullable();
    table.boolean('enabled').defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
