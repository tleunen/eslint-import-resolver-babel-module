const path = require('path');
const resolve = require('resolve');
const pkgUp = require('pkg-up');
const { resolvePath } = require('babel-plugin-module-resolver');
const { OptionManager } = require('@babel/core');

function getPlugins(file, cwd, babelOptions) {
  try {
    const manager = new OptionManager();
    const result = manager.init({
      babelrc: true,
      filename: file,
      cwd,
      ...babelOptions,
    });

    return result.plugins.filter(plugin => plugin.key === 'module-resolver');
  } catch (err) {
    // This error should only occur if something goes wrong with babel's
    // internals. Dump it to console so people know what's going on,
    // elsewise the error will simply be squelched in the calling code.
    console.error('[eslint-import-resolver-babel-module]', err);
    console.error('See: https://github.com/tleunen/eslint-import-resolver-babel-module/pull/34');
    return [];
  }
}

function getPluginOptions(file, cwd, defaultOptions) {
  const instances = getPlugins(file, cwd, defaultOptions.babelOptions);

  return instances.reduce(
    (config, plugin) => ({
      cwd: plugin.options.cwd || config.cwd,
      root: config.root.concat(plugin.options.root || []),
      alias: Object.assign(config.alias, plugin.options.alias || {}),
      resolvePath: plugin.options.resolvePath || config.resolvePath,
      extensions: plugin.options.extensions || config.extensions,
    }),
    defaultOptions,
  );
}

function stripWebpack(src, alias) {
  let source = src;
  const aliases = Object.keys(alias);
  let index = source.length;
  aliases.forEach(((element) => {
    const i = source.indexOf(element);
    if (i >= 0 && i < index) {
      index = i;
    }
  }));
  // strip loaders
  const finalBang = index ? source.lastIndexOf('!', index - 1) : -1;
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
    const pluginOptions = getPluginOptions(
      file,
      projectRootDir,
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
        resolvePath: options.resolvePath,
        extensions: options.extensions || defaultExtensions,
        babelOptions: options.babelOptions || {},
      },
    );

    const finalSource = stripWebpack(source, pluginOptions.alias);
    const resolvePathFunc = pluginOptions.resolvePath || resolvePath;
    const src = resolvePathFunc(finalSource, file, pluginOptions);

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
