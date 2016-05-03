const path = require('path');
const fs = require('fs');
const resolve = require('resolve');
const JSON5 = require('json5');
const mapModule = require('babel-plugin-module-alias').mapModule;

function getMappingFromBabel(start) {
    if (!start) return [];

    const babelrc = path.join(start, '.babelrc');
    if (fs.existsSync(babelrc)) {
        const babelrcJson = JSON5.parse(fs.readFileSync(babelrc, 'utf8'));
        if (babelrcJson && Array.isArray(babelrcJson.plugins)) {
            const pluginConfig = babelrcJson.plugins.find(p => p[0] === 'module-alias');
            // The src path inside babelrc are from the root so we have
            // to change the working directory for the same directory
            // to make the mapping to work properly
            process.chdir(path.dirname(babelrc));
            return pluginConfig[1];
        }
    }
    return getMappingFromBabel(path.dirname(start));
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
    const mapping = getMappingFromBabel(process.cwd()).reduce((memo, e) => {
        memo[e.expose] = e.src; // eslint-disable-line no-param-reassign
        return memo;
    }, {});

    if (resolve.isCore(source)) return { found: true, path: null };

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
