const path = require('path');
const resolve = require('resolve');
const mapModule = require('babel-plugin-module-alias').mapModule;
const assign = require('object-assign');
const findBabelConfig = require('find-babel-config'); // eslint-disable-line

function findModuleAliasConfig(conf) {
    return conf.plugins.find(p => p[0] === 'module-alias' || p[0] === 'babel-plugin-module-alias');
}

function getMappingFromBabel(start) {
    // `let` is not supported outside of the strict mode in node 4 :/
    // eslint-disable-next-line strict
    'use strict';

    const c = findBabelConfig.sync(start);
    const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';

    if (c && c.config) {
        let pluginConfig;
        if (c.config.plugins) {
            pluginConfig = findModuleAliasConfig(c.config);
        }

        if (c.config.env && c.config.env[env] && Array.isArray(c.config.env[env].plugins)) {
            const envPluginConfig = findModuleAliasConfig(c.config.env[env]);
            if (envPluginConfig) {
                if (pluginConfig) {
                    pluginConfig[1] = pluginConfig[1].concat(envPluginConfig[1]);
                } else {
                    pluginConfig = envPluginConfig;
                }
            }
        }

        if (pluginConfig) {
            // The src path inside babelrc are from the root so we have
            // to change the working directory for the "current file directory"
            // in order for the mapping in the editor (atom/sublime) to work properly
            process.chdir(path.dirname(c.file));
            return pluginConfig[1];
        }
    }

    // istanbul ignore next
    // cannot reach in this test suite
    return [];
}

function opts(file, config) {
    return assign(
        {},
        config,
        { basedir: path.dirname(file) }
    );
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
exports.resolve = (source, file, config) => {
    const mapping = getMappingFromBabel(path.dirname(file)).reduce((memo, e) => {
        memo[e.expose] = e.src; // eslint-disable-line no-param-reassign
        return memo;
    }, {});

    if (resolve.isCore(source)) return { found: true, path: null };

    try {
        const src = mapModule(source, file, mapping) || source;
        return {
            found: true,
            path: resolve.sync(src, opts(file, config)),
        };
    } catch (e) {
        return { found: false };
    }
};
