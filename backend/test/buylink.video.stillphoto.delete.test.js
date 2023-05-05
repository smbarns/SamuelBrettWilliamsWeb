const chai = require("chai");
const chaiHttp = require("chai-http");
const indexModule = require("../index.js")
const app = indexModule.express
const db = require('../models');

chai.use(chaiHttp);
const expect = chai.expect;

describe("Buylink/Video/Stillphoto feature delete test", () => {
    it('it should delete a buyLink', (done) => {
        chai.request(app)
            .get('/api/delete/buyLink')
            .end(function(err, res) {
                expect(res).to.have.status(200);
            });
        done();
    })

    it('it should delete a video', (done) => {
        chai.request(app)
            .get('/api/delete/video')
            .end(function(err, res) {
                expect(res).to.have.status(200);
            });
        done();
    })

    it('it should delete a still photo', (done) => {
        chai.request(app)
            .get('/api/delete/photo')
            .end(function(err, res) {
                expect(res).to.have.status(200);
            });
        done();
    })
})