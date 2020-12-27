const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        logging: false,
        define: {
            freezeTableName: true,
            timestamps: false,
            underscored: false
        },
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user")(sequelize, Sequelize);
db.role = require("../models/role")(sequelize, Sequelize);
db.plant = require("../models/plant")(sequelize, Sequelize);

db.role.belongsToMany(db.user, { through: "user_roles" });
db.user.belongsToMany(db.role, { through: "user_roles" });

db.ROLES = ["user", "admin", "moderator"];

db.initial = function () {
    db.sequelize.sync({force: true}).then(() => {
        console.log('Drop and Resync Db');
        initial();
    });

    function initial() {
        db.role.create({
            id: 1,
            name: "user"
        });

        db.role.create({
            id: 2,
            name: "moderator"
        });

        db.role.create({
            id: 3,
            name: "admin"
        });

        db.user.create({
            id: 1,
            username: 'agata',
            email: 'aga@best.pl',
            password: 'A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3'.toLowerCase()
        }).then(user => {
            user.addRole(1);
        });

        db.plant.create({
            commonName: 'siberian pine',
            binomialName: 'pinus sibirica',
            kingdom: 'plantae',
            family: 'pinaceae',
            genus: 'pinus'
        });

        db.plant.create({
            commonName: 'eastern white pine',
            binomialName: 'pinus strobus',
            kingdom: 'plantae',
            family: 'pinaceae',
            genus: 'Pinus'
        });

        db.plant.create({
            commonName: 'swiss pine',
            binomialName: 'pinus cembra',
            kingdom: 'plantae',
            family: 'pinaceae',
            genus: 'pinus'
        });

        db.plant.create({
            commonName: 'korean pine',
            binomialName: 'pinus koraiensis',
            kingdom: 'plantae',
            family: 'pinaceae',
            genus: 'pinus'
        });

        db.plant.create({
            commonName: 'siberian dwarf pine',
            binomialName: 'pinus pumila',
            kingdom: 'plantae',
            family: 'pinaceae',
            genus: 'pinus'
        });
    }
}

module.exports = db;
