module.exports = (sequelize, Sequelize) => {
    return sequelize.define("plant", {
        commonName: Sequelize.STRING(64),
        binomialName: Sequelize.STRING(64),
        kingdom: Sequelize.STRING(32),
        family: Sequelize.STRING(32),
        genus: Sequelize.STRING(32)
    });
}
