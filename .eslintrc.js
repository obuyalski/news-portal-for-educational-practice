module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ],
  "rules": {
    "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? 'unix' : 'windows'],
    "comma-dangle": ["error", "never"],
    "import/no-extraneous-dependencies": [2, {"devDependencies": true}],
    "no-use-before-define": ["error", "nofunc"],
    "no-unused-vars": ["off"],
    "no-shadow": ["off"],
    "no-underscore-dangle": ["off"],
    "no-param-reassign": ["error", { "props": false }]
  },
  "env": {
    "browser": true,
    "node": true
  },
  "globals": {
    "window": true,
    "document": true,
    "console": true,
    "pagination": false,
    "articleService": false,
    "articleModel": false,
    "articleRenderer": false,
    "articleActions": false,
    "userModel": false,
    "modalBox": false,
    "searchEngine": false
  }
};