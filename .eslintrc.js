module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
    },
    "overrides": [
        {
          "files": ["bin/*.js", "lib/*.js"],
          "excludedFiles": "webpack/*",
          "rules": {
            "quotes": ["error", "single"]
          }
        }
      ]
};