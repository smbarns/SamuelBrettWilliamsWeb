module.exports = (sequelize, DataTypes) => {
    const Plays = sequelize.define("Plays", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING
        },
        play_photo: {
            type: DataTypes.TEXT
        },
        writer: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        play_link: {
            type: DataTypes.TEXT
        },
        link_photo: {
            type: DataTypes.TEXT
        },
    }, {
        tableName: "Plays",
        timestamps: false
    });
    Plays.associate = models => {
        Plays.hasMany(models.Still_photos, {
            foreignKey: 'playId'
        });
    };
    Plays.associate = models => {
        Plays.hasMany(models.Videos, {
            foreignKey: 'playId'
        });
    };
    return Plays;
};