const gcs = require('@google-cloud/storage')()
const fetch = require('node-fetch')
const { head, path, prop, toLower, pipe, pipeP, invoker, tap } = require('ramda')

const getGCSBucket = pipe(
  () => process.env,
  tap(console.log),
  prop('GCP_PROJECT'),
  toLower,
  name => gcs.bucket(name)
)

const getFileBufferP = pipe(
  getGCSBucket,
  bucket => bucket.file('private/config.json'),
  invoker(0, 'download')
)

const configP = pipeP(
  getFileBufferP,
  pipe(
    head,
    data => JSON.parse(data.toString())
  )
)

exports.config = configP
