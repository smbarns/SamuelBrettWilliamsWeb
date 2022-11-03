module.exports = (sequelize, DataTypes) => {
    const Contactpage = sequelize.define("Contactpage", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        client_info: {
            type: DataTypes.STRING
        },
        agent_info: {
            type: DataTypes.STRING
        },
    }, {
        tableName: "Contactpage",
        timestamps: false
    });
    return Contactpage;
};