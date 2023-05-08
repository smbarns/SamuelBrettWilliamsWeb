const chai = require("chai");
const chaiHttp = require("chai-http");
const indexModule = require("../index.js")
const app = indexModule.express
const db = require('../models');

chai.use(chaiHttp);
const expect = chai.expect;

describe("Plays api test", () => {
    it('it should return the data stored in the plays table', (done) => {
        chai.request(app)
            .get('/api/plays')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('photo');
                expect(res.body).to.have.property('writer');
                expect(res.body).to.have.property('description');
                expect(res.body).to.have.property('productions');
                expect(res.body).to.have.property('development');
                expect(res.body).to.have.property('type_play');
                expect(res.body).to.have.property('still_photos');
                expect(res.body).to.have.property('videos');
                expect(res.body).to.have.property('buy_links');
            });
        done();
    })
});