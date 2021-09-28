const { Router } = require('express');
const {customer} = require('../models/customerDetails');
const {requireAuth} = require('../middleware/authMiddleware');
const router = Router();



router.get('/customersCount',requireAuth,function(req,res){
    customer.count({},function(err,doc){
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(doc);
        }
    })
});

module.exports = router;