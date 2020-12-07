const router = require('express').Router();

const orders_controller = require('./app/controllers/orders-controller');
const users_controller = require('./app/controllers/users-controller');
const users_session_controller = require('./app/controllers/users_session-controller');

const checkJWTToken = require('./app/middlewares/checkJWTToken');
const checkCreateUser = require('./app/middlewares/checkCreateUser');
const checkSessionUser = require('./app/middlewares/checkSessionUser');
const checkCNPJ = require('./app/middlewares/checkCNPJ');

router.get(
  '/orders/:id_order',
  checkJWTToken,
  orders_controller.show
);
router.get('/all_orders',
  checkJWTToken,
  orders_controller.allClienteOrders
)
router.post(
  '/orders',
  checkJWTToken,
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