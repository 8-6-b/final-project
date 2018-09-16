import * as express from 'express';

import ChoreCtrl from '../controllers/chore';

export default function setRoutes(app) {

  const router = express.Router();

  const choreCtrl = new ChoreCtrl();

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
