# eslint-import-resolver-babel-module
[![npm][npm-version-image]][npm-url] [![Build Status][ci-image]][ci-url] [![Coverage Status][coverage-image]][coverage-url]

A [babel-plugin-module-resolver][babel-plugin-module-resolver] resolver for [eslint-plugin-import][eslint-plugin-import]

## Installation

```sh
npm install --save-dev eslint-plugin-import eslint-import-resolver-babel-module
```

## Usage

Inside your `.eslintrc` file, pass this resolver to `eslint-plugin-import`:
```
"settings": {
  "import/resolver": {
    "babel-module": {}
  }
}
```

And see [babel-plugin-module-resolver][babel-plugin-module-resolver] to know how to configure your aliases.

### Example

```json
{
  "extends": "airbnb",
  "rules": {
    "comma-dangle": 0
  },
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  }
}
```

## License

MIT, see [LICENSE.md](/LICENSE.md) for details.


[ci-image]: https://circleci.com/gh/tleunen/eslint-import-resolver-babel-module.svg?style=shield
[ci-url]: https://circleci.com/gh/tleunen/eslint-import-resolver-babel-module
[coverage-image]: https://codecov.io/gh/tleunen/eslint-import-resolver-babel-module/branch/master/graph/badge.svg
[coverage-url]: https://codecov.io/gh/tleunen/eslint-import-resolver-babel-module
[npm-version-image]: https://img.shields.io/npm/v/eslint-import-resolver-babel-module.svg
[npm-url]: https://www.npmjs.com/package/eslint-import-resolver-babel-module
[babel-plugin-module-resolver]: https://github.com/tleunen/babel-plugin-module-resolver
[eslint-plugin-import]: https://github.com/benmosher/eslint-plugin-import
