//const {requireAuth} = require('../middleware/authMiddleware');
const {Router} = require('express');
const controller = require('../controllers/scheduledlaterController');
const router = Router();
const {requireAuth} = require('../middleware/authMiddleware');

router.get('/scheduledLater',requireAuth,controller.get_scheduled_orders);


module.exports = router;