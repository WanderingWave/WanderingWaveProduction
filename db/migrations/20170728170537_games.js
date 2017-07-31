
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('games', function (table) {
    table.integer('winner').references('profiles.id');
    table.integer('loser').references('profiles.id');
  });
};

exports.down = function(knex, Promise) {
  return Promise(knex.schema.dropTable('games'));
};
