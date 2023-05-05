const chai = require("chai");
const chaiHttp = require("chai-http");
const indexModule = require("../index.js")
const app = indexModule.express
const db = require('../models');

chai.use(chaiHttp);
const expect = chai.expect;

describe("Contact page api test", () => {
    it('it should return the data stored in the contactpage table', (done) => {
        chai.request(app)
            .get('/api/contactpage')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('client_info');
                expect(res.body).to.have.property('agent_info');
                done();
            });
        done();
    })

    it('it should successfully send an email', (done) => {
        const info = {
            firstName: "test",
            lastName: "hello",
            email: "test@gmail.com",
            message: "this is a test"
        }
        chai.request(app)
            .post('/api/sendEmail')
            .send(info)
            .end(function(err, res) {
                expect(res).to.have.status(200);
            });
        done();
    })
});