# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="3.0.0"></a>
# [3.0.0](https://github.com/tleunen/eslint-import-resolver-babel-module/compare/v2.2.1...v3.0.0) (2017-02-05)


### Bug Fixes

* Fix support for custom extensions from babel ([#39](https://github.com/tleunen/eslint-import-resolver-babel-module/issues/39)) ([fa885e8](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/fa885e8))


### Features

* Use babel's built-in option manager for loading configs ([#34](https://github.com/tleunen/eslint-import-resolver-babel-module/issues/34)) ([c526927](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/c526927))


### Fix

* Fix linting when using a root glob config ([#38](https://github.com/tleunen/eslint-import-resolver-babel-module/issues/38)) ([45a78be](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/45a78be))


### BREAKING CHANGES

* Now requires babel-plugin-module-resolver >= 2.5.0
* The root config and alias must be relative to the project root, not relative to the babelrc file.



<a name="2.2.1"></a>
## [2.2.1](https://github.com/tleunen/eslint-import-resolver-babel-module/compare/v2.2.0...v2.2.1) (2016-11-11)


### Reverts

* "Use `babel`'s built-in option manager for loading configs." ([#31](https://github.com/tleunen/eslint-import-resolver-babel-module/issues/31)) ([6d1add0](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/6d1add0))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/tleunen/eslint-import-resolver-babel-module/compare/v2.1.1...v2.2.0) (2016-11-09)


### Features

* Add support for having the babel plugin configured in a preset ([#28](https://github.com/tleunen/eslint-import-resolver-babel-module/issues/28)) ([952863e](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/952863e))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/tleunen/eslint-import-resolver-babel-module/compare/v2.1.0...v2.1.1) (2016-11-07)


### Bug Fixes

* Fix usage of let ([a925e3f](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/a925e3f))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/tleunen/eslint-import-resolver-babel-module/compare/v3.0.0-beta.1...v2.1.0) (2016-11-06)


### Features

* Add support for the custom cwd option from babel-resolver ([0a0d42c](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/0a0d42c))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/tleunen/eslint-import-resolver-babel-module/compare/v2.0.0...v2.0.1) (2016-08-14)


### Bug Fixes

* Remove deconstructuring to fix build on Node < 6 ([9649b9a](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/9649b9a))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/tleunen/eslint-import-resolver-babel-module/compare/v1.5.1...v2.0.0) (2016-08-14)


### Features

* Support for new version of babel-plugin-module-resolver v2 ([f2fc1f3](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/f2fc1f3))


### BREAKING CHANGES

* This removes the support for babel-plugin-module-alias v1



<a name="1.5.1"></a>
## [1.5.1](https://github.com/tleunen/eslint-import-resolver-babel-module-alias/compare/v1.5.0...v1.5.1) (2016-08-09)


### Bug Fixes

* Fix config lookup with specific environment ([50f4f6e](https://github.com/tleunen/eslint-import-resolver-babel-module-alias/commit/50f4f6e)), closes [#22](https://github.com/tleunen/eslint-import-resolver-babel-module-alias/issues/22)



<a name="1.5.0"></a>
# [1.5.0](https://github.com/tleunen/eslint-import-resolver-babel-module-alias/compare/v1.4.2...v1.5.0) (2016-08-06)


### Bug Fixes

* **resolver:** Add cascading support ([#17](https://github.com/tleunen/eslint-import-resolver-babel-module-alias/issues/17)) ([dd94f0a](https://github.com/tleunen/eslint-import-resolver-babel-module-alias/commit/dd94f0a)), closes [#15](https://github.com/tleunen/eslint-import-resolver-babel-module-alias/issues/15)
* Also search config with 'babel-plugin-' prefix name ([c7633d6](https://github.com/tleunen/eslint-import-resolver-babel-module-alias/commit/c7633d6))


### Features

* Add "env" support ([#19](https://github.com/tleunen/eslint-import-resolver-babel-module-alias/issues/19)) ([71431bd](https://github.com/tleunen/eslint-import-resolver-babel-module-alias/commit/71431bd))



<a name="1.4.2"></a>
## [1.4.2](https://github.com/tleunen/eslint-import-resolver-babel-module-alias/compare/v1.4.1...v1.4.2) (2016-07-10)


### Bug Fixes

* **mapping:** Fix mapping again in editors ([3b3bc98](https://github.com/tleunen/eslint-import-resolver-babel-module-alias/commit/3b3bc98))



<a name="1.4.1"></a>
## [1.4.1](https://github.com/tleunen/eslint-import-resolver-babel-module-alias/compare/v1.4.0...v1.4.1) (2016-07-10)
