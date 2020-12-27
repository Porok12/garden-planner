class UnauthorizedError extends Error {
    constructor() {
        super("UnauthorizedError");
    }
}

class InsufficientRoleError extends Error {
    constructor(role) {
        super(`InsufficientRoleError (${role})`);
    }
}

module.exports = {
    UnauthorizedError,
    InsufficientRoleError
};
