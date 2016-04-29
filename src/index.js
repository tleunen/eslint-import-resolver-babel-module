const path = require('path');
const fs = require('fs');
const resolve = require('resolve');
const mapModule = require('babel-plugin-module-alias').mapModule;

function getMappingFromBabelrc() {
    const babelrcPath = path.join(process.cwd(), '.babelrc');
    const babelrc = fs.readFileSync(babelrcPath, 'utf8');

    const babelrcJson = JSON.parse(babelrc);

    if (babelrcJson && Array.isArray(babelrcJson.plugins)) {
        const pluginConfig = babelrcJson.plugins.find(p => p[0] === 'module-alias');
        return pluginConfig[1];
    }
    return [];
}

exports.interfaceVersion = 2;

/**
 * Find the full path to 'source', given 'file' as a full reference path.
 *
 * resolveImport('./foo', '/Users/ben/bar.js') => '/Users/ben/foo.js'
 * @param  {string} source - the module to resolve; i.e './some-module'
 * @param  {string} file - the importing file's full path; i.e. '/usr/local/bin/file.js'
 * @param  {object} config - the resolver options
 * @return {object}
 */
exports.resolve = (source, file/* , config */) => {
    const mapping = getMappingFromBabelrc().reduce((memo, e) => {
        memo[e.expose] = e.src; // eslint-disable-line no-param-reassign
        return memo;
    }, {});

    try {
        const src = mapModule(source, file, mapping) || source;
        return {
            found: true,
            path: resolve.sync(src, {
                basedir: path.dirname(file)
            })
        };
    } catch (e) {
        return { found: false };
    }
};
