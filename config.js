const { head, prop, toLower, pipe, forEachObjIndexed,
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

const setEnvVar = (val, key) => {
  process.env[key] = val
}

const setEnvVars = forEachObjIndexed(setEnvVar)

module.exports = {
  getBucketName,
  parseFileBuffer,
  setEnvVars
}

