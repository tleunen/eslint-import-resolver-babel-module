# eslint-import-resolver-babel-module-alias [![Build Status][travis-image]][travis-url] [![npm][npm-version-image]]()

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


[travis-image]: https://travis-ci.org/tleunen/eslint-import-resolver-babel-module-alias.svg?branch=master
[travis-url]: https://travis-ci.org/tleunen/eslint-import-resolver-babel-module-alias
[npm-version-image]: https://img.shields.io/npm/v/eslint-import-resolver-babel-module-alias.svg
[module-alias]: https://github.com/tleunen/babel-plugin-module-alias
[eslint-plugin-import]: https://github.com/benmosher/eslint-plugin-import
