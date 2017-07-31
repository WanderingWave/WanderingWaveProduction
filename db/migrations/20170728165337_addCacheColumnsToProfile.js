
exports.up = function(knex, Promise) {
  return knex.schema.table('profiles', function(t) {
    t.integer('games_played').notNull().defaultTo(0);
    t.integer('games_won').notNull().defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('profiles', function(t) {
    t.dropColumn('games_played');
    t.dropColumn('games_won');
  });
};
