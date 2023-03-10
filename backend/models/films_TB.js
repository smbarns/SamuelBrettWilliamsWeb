module.exports = (sequelize, DataTypes) => {
    const Films = sequelize.define("Films", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            unique: true
        },
        photo: {
            type: DataTypes.TEXT
        },
        director: {
            type: DataTypes.STRING
        },
        screenplay: {
            type: DataTypes.STRING
        },
        stars: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        type_film: {
            type: DataTypes.STRING(30)
        },
    }, {
        tableName: "Films",
        timestamps: false
    });

    Films.associate = models => {
        Films.belongsTo(models.Homepage, {
            as: 'homepage',
            foreignKey: 'homeId'
        });
        Films.hasMany(models.Buy_links, {
            as: 'buy_links',
            foreignKey: 'filmId'
        });
        Films.hasMany(models.Still_photos, {
            as: 'still_photos',
            foreignKey: 'filmId'
        });
        Films.hasMany(models.Videos, {
            as: 'videos',
            foreignKey: 'filmId'
        });
    };
    return Films;
};