module.exports = (sequelize, DataTypes) => {
    const Videos = sequelize.define("Videos", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        video: {
            type: DataTypes.TEXT
        },
    }, {
        tableName: "Videos",
        timestamps: false
    });
    Videos.associate = (models) => {
        Videos.belongsTo(models.Films, {
            foreignKey: 'filmId'
        });
    };
    return Videos;
};