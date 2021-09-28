const { Router } = require('express');
const bodyParser = require('body-parser');
const profileController = require('../controllers/profileController');
const {requireAuth} = require('../middleware/authMiddleware')

const router = Router();
const urlencodedParser = bodyParser.urlencoded({extended:true});

//Profile route handlers

//Get profile page
// router.get('/profile', requireAuth, profileController.get_profile);


router.post('/profile', urlencodedParser,requireAuth, profileController.post_profile);

router.get('/profile',urlencodedParser,requireAuth , profileController.get_specific_profile);


router.put('/profile',urlencodedParser, requireAuth ,profileController.update_profile);


module.exports = router;