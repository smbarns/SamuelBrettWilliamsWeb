module.exports = (sequelize, DataTypes) => {
    const Films = sequelize.define("Films", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING
        },
        film_photo: {
            type: DataTypes.TEXT
        },
        director: {
            type: DataTypes.STRING
        },
        writer: {
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
    }, {
        tableName: "Films",
        timestamps: false
    });
    Films.associate = models => {
        Films.belongsTo(models.Homepage, {
            foreignKey: 'homeId'
        });
    };
    Films.associate = models => {
        Films.hasMany(models.Buy_links, {
            foreignKey: 'filmId'
        });
    };
    Films.associate = models => {
        Films.hasMany(models.Still_photos, {
            foreignKey: 'filmId'
        });
    };
    Films.associate = models => {
        Films.hasMany(models.Videos, {
            foreignKey: 'filmId'
        });
    };
    return Films;
};