const db = require("../models");
const Films = db.Films;
const Videos = db.Videos;
const Op = db.Sequelize.Op;

exports.getByID = (req, res) => {
    const id = req.params.id;

    Films.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "Cannot find Film with id=${id}."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Film with id=" + id
            });
        });
};

exports.getByTitle = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: { [Op.like]: `%${title}%` } } : null;

    Films.findAll({ where: condition, include: [{ model: db.Videos, as: "videos" }]})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Film with title=" + title
        });
    });
};