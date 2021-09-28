const { Router } = require('express');
const addonController = require('../controller/addonController');
const {requireAuth} = require('../middleware/authMiddleware');
const bodyParser = require('body-parser');


const router = Router();
const urlencodedparser = bodyParser.urlencoded({extended: true});

router.get('/addons',addonController.get_addons);


router.get('/addons/:id',requireAuth,addonController.get_addon);

router.post('/addons',requireAuth,urlencodedparser,addonController.post_addons );


router.put('/addons/:id',requireAuth,urlencodedparser, addonController.put_addons);

router.delete('/addons/:id',requireAuth,addonController.delete_addons);


module.exports = router;