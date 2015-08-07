# Pluralsight Test
> Package Depencency Checker

## Requirements

To run the tests you'll need some stuff like Node, Gulp, JSHint, JSCS, etc.
Mocha's not a bad idea either.  This module was designed to be able to be imported into
another project and run that way.  If you don't care about coverage reports or test outputs
you can run the tests manually via Mocha.

## Setup

```sh
$ npm install
$ npm install -g gulp
```

## Usage

```js
gulp

//For Extra Logging
DEBUG=* gulp
```

## TODO

Use 'fs' to import a CSV file via a data directory.

## License

 © [Tommy Ryan](http://www.tommy-ryan.com)


[npm-image]: https://badge.fury.io/js/pluralsight.svg
[npm-url]: https://npmjs.org/package/pluralsight
[travis-image]: https://travis-ci.org/tallboy/pluralsight.svg?branch=master
[travis-url]: https://travis-ci.org/tallboy/pluralsight
[daviddm-image]: https://david-dm.org/tallboy/pluralsight.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/tallboy/pluralsight
[coveralls-image]: https://coveralls.io/repos/tallboy/pluralsight/badge.svg
[coveralls-url]: https://coveralls.io/r/tallboy/pluralsight
