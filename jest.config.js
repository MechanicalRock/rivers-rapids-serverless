module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.(test|spec|integration|accept)?\\.(ts|tsx)$',
    testPathIgnorePatterns: ["/lib/", "/node_modules/"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
}
