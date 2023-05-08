const chai = require("chai");
const chaiHttp = require("chai-http");
const indexModule = require("../index.js");
const app = indexModule.express;
const db = require("../models");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Biopage api test", () => {
  it("it should return the data stored in the bio table", (done) => {
    chai
      .request(app)
      .get("/api/biopage")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("bio_des");
        expect(res.body).to.have.property("client_photo");
        done();
      });
    done();
  });
});
