const knex = require('knex');
// const knexConfig = require('../knexfile.js');

const environment = process.env.DB_ENV || "development";
const config = require("../knexfile.js")[environment];

module.exports = knex(config);

// module.exports = knex(knexConfig.development);
