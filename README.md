# TopoSort Test
> Package Depencency Checker

## Background
Brushing up on my algo chops and trying to find real world applications for them as npms.

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
- Use Privates/Publics & this/self
- Convert to es6

## License
MIT
Created By: [Tommy Ryan](http://www.tommy-ryan.com)
