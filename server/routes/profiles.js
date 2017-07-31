'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles;

router.route('/')
  .get(ProfileController.getAll)
  // .post(ProfileController.create)
  ;
router.route('/userProfileInfo')
  .get((req, res) => {
    ProfileController.getOne(req, res);
    // console.log('inside the user profile info');
    // res.status(200).send('success');
  });
  // .post(ProfileController.create)
  ;

router.route('/userMatchHistory')
  .get((req, res) => {
    MatchController.getAll(req, res);
    // console.log('inside the user profile info');
    // res.status(200).send('success');
  });
  // .post(ProfileController.create)
  ;

router.route('/:id')
  .get(ProfileController.getOne)
  // .put(ProfileController.update)
  // .delete(ProfileController.deleteOne)
  ;

module.exports = router;
