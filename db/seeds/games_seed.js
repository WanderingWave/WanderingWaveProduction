
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {winner: 1, loser: 2},
        {winner: 1, loser: 2},
        {winner: 1, loser: 2},
        {winner: 1, loser: 2},
        {winner: 1, loser: 2},
        {winner: 2, loser: 1},
        {winner: 2, loser: 1}
      ]);
    });
};
