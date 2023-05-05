const chai = require("chai");
const chaiHttp = require("chai-http");
const indexModule = require("../index.js")
const app = indexModule.express
const db = require('../models');

chai.use(chaiHttp);
const expect = chai.expect;

const data = {
    press_title: "test",
    project_name: "test-project",
    author: "author",
    quote: "this is a test",
    press_image: "http://test.png"
}

describe("Press edit feature test", () => {
    it('it should add a press entry to the database', (done) => {
        chai.request(app)
            .post('/api/press')
            .send(data)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('press_title', data.press_title);
                expect(res.body).to.have.property('project_name', data.project_name);
                expect(res.body).to.have.property('author', data.author);
                expect(res.body).to.have.property('quote', data.quote);
                expect(res.body).to.have.property('press_image', data.press_image);
            });
        done();
    })

    it('it should update press title to the database', (done) => {
        chai.request(app)
            .post('/api/press')
            .send(data)
            .end(function(err, res) {
                const titleData = {
                    press_title: "test2",
                    id: res.id
                }
                chai.request(app)
                    .put('/api/press/edit/press_title')
                    .send(titleData)
                    .end(function(err, res1) {
                        expect(res1).to.have.status(200);
                        expect(res1.body).to.have.property('press_title', titleData.press_title);
                    })
                done();
            })
        done();
    })

    it('it should update press details to the database', (done) => {
        chai.request(app)
            .post('/api/press')
            .send(data)
            .end(function(err, res) {
                const detailsData = {
                    project_name: "newName",
                    quote: "newQuote",
                    author: "newAuthor",
                    id: res.id
                }
                chai.request(app)
                    .put('/api/press/edit/details')
                    .send(detailsData)
                    .end(function(err, res1) {
                        expect(res1).to.have.status(200);
                        expect(res1.body).to.have.property('project_name', detailsData.project_name);
                        expect(res1.body).to.have.property('quote', detailsData.quote);
                        expect(res1.body).to.have.property('author', detailsData.author);
                    })
                done();
            })
        done();
    })

    it('it should update the press photo', (done) => {
        chai.request(app)
            .post('/api/press')
            .send(data)
            .end(function(err, res) {
                const photo = {
                    id: res.id,
                    logo: "http://photo.png"
                }
                chai.request(app)
                    .put('/api/press/edit/image')
                    .send(photo)
                    .end(function(err, res1) {
                        expect(res1).to.have.status(200);
                        expect(res1.body).to.have.property('press_image', photo.logo);
                    })
                done();
            })
        done();
    })

    it('it should delete a press entry', (done) => {
        chai.request(app)
            .post('/api/press')
            .send(data)
            .end(function(err, res) {
                chai.request(app)
                .get(`/api/delete/press?id=${res.id}`)
                .end(function(err, res1) {
                    expect(res1).to.have.status(200);
                });
                done();
            });
        done();
    })
})