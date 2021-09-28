const { Router } = require('express');
const {customerDetails }= require('../models/customerDetails');
const {requireAuth} = require('../middleware/authMiddleware');
const router = Router();


router.get('/leaderboard',requireAuth,function(req,res){
    customerDetails.find({},function(err,doc){
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).send(doc);
        }
    }).sort({noOfWashes : -1});
});

module.exports = router;