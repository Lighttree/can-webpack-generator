const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

function getDefaultFilesForAppPath(appPath) {
    return [
        `${appPath}/config/utils.js`,
        `${appPath}/config/webpack.common.js`,
        `${appPath}/config/webpack.prod.js`,
        `${appPath}/config/webpack.dev.js`,
        `${appPath}/src/app/models/fixtures/fixtures.js`,
        `${appPath}/src/app/models/test.js`,
        `${appPath}/src/app/app.js`,
        `${appPath}/src/app/app.scss`,
        `${appPath}/src/app/app.stache`,
        `${appPath}/src/app/polyfills.browser.js`,
        `${appPath}/src/index.html`,
        '.csscomb.json',
        '.eslintrc.json',
        '.gitignore',
        'assembly.xml',
        'package.json',
        'pom.xml',
        'readme.md',
        'webpack.config.js'
    ];
}

describe('generator-can-webpack:app', () => {
    let directory;

    beforeEach(() => helpers
        .run(path.join(__dirname, '../generators/app'))
        .withOptions({ skipInstall: true })
        .withPrompts({ name: 'test-app' })
        .then((dir) => {
            directory = dir;
        }));

    it('creates files', () => {
        assert.file(getDefaultFilesForAppPath(directory));
    });
});
