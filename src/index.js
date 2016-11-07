'use strict';

const path = require('path');
const resolve = require('resolve');
const mapModule = require('babel-plugin-module-resolver').mapModule;
const targetPlugin = require('babel-plugin-module-resolver').default;
const OptionManager =
    require('babel-core/lib/transformation/file/options/option-manager');

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

    try {
        const manager = new OptionManager();
        const result = manager.init({
            babelrc: true,
            filename: file,
        });
        const instances = result.plugins.filter((plugin) => {
            const plug = OptionManager.memoisedPlugins.find(item =>
                item.plugin === plugin[0]
            );
            return plug && plug.container === targetPlugin;
        });
        const pluginOpts = instances.reduce((config, plugin) => ({
            cwd: plugin[1] && plugin[1].cwd ? plugin[1].cwd : config.cwd,
            root: config.root.concat(plugin[1] && plugin[1].root ? plugin[1].root : []),
            alias: Object.assign(config.alias, plugin[1] ? plugin[1].alias : {}),
        }), { root: [], alias: {}, cwd: process.cwd() });
        pluginOpts.cwd = path.resolve(pluginOpts.cwd);
        const src = mapModule(source, file, pluginOpts, pluginOpts.cwd) || source;
        return {
            found: true,
            path: resolve.sync(src, opts(file, options)),
        };
    } catch (e) {
        return { found: false };
    }
};
