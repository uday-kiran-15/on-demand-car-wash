const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const profileRoutes= require('./routes/profileRoutes');
const orderRoutes = require('./routes/orderRoutes');
const myordersRoutes = require('./routes/myordersRoutes');
const scheduledLater = require('./routes/scheduledlaterRoutes');

const app = express();

//Connect to Customers Database
const dbURI="mongodb+srv://washer:wash123@cluster0.lobwh.mongodb.net/washers?retryWrites=true&w=majority";
mongoose.connect( dbURI,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});



//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use('/uploads/images',express.static('uploads'));
app.use('/',[authRoutes,profileRoutes,orderRoutes,myordersRoutes,scheduledLater]);


//Listen to port: Default is 4000
const port = process.env.PORT || 4000;
app.listen( port , function(){
    console.log("listening to port ",port);
});


module.exports = app;