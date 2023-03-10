module.exports = (sequelize, DataTypes) => {
    const Plays = sequelize.define("Plays", {
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
        writer: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        productions: {
            type: DataTypes.TEXT
        },
        development: {
            type: DataTypes.TEXT
        },
        type_play: {
            type: DataTypes.STRING(30)
        },
    }, {
        tableName: "Plays",
        timestamps: false
    });

    Plays.associate = models => {
        Plays.hasMany(models.Still_photos, {
            as: 'still_photos',
            foreignKey: 'playId'
        });
        Plays.hasMany(models.Videos, {
            as: 'videos',
            foreignKey: 'playId'
        });
        Plays.hasMany(models.Buy_links, {
            as: 'buy_links',
            foreignKey: 'playId'
        });
    };
    return Plays;
};