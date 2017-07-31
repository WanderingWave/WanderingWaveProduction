const knex = require('knex')(require('../knexfile'));
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports.bookshelf = bookshelf;
module.exports.knex = knex;


