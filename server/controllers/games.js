const models = require('../../db/models');
const knex = require('../../db').knex;

module.exports.addGame = (winner, loser) => {

  let rawSql = `INSERT INTO games (winner, loser) 
                VALUES (${winner}, ${loser})`;
  knex.raw(rawSql)
    .catch(err => {
      console.log('error inserting into games table');
      console.log(err);
    });
};

module.exports.getGameHistory = (req, res) => {
  let rowsWin,
    id = req.params.id;

  let rawSql = `SELECT p.display FROM profiles p 
    JOIN games g ON p.id = g.loser 
    WHERE g.winner = ${id}`;

  knex.raw(rawSql)
    .then(({rows}) => {
      rows.forEach(win => win.win = true);
      rowsWin = rows;
      rawSql = `SELECT p.display FROM profiles p 
      JOIN games g ON p.id = g.winner 
      WHERE g.loser = ${id}`;

      return knex.raw(rawSql);
    })
    .then(({rows}) => {

      res.status(200).send(rows.concat(rowsWin));
    })
    .catch(err => {
      console.log('the error is ', err);
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });

  // new models.Profile({id: 1})
  //   // .where('profile_id', 1)
  //   // .fetch()
  //   .fetch({withRelated: ['games']})
  //   .then(games => {
  //     res.status(200).send(games);
  //   })
  //   .catch(err => {
  //     // This code indicates an outside service (the database) did not respond in time
  //     res.status(503).send(err);
  //   });
};
