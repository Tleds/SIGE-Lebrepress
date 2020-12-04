const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('../swagger.json');

const orders_controller = require('./app/controllers/orders-controller');
const users_controller = require('./app/controllers/users-controller');
const users_session_controller = require('./app/controllers/users_session-controller');

const checkJWTToken = require('./app/middlewares/checkJWTToken');
const checkCreateUser = require('./app/middlewares/checkCreateUser');
const checkSessionUser = require('./app/middlewares/checkSessionUser');
const checkCNPJ = require('./app/middlewares/checkCNPJ');

router.use('/docs', swaggerUI.serve);
router.get('/docs', swaggerUI.setup(swaggerFile));

router.get(
  '/orders/:id_order',
  orders_controller.show
);
router.post(
  '/orders',
  orders_controller.create
);

router.get(
  '/users',
  checkJWTToken,
  users_controller.show
);

router.post(
  '/users',
  checkCreateUser,
  checkCNPJ,
  users_controller.create
);

router.put(
  '/users',
  checkJWTToken,
  users_controller.update
);

router.delete(
  '/users',
  checkJWTToken,
  users_controller.delete
);

router.post(
  '/session_user',
  checkSessionUser,
  users_session_controller.session
)

module.exports = router;