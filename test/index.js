/* eslint-env mocha */
const expect = require('chai').expect;

const path = require('path');
const resolverPlugin = require('../src/index');

const opts = {
};
const extensionOpts = { extensions: ['.js', '.jsx'] };

describe('eslint-import-resolver-module-alias', () => {
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
        expect(resolverPlugin.resolve('components/c1', path.resolve('./test/examples/components/subcomponent/sub/c2'), opts))
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
