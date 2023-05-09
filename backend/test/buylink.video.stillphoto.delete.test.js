const chai = require("chai");
const chaiHttp = require("chai-http");
const indexModule = require("../index.js")
const app = indexModule.express
const db = require('../models');

chai.use(chaiHttp);
const expect = chai.expect;

const data = {
    title: "testFeatures"
}

describe("Buylink/Video/Stillphoto feature delete test", () => {
    it('it should delete a buyLink', (done) => {
        chai.request(app)
            .post('/api/films')
            .send(data)
            .end(function(err, res) {
                const buylinkData = {
                    newBuyLink: "http://link.com",
                    newBuyLinkImg: "http://linkImg.png",
                    id: res.id
                }
                chai.request(app)
                    .put('/api/films/add/buy_link')
                    .send(buylinkData)
                    .end(function(err, res1) {
                        chai.request(app)
                            .get(`/api/delete/buyLink?id=${res1.id}`)
                            .end(function(err, res) {
                                expect(res).to.have.status(200);
                            });
                    })
            })
        done();
    })

    it('it should delete a video', (done) => {
        chai.request(app)
            .post('/api/films')
            .send(data)
            .end(function(err, res) {
                const video = {
                    title: res.title,
                    videoUrl: "http://video.com"
                }
                chai.request(app)
                    .post('/api/film/create/video')
                    .send(video)
                    .end(function(err, res1) {
                        chai.request(app)
                            .get(`/api/delete/video?id=${res1.id}`)
                            .end(function(err, res) {
                                expect(res).to.have.status(200);
                            });
                    })
            })
        done();
    })

    it('it should delete a still photo', (done) => {
        chai.request(app)
            .post('/api/films')
            .send(data)
            .end(function(err, res) {
                const stillphoto = {
                    title: res.title,
                    photoUrl: "http://photo.png"
                }
                chai.request(app)
                    .post('/api/film/create/photo')
                    .send(stillphoto)
                    .end(function(err, res1) {
                        chai.request(app)
                            .get(`/api/delete/photo?id=${res1.id}`)
                            .end(function(err, res) {
                                expect(res).to.have.status(200);
                            });
                    })
            })
        done();
    })
})