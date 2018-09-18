let express = require('express');
let ChoreCtrl = require('../controllers/chore');

module.exports = function setRoutes(app) {

  let router = express.Router();

  let choreCtrl = new ChoreCtrl();

  // Chores
  router.route('/chores').get(choreCtrl.getAll);
  router.route('/chores/count').get(choreCtrl.count);
  router.route('/chore').post(choreCtrl.insert);
  router.route('/chore/:id').get(choreCtrl.get);
  router.route('/chore/:id').put(choreCtrl.update);
  router.route('/chore/:id').delete(choreCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
