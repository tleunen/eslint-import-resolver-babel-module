/* eslint-env mocha */
/*
eslint import/no-extraneous-dependencies: [2, {
  devDependencies: true,
  optionalDependencies: false,
}]
*/
const expect = require('chai').expect;

const path = require('path');
const resolverPlugin = require('../src/index');

const opts = {};
const extensionOpts = { extensions: ['.js', '.jsx'] };

describe('eslint-import-resolver-module-resolver', () => {
    it('should export the interfaceVersion', () => {
        expect(resolverPlugin)
            .to.have.property('interfaceVersion')
            .that.is.a('number')
            .that.equals(2);
    });

    it('should return `true` when mapped to a npm module', () => {
        expect(resolverPlugin.resolve('underscore', path.resolve('./test/examples/file1'), opts))
            .to.eql({
                found: true,
                path: path.resolve(__dirname, '../node_modules/lodash/lodash.js')
            });
    });

    it('should return `true` when mapped to a file', () => {
        expect(resolverPlugin.resolve('components/c1', path.resolve('./test/examples/components/sub/sub/c2.js'), opts))
            .to.eql({
                found: true,
                path: path.resolve(__dirname, './examples/components/c1.js')
            });
    });

    it('should return `true` when no mapping is required', () => {
        expect(resolverPlugin.resolve('./sub/sub/c2', path.resolve('./test/examples/components/c1'), opts))
            .to.eql({
                found: true,
                path: path.resolve(__dirname, './examples/components/sub/sub/c2.js')
            });
    });

    it('should return `false` when a module is not found', () => {
        expect(resolverPlugin.resolve('this_unknown_plugin', path.resolve('./test/example/file1'), opts))
            .to.eql({ found: false });
    });

    it('should return `false` when the mapped file is not found', () => {
        expect(resolverPlugin.resolve('components/noc1', path.resolve('./test/examples/components/subcomponent/sub/c2'), opts))
            .to.eql({ found: false });
    });

    it('should return `path: null` for core modules', () => {
        expect(resolverPlugin.resolve('fs', path.resolve('./'), opts))
            .to.eql({ found: true, path: null });
        expect(resolverPlugin.resolve('path', path.resolve('./'), opts))
            .to.eql({ found: true, path: null });
    });

    describe('with specific file extensions', () => {
        it('should return `false` with a file with an unknown extension', () => {
            expect(resolverPlugin.resolve('./c3', path.resolve('./test/examples/components/c1'), opts))
                .to.eql({ found: false });
        });

        it('should return `true` with a file with an expected extension', () => {
            expect(resolverPlugin.resolve('./c3', path.resolve('./test/examples/components/c1'), extensionOpts))
                .to.eql({
                    found: true,
                    path: path.resolve(__dirname, './examples/components/c3.jsx')
                });
        });

        it('should return `false` when mapped to a file with an unknown extension', () => {
            expect(resolverPlugin.resolve('components/c3', path.resolve('./test/examples/components/subcomponent/sub/c2'), opts))
                .to.eql({ found: false });
        });

        it('should return `true` when mapped to a file with an expected extension', () => {
            expect(resolverPlugin.resolve('components/c3', path.resolve('./test/examples/components/subcomponent/sub/c2'), extensionOpts))
                .to.eql({
                    found: true,
                    path: path.resolve(__dirname, './examples/components/c3.jsx')
                });
        });
    });

    describe('mapping only in specific environment', () => {
        describe('when both the default and "env" are available', () => {
            it('should return `false` when the mapping doesn\'t exist in "env"', () => {
                const oldEnv = process.env.NODE_ENV;
                process.env.NODE_ENV = 'development';

                expect(resolverPlugin.resolve('subsub/c2', path.resolve('./test/examples/components/c1'), opts))
                    .to.eql({ found: false });

                process.env.NODE_ENV = oldEnv;
            });

            it('should return `true` when the mapping exists in the "env"', () => {
                const oldEnv = process.env.NODE_ENV;
                process.env.NODE_ENV = 'test';

                expect(resolverPlugin.resolve('subsub/c2', path.resolve('./test/examples/components/c1'), opts))
                    .to.eql({
                        found: true,
                        path: path.resolve(__dirname, './examples/components/sub/sub/c2.js')
                    });

                process.env.NODE_ENV = oldEnv;
            });
        });

        describe('when ony specific env is available', () => {
            it('should return `false` when the mapping doesn\'t exist in "env"', () => {
                const oldEnv = process.env.NODE_ENV;
                process.env.NODE_ENV = 'development';

                expect(resolverPlugin.resolve('subsub/c2', path.resolve('./test/examples/components/sub/envonly/yo'), opts))
                    .to.eql({ found: false });

                process.env.NODE_ENV = oldEnv;
            });

            it('should return `true` when the mapping exists in the "env"', () => {
                const oldEnv = process.env.NODE_ENV;
                process.env.NODE_ENV = 'test';

                expect(resolverPlugin.resolve('subsub/c2', path.resolve('./test/examples/components/sub/envonly/yo'), opts))
                    .to.eql({
                        found: true,
                        path: path.resolve(__dirname, './examples/components/sub/sub/c2.js')
                    });

                process.env.NODE_ENV = oldEnv;
            });
        });
    });
});
