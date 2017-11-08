const gcs = require('@google-cloud/storage')()
const { head, path, prop, toLower, pipe, pipeP, invoker,
        tap, concat, __ } = require('ramda')

const getGCSBucket = pipe(
  () => process.env,
  tap(console.log),
  prop('GCP_PROJECT'),
  toLower,
  concat(__, '-config-private'),
  name => gcs.bucket(name)
)

const getFileBufferP = pipe(
  getGCSBucket,
  bucket => bucket.file('config.json'),
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
