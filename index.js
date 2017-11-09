const gcs = require('@google-cloud/storage')()
const { forEachObjIndexed, pipe, pipeP, invoker } = require('ramda')
const { getConfigVal, getConfig, setConfig, getBucketName, parseFileBuffer } = require('./config.js')

const getFileBufferP = pipe(
  getBucketName,
  name => gcs.bucket(name)
  bucket => bucket.file('config.json'),
  invoker(0, 'download')
)

const fetchConfig = pipeP(
  getFileBufferP,
  parseFileBuffer
)

const init = pipeP(
  fetchConfig,
  setEnvVars
)

module.exports = {
  initConfig,
  getConfigVal: getConfigVal,
  getConfig: getConfig
}
