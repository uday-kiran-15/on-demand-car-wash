const chai =  require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const server = require('../server');

//Assertion style
chai.should();
chai.use(chaiHttp);


describe("Washer Orders API", ()=> {

    /**
    * login the washer to get tokenn
    */

    describe("Washer Login API", ()=> {
        const loginCredentails = {
            email: "udayuday1048@gmail.com",
            password : "uday@123"
        }
        it("it should login the washer", (done)=> {
            chai.request(server)
                .post("/login")
                .send(loginCredentails)
                .end((err,response)=> {
                    response.should.have.status(201);
                    response.body.should.be.a('Object');
                    expect(response.body.should.have.property('token'));
                    jwtToken = `Bearer ${response.body.token}`;
                    console.log(jwtToken);
                    done();
                })
        })
    })
    

    /**
    * Get wash requests 
    */

    describe("GET /requests", ()=> {
        it("it should get list of wash requests",(done)=>{
            chai.request(server)
                .get("/requests")
                .set({"Authorization" : jwtToken})
                .end((err,response)=> {
                    response.should.have.status(201);
                    response.body.should.be.a('array');
                    done()
                })
        })
        it("it should not get list of wash requests",(done)=>{
            chai.request(server)
                .get("/requests")
                .end((err,response)=> {
                    response.should.have.status(401);
                    response.body.should.be.a('object');
                    done()
                })
        })
    })

    /**
    * PUT accept a order 
    */
   
    describe("PUT /accept", ()=> {
        const orderId = '6148882eaa344b2f401ccbd1'

        it("it should change the order status to accepted",(done)=>{
            chai.request(server)
                .put(`/accept/${orderId}`)
                .set({"Authorization" : jwtToken})
                .end((err,response)=> {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done()
                })
        })
    })


    /**
    * PUT reject a order
    */
    describe("PUT /orders", ()=> {
        const orderId = '6148882eaa344b2f401ccbd1'
        it("it should not change the order status to cancelled",(done)=>{
            chai.request(server)
                .put(`/reject/${orderId}`)
                .end((err,response)=> {
                    response.should.have.status(401);
                    response.body.should.be.a('object');
                    done()
                })
        })
    })


    /**
    * PUT inprocess order
    */

    describe("PUT /orders", ()=> {
        const orderId = '6148882eaa344b2f401ccbd1'
        it("it should change the order status to inprocess",(done)=>{
            chai.request(server)
                .put(`/inprocess/${orderId}`)
                .set({"Authorization" : jwtToken})
                .end((err,response)=> {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done()
                })
        })

        it("it should not change the order status to inprocess",(done)=>{
            chai.request(server)
                .put(`/inprocess/${orderId}`)
                .end((err,response)=> {
                    response.should.have.status(401);
                    response.body.should.be.a('object');
                    done()
                })
        })
    })
})
