module.exports = function (wallaby) {
    return {
        files: [
            'src/**/*.js'
        ],

        tests: [
            'src/**/test.js'
        ]
      ...
    };
};
