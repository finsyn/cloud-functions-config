const { head, prop, toLower, pipe, forEachObjIndexed,
        concat, __, map, converge, identity,
        test, keys, filter, zipObj, replace } = require('ramda')

const envPrefix = 'cfc__'

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
  process.env[`${envPrefix}${key}`] = val
}

const setEnvVars = forEachObjIndexed(setEnvVar)
const isCFCKey = test(new RegExp(`^${envPrefix}[a-z]+`))

const getEnvVars = pipe(
  () => process.env,
  keys,
  filter(isCFCKey),
  converge(
    zipObj, [
      map(replace(envPrefix, '')),
      map(key => process.env[key])
    ]
  )
)

module.exports = {
  getBucketName,
  parseFileBuffer,
  setEnvVars,
  getEnvVars
}

