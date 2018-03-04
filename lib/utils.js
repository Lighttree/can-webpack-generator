const shell = require('shelljs');

module.exports = {
    getKeywords(keywords) {
        if (typeof keywords === 'string') {
            keywords = keywords.split(/[\s,]+/);
        }

        if (!Array.isArray(keywords)) {
            keywords = [];
        }

        return keywords.sort((a, b) => a.localeCompare(b));
    },

    getRepoUrl() {
        let url;

        if (shell.which('git')) {
            url = shell.exec('git config --get remote.origin.url', { silent: true }).stdout.trim();
        }

        return url;
    }
};
