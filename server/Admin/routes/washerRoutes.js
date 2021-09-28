const { Router } = require('express');
const { route } = require('./serviceplanRoutes');
const { requireAuth } = require('../middleware/authMiddleware');
const washerController = require('../controller/washerController');
const bodyParser = require('body-parser');


const router = Router();
const urlencodedparser = bodyParser.urlencoded({extended: true});



router.get('/washers', requireAuth,washerController.get_all_washers);

router.get('/washer', requireAuth,washerController.get_washers);

router.put('/washer/:id',requireAuth,urlencodedparser, washerController.update_washer);

router.delete('/washer/:id',requireAuth,washerController.delete_washer);

router.get('/countWashers',requireAuth,washerController.count_washers);

module.exports = router;