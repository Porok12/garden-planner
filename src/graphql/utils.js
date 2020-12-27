const { InsufficientRoleError } = require('./errors');

module.exports = {
    requireUserRole: (user) => {
        if (user) {
            if (Array.isArray(user.roles)) {
                if (user.roles.includes('USER_ROLE')) {
                    return true;
                }
            }
        }

        throw new InsufficientRoleError('user');
    }
}
