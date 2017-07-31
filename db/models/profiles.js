const db = require('../').bookshelf;

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  games: function() {
    return this.hasMany('Games', 'winner');
  }
});

module.exports = db.model('Profile', Profile);
