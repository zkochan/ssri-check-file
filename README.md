# ssri-check-file

> Verifies files using subresource integrity hashes

<!--@shields('npm', 'travis')-->
[![npm version](https://img.shields.io/npm/v/ssri-check-file.svg)](https://www.npmjs.com/package/ssri-check-file) [![Build Status](https://img.shields.io/travis/zkochan/ssri-check-file/master.svg)](https://travis-ci.org/zkochan/ssri-check-file)
<!--/@-->

## Install

    npm install ssri-check-file

## Usage

<!--@example('./example.js')-->
```js
'use strict'
const ssriCheckFile = require('ssri-check-file')

ssriCheckFile('.editorconfig', 'sha512-3Araasa9Jnn6DwVZpe7nvi3IgopUNXzy5OyL3D2Dta1cbCnaC3WOCn7H/IZNpKPMus8kOSwC5msrqNBeE7+dSQ==')
  .then(verified => {
    if (verified) {
      console.log('Integrity verified!')
      //> Integrity verified!
    } else {
      console.error('Integrity not verified')
    }
  })
  .catch(err => console.error(err))
```
<!--/@-->

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io/)
