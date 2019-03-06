const base = require("./jest.config.js");

const overrides = {
  testRegex: '/tests/.*\\.(integration|accept)?\\.(ts|tsx)$',
}

module.exports = Object.assign({}, base, overrides);