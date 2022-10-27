module.exports = (sequelize, DataTypes) => {
    const Press = sequelize.define("Press", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quote: {
            type: DataTypes.TEXT
        },
        press_image: {
            type: DataTypes.TEXT
        },
        press_link: {
            type: DataTypes.TEXT
        },
    });
    return Press;
};