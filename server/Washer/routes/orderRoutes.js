const { Router } = require('express');
const bodyparser = require('body-parser');
const orderController = require('../controllers/orderController');
const {requireAuth} = require('../middleware/authMiddleware');

const router = Router();
const urlencodedparser = bodyparser.urlencoded({extended: true});


router.get('/requests',requireAuth,orderController.get_orders);

router.get('/orders/:orderId',requireAuth,orderController.get_order);

router.put('/accept/:orderId', requireAuth,urlencodedparser, orderController.accept_order);


router.put('/reject/:orderId',requireAuth,urlencodedparser, orderController.reject_order);


router.put('/inprocess/:orderId',requireAuth,  urlencodedparser, orderController.inprocess_order);


router.put('/completed/:orderId',requireAuth,urlencodedparser, orderController.completed_order);


module.exports = router;