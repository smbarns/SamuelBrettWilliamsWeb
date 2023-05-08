const chai = require("chai");
const chaiHttp = require("chai-http");
const indexModule = require("../index.js")
const app = indexModule.express
const db = require('../models');

chai.use(chaiHttp);
const expect = chai.expect;

const data = {
    title: "test",
    photo: "http://test.png",
    director: "t",
    screenplay: "e",
    stars: "s",
    status: "t",
    description: "this is a test",
    type_film: "test",
    homeId: 1,
    buy_links: [{link: "http://hi.com"}],
    videos: [{video: "http://test.com"}],
    still_photos: [{photo: "http://hihi.png"}]
}

describe("Films edit feature test", () => {
    it('it should add a film to the database', (done) => {
        chai.request(app)
            .post('/api/plays')
            .send(data)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('title', data.title);
                expect(res.body).to.have.property('photo', data.photo);
                expect(res.body).to.have.property('director', data.director);
                expect(res.body).to.have.property('screenplay', data.screenplay);
                expect(res.body).to.have.property('stars', data.stars);
                expect(res.body).to.have.property('status', data.status);
                expect(res.body).to.have.property('description', data.description);
                expect(res.body).to.have.property('type_film', data.type_film);
                expect(res.body).to.have.property('homeId', data.homeId);
                expect(res.body).to.have.property('still_photos', data.still_photos[0].photo);
                expect(res.body).to.have.property('videos', data.videos[0].video);
                expect(res.body).to.have.property('buy_links', data.buy_links[0].link);
            });
        done();
    })

    it('it should update film photo to the database', (done) => {
        chai.request(app)
            .post('/api/films')
            .send(data)
            .end(function(err, res) {
                const photoData = {
                    photo: "http://testhi.png",
                    id: res.id
                }
                chai.request(app)
                    .put('/api/films/photo')
                    .send(photoData)
                    .end(function(err, res1) {
                        expect(res1).to.have.status(200);
                        expect(res1.body).to.have.property('photo', photoData.photo);
                    })
                done();
            })
        done();
    })

    it('it should update film title to the database', (done) => {
        chai.request(app)
            .post('/api/films')
            .send(data)
            .end(function(err, res) {
                const titleData = {
                    newTitle: "test2",
                    id: res.id
                }
                chai.request(app)
                    .put('/api/films/edit/title')
                    .send(titleData)
                    .end(function(err, res1) {
                        expect(res1).to.have.status(200);
                        expect(res1.body).to.have.property('title', titleData.newTitle);
                    })
                done();
            })
        done();
    })

    it('it should update film details to the database', (done) => {
        chai.request(app)
            .post('/api/films')
            .send(data)
            .end(function(err, res) {
                const detailsData = {
                    newWriter: "newWriter",
                    newDirector: "newDirector",
                    newStars: "newStars",
                    newStatus: "newStatus",
                    newDesc: "newDesc",
                    id: res.id
                }
                chai.request(app)
                    .put('/api/films/edit/details')
                    .send(detailsData)
                    .end(function(err, res1) {
                        expect(res1).to.have.status(200);
                        expect(res1.body).to.have.property('director', detailsData.newDirector);
                        expect(res1.body).to.have.property('screenplay', detailsData.newWriter);
                        expect(res1.body).to.have.property('stars', detailsData.newStars);
                        expect(res1.body).to.have.property('status', detailsData.newStatus);
                        expect(res1.body).to.have.property('description', detailsData.newDesc);
                    })
                done();
            })
        done();
    })

    it('it should create a new buylink for film', (done) => {
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
                        expect(res1).to.have.status(200);
                        expect(res1.body).to.have.property('link', buylinkData.newBuyLink);
                        expect(res1.body).to.have.property('link_photo', buylinkData.newBuyLinkImg);
                        expect(res1.body).to.have.property('filmId', res.id);
                    })
                done();
            })
        done();
    })

    it('it should create a new video for film', (done) => {
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
                        expect(res1).to.have.status(200);
                        expect(res1.body).to.have.property('video', video.videoUrl);
                        expect(res1.body).to.have.property('filmId', res.id);
                    })
                done();
            })
        done();
    })

    it('it should create a new still photo for film', (done) => {
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
                        expect(res1).to.have.status(200);
                        expect(res1.body).to.have.property('photo', stillphoto.photoUrl);
                        expect(res1.body).to.have.property('filmId', res.id);
                    })
                done();
            })
        done();
    })

    it('it should delete a film', (done) => {
        chai.request(app)
            .post('/api/films')
            .send(data)
            .end(function(err, res) {
                chai.request(app)
                .get(`/api/delete/film?id=${res.id}`)
                .end(function(err, res1) {
                    expect(res1).to.have.status(200);
                });
                done();
            });
        done();
    })
})