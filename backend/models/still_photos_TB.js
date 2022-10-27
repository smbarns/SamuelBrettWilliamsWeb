module.exports = (sequelize, DataTypes) => {
    const Still_photos = sequelize.define("Still_photos", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        photo: {
            type: DataTypes.TEXT
        },
    });
    Still_photos.associate = (models) => {
        Still_photos.belongsTo(models.Films, {
            foreignKey: 'filmId'
        });
    };
    return Still_photos;
};