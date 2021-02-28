module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
        name: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Project;
};
