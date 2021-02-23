module.exports = {
    verbose: true,
    // testEnvironment: "jsdom",
    testEnvironment: "node",
    coveragePathIgnorePatterns: ["<rooTDir>/node_modules/"],
    testPathIgnorePatterns: ["<rootDir>/front/", "<rootDir>/node_modules/"]
};
