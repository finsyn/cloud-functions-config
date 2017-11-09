const gcs = require('@google-cloud/storage')()
const { head, path, prop, toLower, pipe, pipeP, invoker,
        tap, concat, __ } = require('ramda')
const { getBucketName, parseFileBuffer } = require('./config.js')

// cached config
let config = null

const getGCSBucket = pipe(
  getBucketName,
  name => gcs.bucket(name)
)

const getFileBufferP = pipe(
  getGCSBucket,
  bucket => bucket.file('config.json'),
  invoker(0, 'download')
)

const configP = () => {
  if (config) { return Promise.resolve(config) }
  else {
    return pipeP(
      getFileBufferP,
      parseFileBuffer
    )()
  }
}

module.exports = configP
