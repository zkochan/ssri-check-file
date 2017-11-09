'use strict'
const ssriCheckFile = require('ssri-check-file')
const test = require('tape')
const path = require('path')
const ssri = require('ssri')
const fs = require('fs')

const bigFile = path.join(__dirname, 'big.txt')
const bigFileIntegrity = ssri.fromData(fs.readFileSync(bigFile))

const smallFile = path.join(__dirname, 'small.txt')
const smallFileIntegrity = ssri.fromData(fs.readFileSync(smallFile))

const badIntegrity = 'sha256-l981iLWj8kurw4UbNy8Lpxqdzd7UOxS50Glhv8FwfZ0'

test('ssriCheckFile()', t => {
  t.throws(() => ssriCheckFile(1, './fixture'), /got `number`/)
  t.throws(() => ssriCheckFile('fixture'), /got `undefined`/)
  t.end()
})

test('success with big file', t => {
  ssriCheckFile(bigFile, bigFileIntegrity)
    .then(verified => {
      t.ok(verified)
      t.end()
    })
    .catch(t.end)
})

test('fail with big file', t => {
  ssriCheckFile(bigFile, badIntegrity)
    .then(verified => {
      t.notOk(verified)
      t.end()
    })
    .catch(t.end)
})

test('success with small file', t => {
  ssriCheckFile(smallFile, smallFileIntegrity)
    .then(verified => {
      t.ok(verified)
      t.end()
    })
    .catch(t.end)
})

test('fail with small file', t => {
  ssriCheckFile(smallFile, badIntegrity)
    .then(verified => {
      t.notOk(verified)
      t.end()
    })
    .catch(t.end)
})

test('fail on ENOENT', t => {
  ssriCheckFile('this-does-not-exist', badIntegrity)
    .catch(err => {
      t.equal(err.code, 'ENOENT')
      t.end()
    })
})

test('fail on non-file', t => {
  ssriCheckFile(path.join(__dirname, '..', 'test'), badIntegrity)
    .catch(err => {
      t.ok(err.message.indexOf('Integrity can be checked only for files.') !== -1)
      t.end()
    })
})
