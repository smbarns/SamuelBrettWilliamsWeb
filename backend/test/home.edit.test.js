const chai = require("chai");
const chaiHttp = require("chai-http");
const indexModule = require("../index.js")
const app = indexModule.express
const db = require('../models');

chai.use(chaiHttp);
const expect = chai.expect;

const data = {
    title: "test-homepage",
    videos: [{video: "http://test.png"}]
}

describe("Homepage edit feature test", () => {
    it('it should create a new video for films and have it featured', (done) => {
        chai.request(app)
            .post('/api/films')
            .send(data)
            .end(function(err, res) {
                const vidAdd = {
                    videoUrl: "http://fake.com",
                    title: res.title
                }
                chai.request(app)
                .post('/api/homepage/film/create/video')
                .send(vidAdd)
                .end(function(err, res1) {
                    expect(res1).to.have.status(200);
                    expect(res1.body).to.have.property('video', vidAdd.videoUrl);
                    expect(res1.body).to.have.property('filmId', res.id);
                    expect(res1.body).to.have.property('featured', true);
                });
                done();
            });
        done();
    })

    it('it should save photo url to the homepage', (done) => {
        const photo = {
            photo: "http://photoTest.jpg"
        }
        chai.request(app)
            .put('/api/homepage/photo')
            .send(photo)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('client_photo', photo.photo);
                done();
            });
        done();
    })

    it('it should save about description to the homepage', (done) => {
        const desc = {
            about_des: "this is a test"
        }
        chai.request(app)
            .put('/api/homepage/edit/about')
            .send(desc)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('about_des', desc.about_des);
                done();
            });
        done();
    })

    it('it should delete featured video in homepage', (done) => {
        chai.request(app)
            .post('/api/films')
            .send(data)
            .end(function(err, res) {
                chai.request(app)
                .get(`/api/feature/delete/film?id=${res.id}`)
                .end(function(err, res1) {
                    expect(res1).to.have.status(200);
                    expect(res1.body).to.have.property('homeId', null);
                });
                done();
            });
        done();
    })

    it('it should update existing video of film to show up on homepage', (done) => {
        chai.request(app)
            .post('/api/films')
            .send(data)
            .end(function(err, res) {
                const filmSet = {
                    title: res.title,
                    url: data.videos[0].video
                }
                chai.request(app)
                .post(`/api/film/homeSet`)
                .send(filmSet)
                .end(function(err, res1) {
                    expect(res1).to.have.status(200);
                    expect(res1.body).to.have.property('featured', true);
                });
                done();
            });
        done();
    })
});