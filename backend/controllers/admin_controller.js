const db = require("../models");
const Admin = db.Admin;

exports.getByEmail = async(email) => {
    return await Admin.findOne({
        where: {
            email: email
        }
    });
};