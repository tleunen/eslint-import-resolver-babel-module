# eslint-import-resolver-babel-module-alias
[![npm][npm-version-image]][npm-url] [![Build Status][ci-image]][ci-url] [![Coverage Status][coverage-image]][coverage-url]

A [babel-plugin-module-alias][module-alias] resolver for [eslint-plugin-import][eslint-plugin-import]

## Installation

```sh
npm install --save-dev eslint-plugin-import eslint-import-resolver-babel-module-alias
```

## Usage

Inside your `.eslintrc` file, pass this resolver to `eslint-plugin-import`:
```
"settings": {
  "import/resolver": {
    "babel-module-alias": {}
  }
}
```

And see [babel-plugin-module-alias][module-alias] to know how to configure your aliases.

### Example

```json
{
  "extends": "airbnb",
  "rules": {
    "indent": [2, 4, { "SwitchCase": 1 }]
  },
  "settings": {
    "import/resolver": {
      "babel-module-alias": {}
    }
  }
}
```

## License

MIT, see [LICENSE.md](/LICENSE.md) for details.


[ci-image]: https://circleci.com/gh/tleunen/eslint-import-resolver-babel-module-alias.svg?style=shield
[ci-url]: https://circleci.com/gh/tleunen/eslint-import-resolver-babel-module-alias
[coverage-image]: https://codecov.io/gh/tleunen/eslint-import-resolver-babel-module-alias/branch/master/graph/badge.svg
[coverage-url]: https://codecov.io/gh/tleunen/eslint-import-resolver-babel-module-alias
[npm-version-image]: https://img.shields.io/npm/v/eslint-import-resolver-babel-module-alias.svg
[npm-url]: https://www.npmjs.com/package/eslint-import-resolver-babel-module-alias
[module-alias]: https://github.com/tleunen/babel-plugin-module-alias
[eslint-plugin-import]: https://github.com/benmosher/eslint-plugin-import
