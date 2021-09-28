require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//Importing routes
const servicePlanRoutes = require('./routes/serviceplanRoutes');
const washerRoutes = require('./routes/washerRoutes');
const addonRoutes = require('./routes/addonRoutes');
const leaderboard = require('./routes/leaderboard');
const carRoutes = require('./routes/carRoutes');
const customerRoutes = require('./routes/customerRoute');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

//connect to database
dbURI = 'mongodb+srv://admin:admin123@cluster0.lobwh.mongodb.net/superAdmin?retryWrites=true&w=majority';
mongoose.connect( dbURI,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify : false});


//Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use('/', [authRoutes,servicePlanRoutes,addonRoutes,carRoutes,washerRoutes,leaderboard, customerRoutes, orderRoutes]);
 

//Swagger Config
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "3.0.3",
        title: "ADMIN API",
        description: "API's from admin Microservice",
        contact: {
          name: "praneetha"
        },
        
       server :["http://localhost:2000"],
       
      }
    },
    // ['.routes/*.js']
    apis:  ['./routes/*.js']
};


//Listen to port : default is 2000
const port = process.env.PORT || 2000;
app.listen(port,function(){
    console.log("Listening to port:",port);
})


module.exports = app;