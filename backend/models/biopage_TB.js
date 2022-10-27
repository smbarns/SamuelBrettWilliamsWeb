module.exports = (sequelize, DataTypes) => {
    const Biopage = sequelize.define("Biopage", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        bio_des: {
            type: DataTypes.TEXT
        },
        client_photo: {
            type: DataTypes.TEXT
        },
    });
    return Biopage;
};