'use strict';

const path = require('path');
const resolve = require('resolve');
const mapModule = require('babel-plugin-module-resolver').mapModule;
const findBabelConfig = require('find-babel-config'); // eslint-disable-line

function findModuleAliasConfig(conf) {
    if (conf.plugins) {
        return conf.plugins.find(p => p[0] === 'module-resolver' || p[0] === 'babel-plugin-module-resolver');
    }
    return null;
}

function getPluginOpts(config) {
    const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';

    if (config) {
        const pluginConfig = findModuleAliasConfig(config);

        if (config.env && config.env[env]) {
            const envPluginConfig = findModuleAliasConfig(config.env[env]);
            if (envPluginConfig) {
                if (pluginConfig) {
                    return {
                        root: [].concat(pluginConfig[1].root, envPluginConfig[1].root),
                        alias: Object.assign({}, pluginConfig[1].alias, envPluginConfig[1].alias),
                    };
                }
                return envPluginConfig[1];
            }
        }

        if (pluginConfig) {
            return pluginConfig[1];
        }
    }

    return {};
}

function opts(file, config) {
    return Object.assign(
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
 * @param  {object} options - the resolver options
 * @return {object}
 */
exports.resolve = (source, file, options) => {
    if (resolve.isCore(source)) return { found: true, path: null };

    const babelConfig = findBabelConfig.sync(path.dirname(file));
    const babelrcPath = babelConfig.file;
    const config = babelConfig.config;
    let cwd = babelrcPath
        ? path.dirname(babelrcPath)
        : process.cwd();

    try {
        const pluginOpts = getPluginOpts(config);
        if (pluginOpts.cwd !== 'babelrc') {
            cwd = pluginOpts.cwd || cwd;
        }

        const src = mapModule(source, file, pluginOpts, cwd) || source;
        return {
            found: true,
            path: resolve.sync(src, opts(file, options)),
        };
    } catch (e) {
        return { found: false };
    }
};
