const config = require("../config/db.config.js");
const pushData = require('./test.db');

const { Sequelize } = require("sequelize");
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
db.project = require("../models/project")(sequelize, Sequelize);

db.role.belongsToMany(db.user, { through: "user_roles" });
db.user.belongsToMany(db.role, { through: "user_roles" });
db.user.hasMany(db.project, { foreignKey: { allowNull: false } });
db.project.belongsTo(db.user);

db.ROLES = ["user", "admin", "moderator"];

db.connect = function (then) {
    db.sequelize.sync({force: true}).then(() => {
        console.log('Drop and Resync Db');
        pushData(db);

        then();
    });
}

module.exports = db;
