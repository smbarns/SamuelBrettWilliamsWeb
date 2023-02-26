module.exports = (sequelize, DataTypes) => {
    const Still_photos = sequelize.define("Still_photos", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        photo: {
            type: DataTypes.STRING,
            unique: true
        },
    }, {
        tableName: "Still_photos",
        timestamps: false
    });
    Still_photos.associate = (models) => {
        Still_photos.belongsTo(models.Films, {
            as: 'films',
            foreignKey: 'filmId'
        });
        Still_photos.belongsTo(models.Plays, {
            as: 'plays',
            foreignKey: 'playId'
        });
    };
    return Still_photos;
};