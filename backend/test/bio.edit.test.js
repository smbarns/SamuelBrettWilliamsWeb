const chai = require("chai");
const chaiHttp = require("chai-http");
const indexModule = require("../index.js");
const app = indexModule.express;
const db = require("../models");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Biopage edit feature test", () => {
  it("it should update the client photo for biopage", (done) => {
    const photo = {
      photo: "http://test.png",
    };
    chai
      .request(app)
      .put("/api/bio/photo")
      .send(photo)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("client_photo", photo.photo);
      });
    done();
  });

  it("it should update the bio description for biopage", (done) => {
    const desc = {
      bio_des: "this is a test",
    };
    chai
      .request(app)
      .put("/api/biopage/bio")
      .send(desc)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("bio_des", desc.bio_des);
      });
    done();
  });
});
