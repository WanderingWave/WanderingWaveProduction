'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles;

router.route('/')
  .get(ProfileController.getAll);

router.route('/userProfileInfo')
  .get((req, res) => {
    ProfileController.getOne(req, res);
  });

router.route('/userMatchHistory')
  .get((req, res) => {
    MatchController.getAll(req, res);
  });

router.route('/:id')
  .get(ProfileController.getOne);

module.exports = router;
