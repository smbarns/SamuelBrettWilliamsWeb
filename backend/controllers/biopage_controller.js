const db = require("../models");
const Biopage = db.Biopage;
const Op = db.Sequelize.Op;

exports.getByID = (req, res) => {
    const id = req.params.id;

    Biopage.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "Cannot find Biopage with id=${id}."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Biopage with id=" + id
            });
        });
};