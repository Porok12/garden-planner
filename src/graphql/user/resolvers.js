const db = require("../../models");
const User = db.user;
const {requireUserRole} = require("../utils");

module.exports = {
    users: (args, request) => {
        requireUserRole(request.user);

        const {page, slice} = args.pagination;
        return User.findAll({
            where: { ...args.input },
            offset: (page - 1) * slice,
            limit: slice
        }).then(users => {
            return User.count({ where: { ...args.input } })
                .then(count => {
                    users.push({total: count});
                    return users;
                });
        });
    },
    user: (args) => {
        return User.findOne({where: { username: args.username}});
    }
}
