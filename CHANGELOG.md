# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="5.0.0-beta.1"></a>
# [5.0.0-beta.1](https://github.com/tleunen/eslint-import-resolver-babel-module/compare/v5.0.0-beta.0...v5.0.0-beta.1) (2018-08-14)



<a name="5.0.0-beta.0"></a>
# [5.0.0-beta.0](https://github.com/tleunen/eslint-import-resolver-babel-module/compare/v4.0.0...v5.0.0-beta.0) (2017-12-11)


### Bug Fixes

* **babel:** Support latest babel 7 only ([#78](https://github.com/tleunen/eslint-import-resolver-babel-module/issues/78)) ([f2804c5](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/f2804c5))


### BREAKING CHANGES

* **babel:** This resolver now requires babel 7



<a name="4.0.0"></a>
# [4.0.0](https://github.com/tleunen/eslint-import-resolver-babel-module/compare/v4.0.0-beta.5...v4.0.0) (2017-12-11)


### Bug Fixes

* **babel:** Support only babel 6 ([#80](https://github.com/tleunen/eslint-import-resolver-babel-module/issues/80)) ([f01d29d](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/f01d29d))



<a name="4.0.0-beta.5"></a>
# [4.0.0-beta.5](https://github.com/tleunen/eslint-import-resolver-babel-module/compare/v4.0.0-beta.4...v4.0.0-beta.5) (2017-10-12)



<a name="4.0.0-beta.4"></a>
# [4.0.0-beta.4](https://github.com/tleunen/eslint-import-resolver-babel-module/compare/v4.0.0-beta.3...v4.0.0-beta.4) (2017-10-12)


### Features

* Add support for Babel 7.0.0 ([#63](https://github.com/tleunen/eslint-import-resolver-babel-module/issues/63)) ([1ffa7f5](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/1ffa7f5))
* Allow the resolver options to be set in the eslint file ([#68](https://github.com/tleunen/eslint-import-resolver-babel-module/issues/68)) ([8ee7c08](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/8ee7c08))



<a name="4.0.0-beta.3"></a>
# [4.0.0-beta.3](https://github.com/tleunen/eslint-import-resolver-babel-module/compare/v4.0.0-beta.2...v4.0.0-beta.3) (2017-07-10)


### Bug Fixes

* Use new resolvePath function from module-resolver 3.0.0-beta.4 ([f731792](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/f731792))



<a name="4.0.0-beta.2"></a>
# [4.0.0-beta.2](https://github.com/tleunen/eslint-import-resolver-babel-module/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2017-05-17)


### Features

* Strip the webpack loaders and query string from the source before resolving the file ([#60](https://github.com/tleunen/eslint-import-resolver-babel-module/issues/60)) ([21c37f2](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/21c37f2)), closes [#59](https://github.com/tleunen/eslint-import-resolver-babel-module/issues/59)



<a name="4.0.0-beta.1"></a>
# [4.0.0-beta.1](https://github.com/tleunen/eslint-import-resolver-babel-module/compare/v4.0.0-beta.0...v4.0.0-beta.1) (2017-04-25)


### Bug Fixes

* Fix resolution when using a custom cwd ([#55](https://github.com/tleunen/eslint-import-resolver-babel-module/issues/55)) ([188f338](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/188f338)), closes [#43](https://github.com/tleunen/eslint-import-resolver-babel-module/issues/43)
* Fix the custom babel cwd in an editor ([#56](https://github.com/tleunen/eslint-import-resolver-babel-module/issues/56)) ([b13ffd9](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/b13ffd9))



<a name="4.0.0-beta.0"></a>
# [4.0.0-beta.0](https://github.com/tleunen/eslint-import-resolver-babel-module/compare/v3.0.0...v4.0.0-beta.0) (2017-04-23)


### Bug Fixes

* Fix build ([91029b8](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/91029b8))
* Fix lib to support babel plugin v3 ([#54](https://github.com/tleunen/eslint-import-resolver-babel-module/issues/54)) ([731ab8c](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/731ab8c))
* Prevents `options.extensions` from failing when `options` is `null` ([#47](https://github.com/tleunen/eslint-import-resolver-babel-module/issues/47)) ([5d297a7](https://github.com/tleunen/eslint-import-resolver-babel-module/commit/5d297a7))


### BREAKING CHANGES

* Not compatible with babel-plugin-module-resolver v2.x



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
