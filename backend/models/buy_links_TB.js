module.exports = (sequelize, DataTypes) => {
    const Buy_links = sequelize.define("Buy_links", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        link: {
            type: DataTypes.TEXT
        },
        link_photo: {
            type: DataTypes.TEXT
        },
    });
    Buy_links.associate = (models) => {
        Buy_links.belongsTo(models.Films, {
            foreignKey: 'filmId'
        });
    };
    return Buy_links;
};
