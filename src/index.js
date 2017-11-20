const path = require('path');
const resolve = require('resolve');
const pkgUp = require('pkg-up');
const { resolvePath } = require('babel-plugin-module-resolver');
const { OptionManager } = require('@babel/core');

function getPluginOptions(file) {
  const manager = new OptionManager();
  const result = manager.init({
    babelrc: true,
    filename: file,
  });

  return result.plugins
    .filter(plugin => (Array.isArray(plugin) ? plugin[0] : plugin).key === 'module-resolver')
    .map(plugin => (Array.isArray(plugin) ? plugin[1] : plugin.options) || {});
}

function stripWebpack(src) {
  let source = src;

  // strip loaders
  const finalBang = source.lastIndexOf('!');
  if (finalBang >= 0) {
    source = source.slice(finalBang + 1);
  }

  // strip resource query
  const finalQuestionMark = source.lastIndexOf('?');
  if (finalQuestionMark >= 0) {
    source = source.slice(0, finalQuestionMark);
  }

  return source;
}

exports.interfaceVersion = 2;

const defaultExtensions = ['.js', '.jsx', '.es', '.es6', '.mjs'];

/**
 * Find the full path to 'source', given 'file' as a full reference path.
 *
 * resolveImport('./foo', '/Users/ben/bar.js') => '/Users/ben/foo.js'
 * @param  {string} source - the module to resolve; i.e './some-module'
 * @param  {string} file - the importing file's full path; i.e. '/usr/local/bin/file.js'
 * @param  {object} options - the resolver options
 * @return {object}
 */
exports.resolve = (source, file, opts) => {
  const options = opts || {};
  if (resolve.isCore(source)) return { found: true, path: null };

  const projectRootDir = path.dirname(pkgUp.sync(file));

  try {
    const pluginOptionsList = getPluginOptions(file);

    const pluginOptions = pluginOptionsList.reduce(
      (config, rawPluginOptions) => ({
        cwd: rawPluginOptions.cwd || config.cwd,
        root: config.root.concat(rawPluginOptions.root || []),
        alias: Object.assign(config.alias, rawPluginOptions.alias),
        extensions: rawPluginOptions.extensions || config.extensions,
      }),
      {
        // if .babelrc doesn't exist, try to get the configuration information from `options`,
        // which gets defined by the eslint configuration file.
        // e.g. in .eslintrc file
        // "import/resolver": {
        //   "babel-module": {
        //     "root": ["./src"],
        //     "extensions": [".js", ".jsx"]
        //   }
        // }
        cwd: options.cwd || projectRootDir,
        root: options.root || [],
        alias: options.alias || {},
        extensions: options.extensions || defaultExtensions,
      },
    );

    const finalSource = stripWebpack(source);
    const src = resolvePath(finalSource, file, pluginOptions);

    const extensions = options.extensions || pluginOptions.extensions;

    return {
      found: true,
      path: resolve.sync(src || source, {
        ...options,
        extensions,
        basedir: path.dirname(file),
      }),
    };
  } catch (e) {
    return { found: false };
  }
};
