module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(64),
            allowNull: false
        }
    }, {
        unique: true,
        fields: ['username']
    });

    return User;
};
