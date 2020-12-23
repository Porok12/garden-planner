module.exports = (sequelize, Sequelize) => {
    return sequelize.define("plant", {
        commonName: {
            type: Sequelize.STRING(64),
            allowNull: false
        },
        binomialName: {
            type: Sequelize.STRING(64),
            allowNull: false
        },
        kingdom: {
            type: Sequelize.STRING(32),
            allowNull: false
        },
        family: {
            type: Sequelize.STRING(32),
            allowNull: false
        },
        genus: {
            type: Sequelize.STRING(32),
            allowNull: false
        }
    });
}
