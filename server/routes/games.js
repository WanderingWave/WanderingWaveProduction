'use strict';
const express = require('express');
const router = express.Router();
const GamesController = require('../controllers').Games;

router.route('/gamesHistory/:id')
  .get((req, res) => {
    console.log('inside gamesHistory');
    GamesController.getGameHistory(req, res);
    // console.log('inside the user profile info');
    // res.status(200).send('success');
  });

router.route('/leaderBoard')
  .get((req, res) => {

  });

module.exports = router;
