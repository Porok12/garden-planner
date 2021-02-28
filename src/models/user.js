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
        },
        activated: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
        token: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tokenExpire: {
            type: Sequelize.DATE,
            allowNull: true
        }
    }, {
        unique: true,
        fields: ['username']
    });

    return User;
};
