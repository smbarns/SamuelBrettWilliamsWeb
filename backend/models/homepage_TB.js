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
    });
    Homepage.associate = models => {
        Homepage.hasMany(models.Films, {
            foreignKey: 'homeId'
        });
    };
    return Homepage;
};

