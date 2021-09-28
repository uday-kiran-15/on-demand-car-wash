const { Router } = require('express');

const controller = require('../controllers/service_addon_promocode');
const router = Router();
const {requireAuth} = require('../middleware/authMiddleware');


router.get('/serviceplans', requireAuth,controller.get_ui_services);


router.get('/services',requireAuth,controller.get_services);


router.get('/addons/:service',requireAuth,controller.get_addons);


router.get('/promocodes/:service',requireAuth,controller.get_promocodes);


module.exports= router;