const chai = require("chai");
const chaiHttp = require("chai-http");
const indexModule = require("../index.js")
const app = indexModule.express
const db = require('../models');

chai.use(chaiHttp);
const expect = chai.expect;

describe("Press api test", () => {
    it('it should return the data stored in the press table', (done) => {
        chai.request(app)
            .get('/api/press')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('press_title');
                expect(res.body).to.have.property('project_name');
                expect(res.body).to.have.property('author');
                expect(res.body).to.have.property('quote');
                expect(res.body).to.have.property('press_image');
            });
        done();
    })
});