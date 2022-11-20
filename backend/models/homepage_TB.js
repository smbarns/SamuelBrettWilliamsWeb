const films_TB = require("./films_TB");

module.exports = (sequelize, DataTypes) => {
    const Homepage = sequelize.define("Homepage", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        about_des: {
            type: DataTypes.TEXT
        },
        client_photo: {
            type: DataTypes.TEXT
        },
    }, {
        tableName: "Homepage",
        timestamps: false
    });
    Homepage.associate = models => {
        Homepage.hasMany(models.Films, {
            as: 'films',
            foreignKey: 'homeId'
        });
    };
    return Homepage;
};

