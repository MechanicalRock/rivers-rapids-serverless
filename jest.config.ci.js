const base = require("./jest.config.js");

const overrides = {
  // Place any overrides here
  testRegex: '/tests/.*\\.(test|spec|integration)?\\.(ts|tsx)$',
  coverageThreshold: {
    "global": {
      "branches": 50,
      "functions": 60,
      "lines": 55,
      "statements": 55
    }
  }
};

module.exports = Object.assign({}, base, overrides);
