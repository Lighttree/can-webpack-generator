const assert = require('yeoman-assert');
const { getKeywords } = require('../lib/utils');

describe('can-webpack:utils', () => {
    it('getKeywords() should return correct keywords', () => {
        assert.deepEqual(getKeywords([]), []);
        assert.deepEqual(getKeywords(['cake', 'yes-no']), ['cake', 'yes-no']);
        assert.deepEqual(getKeywords(['yes-no', 'cake']), ['cake', 'yes-no']);
        assert.deepEqual(getKeywords('cake yes-no'), ['cake', 'yes-no']);
    });
});
