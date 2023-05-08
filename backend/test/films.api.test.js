const chai = require("chai");
const chaiHttp = require("chai-http");
const indexModule = require("../index.js")
const app = indexModule.express
const db = require('../models');

chai.use(chaiHttp);
const expect = chai.expect;

describe("Films api test", () => {
    it('it should return the data stored in the films table', (done) => {
        chai.request(app)
            .get('/api/films')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('photo');
                expect(res.body).to.have.property('director');
                expect(res.body).to.have.property('description');
                expect(res.body).to.have.property('screenplay');
                expect(res.body).to.have.property('stars');
                expect(res.body).to.have.property('type_film');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('homeId');
                expect(res.body).to.have.property('still_photos');
                expect(res.body).to.have.property('videos');
                expect(res.body).to.have.property('buy_links');
            });
        done();
    })
});