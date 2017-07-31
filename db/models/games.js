const db = require('../').bookshelf;

const Games = db.Model.extend({
  tableName: 'games',
  profiles: function() {
    return this.belongsToMany('Profile');
  }
});

module.exports = db.model('Games', Games);
