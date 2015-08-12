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

- Use 'fs' to import a CSV file via a data directory.
- Rig up a call stack to process dependencies via index.js

## License

 © [Tommy Ryan](http://www.tommy-ryan.com)
