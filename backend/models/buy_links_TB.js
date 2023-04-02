module.exports = (sequelize, DataTypes) => {
    const Buy_links = sequelize.define("Buy_links", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        link: {
            type: DataTypes.STRING,
        },
        link_photo: {
            type: DataTypes.TEXT
        },
    }, {
        tableName: "Buy_links",
        timestamps: false
    });
    Buy_links.associate = (models) => {
        Buy_links.belongsTo(models.Films, {
            as: 'films',
            foreignKey: 'filmId'
        });
        Buy_links.belongsTo(models.Plays, {
            as: 'plays',
            foreignKey: 'playId'
        });
    };
    return Buy_links;
};
