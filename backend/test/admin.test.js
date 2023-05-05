const chai = require("chai");
const chaiHttp = require("chai-http");
const indexModule = require("../index.js")
const app = indexModule.express
const db = require('../models');
const cheerio = require('cheerio');

chai.use(chaiHttp);
const expect = chai.expect;

const credentials = {
    email: "test@email.com",
    password: "password"
}

describe("Update Admin Password", () => {
    before((done) => {
        const admin = db.Admin.create(credentials)
        done();
    });

    describe('validate password', () => {
        it('it should return true when validating the password', (done) => {
            indexModule.validatePassword(credentials.email, "password")
                .then(result => {
                    expect(result).to.be.true
                });
            done();
        })

        it('it should return false when validating the password', (done) => {
            indexModule.validatePassword(credentials.email, "Incorrectpassword")
                .then(result => {
                    expect(result).to.be.false
                });
            done();
        })
    });

    describe('update route', () => {
        it('update the password therough /update and then validate', (done) => {
            const newpass = {
                password: "newpassword"
            }
            chai.request(app)
                .put('/api/admin/1/password')
                .send(newpass)
                .end((err, res) => {
                    res.should.have.status(200);
                })
            indexModule.validatePassword(credentials.email, newpass.password)
                .then(result => {
                    expect(result).to.be.true
                });
            done();
        })
    });

    describe('forgot/reset password route', () => {
        it('forgot-password sends email with reset token and reset password updates new pass in database', (done) => {
            chai.request(app)
                .post('/api/forgot-password')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(200);
                    const message = res.body.message;
                    const $ = cheerio.load(message); // Parse the HTML using Cheerio
                    const resetLink = $('a').attr('href');
                    const urlObject = url.parse(resetLink);
                    const queryParams = new URLSearchParams(urlObject.query);
                    const token = queryParams.get('token');
                    const newpass = {
                        password: "newpass",
                        token: token
                    }
                    chai.request(app)
                        .post('/api/reset-password')
                        .send(newpass)
                        .end((err, res) => {
                            res.should.have.status(200);
                        })
                    indexModule.validatePassword(credentials.email, newpass.password)
                        .then(result => {
                            expect(result).to.be.true
                        });
                    done();
                })
            done();
        })
    });

    /*after(async () => {
        const admin = await db.Admin.findOne({where: {email: credentials.email}});
        if (admin !== null) {
            await admin.destroy();
        }
    });*/

});



