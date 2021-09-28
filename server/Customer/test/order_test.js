const chai = require('chai');
const server = require('../server');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

//Assertion style
chai.should();
chai.use(chaiHttp);

describe('Customer Order API', ()=>{


    /**
     * logging in to recieve token 
     */
    describe("POST /login", () => {
      it("it should login the customer", (done) =>{
      const userCredentials =  {
          "email" : "customer@gmail.com",
          "password" : "customer"
      }
      chai.request(server)
          .post("/login")
          .send(userCredentials)
          .end((err, response) =>{
          response.should.have.status(201);
          response.should.be.a('object');
          expect(response.body.should.have.property('token'));
          jwtToken = `Bearer ${response.body.token}`;
          done();
          })
      })
    })


    /**
     * Test the POST order route
    */

    describe("POST /order", () => {
      
        it("it should create a new order", (done) =>{
          const order =  {
            "userDetails": {
                "userId":"6148882eaa344b2f401ccbd1",
                "name": "Nitin",
                "mobile": "9819911608"
            },
            "address": {
                "country" : "India",
                "city" :  "Dombivli",
                "address" : "2, sarovar villa",
                "zipcode" : 421503
            },
            "package": "Premium Wash",
            "addOn": "fast wash",
            "carInfo": {
                "carName": "Audi",
                "carModel": "A78Gh2020"
            },
            "dateTime": "1999-06-02T00:00:00.000Z",
            "washerDetails": {
                "washerId": "6148882eaa344b2f401ccbd1",
                "name": "alisha k",
                "mobile": "7502189456",
                "address": {
                    "country" : "India",
                    "city" : "Dombivli",
                    "address" : "2, sarovar villa",
                    "zipcode" : 421503
                }
            },
            "totalCost": 9000,
            "instructionByUser": "Please be careful."
          }

          chai.request(server)
            .post("/order")
            .send(order)
            .set({"Authorization": jwtToken })
            .end((err, response) =>{
              response.should.have.status(201);
              response.body.should.be.a('object');
              done();
            })
        })

    }) 

})