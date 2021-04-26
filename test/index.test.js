/* eslint-env jest */
/* eslint-disable strict */

'use strict';

const path = require('path');
const resolverPlugin = require('../src/index');

const opts = {};
const extensionOpts = { extensions: ['.js', '.jsx'] };

describe('eslint-import-resolver-module-resolver', () => {
  it('should export the interfaceVersion', () => {
    expect(resolverPlugin.interfaceVersion).toBeDefined();
    expect(resolverPlugin.interfaceVersion).toBe(2);
  });

  it('should return `true` when mapped to a npm module', () => {
    expect(resolverPlugin.resolve('pkg-up', path.resolve('./test/examples/file1'), opts))
      .toEqual({
        found: true,
        path: path.resolve(__dirname, '../node_modules/pkg-up/index.js'),
      });
  });

  it('should return `true` when mapped to a file', () => {
    expect(resolverPlugin.resolve('components/c1', path.resolve('./test/examples/components/sub/sub/c2.js'), opts))
      .toEqual({
        found: true,
        path: path.resolve(__dirname, './examples/components/c1.js'),
      });
  });

  it('should return `true` when the file is mapped through a glob root config', () => {
    expect(resolverPlugin.resolve('c2', path.resolve('./test/examples/components/c1.js'), opts))
      .toEqual({
        found: true,
        path: path.resolve(__dirname, './examples/components/sub/sub/c2.js'),
      });
  });

  it('should return `true` when the file uses a custom extension from the babel plugin', () => {
    expect(resolverPlugin.resolve('components/customFile', path.resolve('./test/examples/components/c1.js'), opts))
      .toEqual({
        found: true,
        path: path.resolve(__dirname, './examples/components/customFile.customExt'),
      });
  });

  it('should return `true` when no mapping is required', () => {
    expect(resolverPlugin.resolve('./sub/sub/c2', path.resolve('./test/examples/components/c1'), opts))
      .toEqual({
        found: true,
        path: path.resolve(__dirname, './examples/components/sub/sub/c2.js'),
      });
  });

  it('should return `false` when a module is not found', () => {
    expect(resolverPlugin.resolve('this_unknown_plugin', path.resolve('./test/example/file1'), opts))
      .toEqual({ found: false });
  });

  it('should return `false` when the mapped file is not found', () => {
    expect(resolverPlugin.resolve('components/noc1', path.resolve('./test/examples/components/subcomponent/sub/c2'), opts))
      .toEqual({ found: false });
  });

  it('should return `path: null` for core modules', () => {
    expect(resolverPlugin.resolve('fs', path.resolve('./'), opts))
      .toEqual({ found: true, path: null });
    expect(resolverPlugin.resolve('path', path.resolve('./'), opts))
      .toEqual({ found: true, path: null });
  });

  describe('with webpack paths', () => {
    it('should support a path with a query', () => {
      expect(resolverPlugin.resolve('components/c1?q=sth', path.resolve('./test/examples/components/sub/sub/c2.js'), opts))
        .toEqual({
          found: true,
          path: path.resolve(__dirname, './examples/components/c1.js'),
        });
    });

    it('should support a path with a loader', () => {
      expect(resolverPlugin.resolve('my-loader!components/c1', path.resolve('./test/examples/components/sub/sub/c2.js'), opts))
        .toEqual({
          found: true,
          path: path.resolve(__dirname, './examples/components/c1.js'),
        });
    });

    it('should support multiple loaders', () => {
      expect(resolverPlugin.resolve('style-loader!css-loader!less-loader!components/c1', path.resolve('./test/examples/components/sub/sub/c2.js'), opts))
        .toEqual({
          found: true,
          path: path.resolve(__dirname, './examples/components/c1.js'),
        });
    });

    it('should support multiple loaders for an alias with an exclamation mark', () => {
      expect(resolverPlugin.resolve('style-loader!css-loader!less-loader!!src/c1', path.resolve('./test/examples/components/sub/sub/c2.js'), opts))
        .toEqual({
          found: true,
          path: path.resolve(__dirname, './examples/components/c1.js'),
        });
    });
  });

  describe('with specific file extensions', () => {
    it('should return `false` with a file with an unknown extension', () => {
      expect(resolverPlugin.resolve('./c3', path.resolve('./test/examples/components/c1'), opts))
        .toEqual({ found: false });
    });

    it('should return `true` with a file with an expected extension', () => {
      expect(resolverPlugin.resolve('./c3', path.resolve('./test/examples/components/c1'), extensionOpts))
        .toEqual({
          found: true,
          path: path.resolve(__dirname, './examples/components/c3.jsx'),
        });
    });

    it('should return `false` when mapped to a file with an unknown extension', () => {
      expect(resolverPlugin.resolve('components/c3', path.resolve('./test/examples/components/subcomponent/sub/c2'), opts))
        .toEqual({ found: false });
    });

    it('should return `true` when mapped to a file with an expected extension', () => {
      expect(resolverPlugin.resolve('components/c3', path.resolve('./test/examples/components/subcomponent/sub/c2'), extensionOpts))
        .toEqual({
          found: true,
          path: path.resolve(__dirname, './examples/components/c3.jsx'),
        });
    });

    it('should return `true` when alias contains an exclamation mark', () => {
      expect(resolverPlugin.resolve('!src/c3', path.resolve('./test/examples/components/subcomponent/sub/c2'), extensionOpts))
        .toEqual({
          found: true,
          path: path.resolve(__dirname, './examples/components/c3.jsx'),
        });
    });
  });

  describe('mapping only in specific environment', () => {
    describe('when both the default and "env" are available', () => {
      it('should return `false` when the mapping doesn\'t exist in "env"', () => {
        const oldEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = 'development';

        expect(resolverPlugin.resolve('subsub/c2', path.resolve('./test/examples/components/c1'), opts))
          .toEqual({ found: false });

        process.env.NODE_ENV = oldEnv;
      });

      it('should return `true` when the mapping exists in the "env"', () => {
        const oldEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = 'testenv';

        expect(resolverPlugin.resolve('subsub/c2', path.resolve('./test/examples/components/c1'), opts))
          .toEqual({
            found: true,
            path: path.resolve(__dirname, './examples/components/sub/sub/c2.js'),
          });

        process.env.NODE_ENV = oldEnv;
      });
    });

    describe('when a specific env is available', () => {
      it('should return `false` when the mapping doesn\'t exist in "env"', () => {
        const oldEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = 'development';

        expect(resolverPlugin.resolve('subsub/c2', path.resolve('./test/examples/components/sub/envonly/yo'), opts))
          .toEqual({ found: false });

        process.env.NODE_ENV = oldEnv;
      });

      it('should return `true` when the mapping exists in the "env"', () => {
        const oldEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = 'testenv';

        expect(resolverPlugin.resolve('subsub/c2', path.resolve('./test/examples/components/sub/envonly/yo'), opts))
          .toEqual({
            found: true,
            path: path.resolve(__dirname, './examples/components/sub/sub/c2.js'),
          });

        process.env.NODE_ENV = oldEnv;
      });
    });
  });

  describe('usage in a monorepo', () => {
    it('should return `true` when mapped to a file', () => {
      expect(resolverPlugin.resolve('~/item', path.resolve('./test/examples/monorepo/my-lib/src/item'), extensionOpts))
        .toEqual({
          found: true,
          path: path.resolve(__dirname, './examples/monorepo/my-lib/src/item.js'),
        });
    });
  });

  describe('allowExistingDirectories', () => {
    it('should return `true` when directory exists', () => {
      expect(resolverPlugin.resolve('components/sub', path.resolve('./test/examples/components/sub/c1'), { ...opts, allowExistingDirectories: true }))
        .toEqual({
          found: true,
          path: `${path.resolve(__dirname, './examples/components/sub')}/`,
        });
    });
  });
});
