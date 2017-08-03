const models = require('../../db/models');

module.exports.getAll = (req, res, callback) => {

  models.Profile.fetchAll()
    .then(profiles => {
      if(callback) { return callback(profiles); }

      res.status(200).send(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.getOne = (req, res) => {

  new models.Profile({id: req.user.id})
    .fetch()
    .then(profiles => {
      console.log('we getting dat profile');
      res.status(200).send(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      console.log('no soup for you');
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  models.Profile.forge({ username: req.body.username, password: req.body.password })
    .save()
    .then(result => {
      res.status(201).send(result.omit('password'));
    })
    .catch(err => {
      if (err.constraint === 'users_username_unique') {
        return res.status(403);
      }
      res.status(500).send(err);
    });
};

module.exports.updateScore = (userId, win) => {
  models.Profile.where({id: userId}).fetch()
    .then(profile => {
      let {attributes:{games_won}, attributes:{games_played}} = profile;

      games_played++;
      games_won += win ? 1 : 0;

      return profile.save({games_played, games_won},{ method: 'update' });
    })
    .catch(err => {
      console.log('we had an error updating the profile games', err);
    });
};

module.exports.update = (req, res, callback) => {

  models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
