module.exports = (sequelize, DataTypes) => {
    const Videos = sequelize.define("Videos", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        video: {
            type: DataTypes.STRING,
            unique: true
        },
    }, {
        tableName: "Videos",
        timestamps: false
    });
    Videos.associate = (models) => {
        Videos.belongsTo(models.Films, {
            as: 'films',
            foreignKey: 'filmId'
        });
        Videos.belongsTo(models.Plays, {
            as: 'plays',
            foreignKey: 'playId'
        });
    };
    return Videos;
};