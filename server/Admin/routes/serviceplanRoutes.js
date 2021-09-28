const bodyParser = require('body-parser');
const { Router } = require('express');
const serviceplanController = require('../controller/serviceplanController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

var urlencodedParser = bodyParser.urlencoded({ extended: true });


router.get('/services',requireAuth,serviceplanController.get_Services);

router.get('/services/:id', /* requireAuth, */ serviceplanController.get_Service);


router.get('/activeServices',requireAuth, serviceplanController.get_Active_Services);

router.get('/activeCount',requireAuth,serviceplanController.get_Count_Active_Services);

router.post('/services',requireAuth,urlencodedParser ,serviceplanController.post_Service);

router.put('/services/:id', requireAuth,urlencodedParser ,serviceplanController.put_Service);

router.delete('/services/:id', urlencodedParser ,serviceplanController.delete_Service);


module.exports = router;