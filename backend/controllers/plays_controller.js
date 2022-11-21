const db = require("../models");
const Plays = db.Plays;
const Op = db.Sequelize.Op;

exports.getByID = (req, res) => {
    const id = req.params.id;

    Plays.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "Cannot find Play with id=${id}."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Play with id=" + id
            });
        });
};

exports.getByTitle = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: { [Op.like]: '%${title}%' } } : null;

    Plays.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Play with title=" + title
        });
    });
};