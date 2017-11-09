'use strict'
const ssriCheckFile = require('ssri-check-file')

ssriCheckFile('.editorconfig', 'sha512-3Araasa9Jnn6DwVZpe7nvi3IgopUNXzy5OyL3D2Dta1cbCnaC3WOCn7H/IZNpKPMus8kOSwC5msrqNBeE7+dSQ==')
  .then(verified => {
    if (verified) {
      console.log('Integrity verified!')
    } else {
      console.error('Integrity not verified')
    }
  })
  .catch(err => console.error(err))
