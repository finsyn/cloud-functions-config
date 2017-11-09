const { head, prop, toLower, pipe, 
        concat, __ } = require('ramda')

const getBucketName = pipe(
  () => process.env,
  prop('GCP_PROJECT'),
  toLower,
  concat(__, '-config-private')
)

const parseFileBuffer = pipe(
  head,
  data => JSON.parse(data.toString())
)

module.exports = {
  getBucketName,
  parseFileBuffer
}

