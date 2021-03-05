const knex = require("knex");

const knexfile = require("../../knexfile");

const environment = process.env.ENVIRONMENT || 'development'

module.exports = knex(knexfile[environment]);