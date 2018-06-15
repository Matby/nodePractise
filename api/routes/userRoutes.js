'use strict';
module.exports = function(app) {
  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});
  
  var user = require('../controllers/userController');

  // todoList Routes
  app.route('/users')
    .get(user.list_all_users)
    .post(user.create_a_user);


  app.route('/users/:userId')
    .get(user.read_a_user)
    .put(user.update_a_user)
    .delete(user.delete_a_user);
};
