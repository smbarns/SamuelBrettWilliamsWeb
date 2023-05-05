const chai = require("chai");
const chaiHttp = require("chai-http");
const indexModule = require("../index.js")
const app = indexModule.express
const db = require('../models');

chai.use(chaiHttp);
const expect = chai.expect;

describe("Contact edit feature test", () => {
    it('it should update client info in database', (done) => {
        const data = {
            client_info: "test"
        }
        chai.request(app)
            .put('/api/contact/edit/client_info')
            .send(data)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('client_info', data.client_info);
            });
        done();
    })

    it('it should update agent info in database', (done) => {
        const data = {
            agent_info: "test"
        }
        chai.request(app)
            .put('/api/contact/edit/agent_info')
            .send(data)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('agent_info', data.agent_info);
            });
        done();
    })
})