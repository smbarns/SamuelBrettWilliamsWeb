const db = require("../models");
const PressPage = db.Press;
const Op = db.Sequelize.Op;

exports.getByID = (req, res) => {
    const id = req.params.id;

    PressPage.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "Cannot find Press page with id=${id}."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Press page with id=" + id
            });
        });
};