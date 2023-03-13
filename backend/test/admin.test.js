const chai = require("chai");
const chaiHttp = require("chai-http");
const indexModule = require("../index.js")
const app = indexModule.express
const db = require('../models');

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
});



