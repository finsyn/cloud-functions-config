const gcs = require('@google-cloud/storage')()
const { tap, pipe, pipeP, invoker, ifElse } = require('ramda')
const { getConfigVal, getConfig, setConfig, getBucketName, parseFileBuffer,
        isConfigInitiated } = require('./config.js')

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

const initConfig = ifElse(
  isConfigInitiated,
  pipe(
    getConfig,
    config => Promise.resolve(config)
  ),
  pipeP(
    fetchConfig,
    setConfig
  )
)

module.exports = {
  initConfig,
  getConfigVal: getConfigVal,
  getConfig: getConfig
}
