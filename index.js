const gcs = require('@google-cloud/storage')()
const { tap, pipe, pipeP, invoker } = require('ramda')
const { getConfigVal, getConfig, setConfig, getBucketName, parseFileBuffer } = require('./config.js')

const getFileBufferP = pipe(
  getBucketName,
  name => gcs.bucket(name),
  bucket => bucket.file('config.json'),
  invoker(0, 'download')
)

const fetchConfig = pipeP(
  getFileBufferP,
  parseFileBuffer
)

const initConfig = pipeP(
  fetchConfig,
  setConfig
)

module.exports = {
  initConfig,
  getConfigVal: getConfigVal,
  getConfig: getConfig
}
