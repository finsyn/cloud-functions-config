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

const setConfig = forEachObjIndexed(setEnvVar)
const isCFCKey = test(new RegExp(`^${envPrefix}[a-z]+`))
const addPrefix = concat(envPrefix)
const rmPrefix = replace(envPrefix, '')
const getEnv = () => process.env
const getEnvVar = key => process.env[key]

const getConfig = pipe(
  getEnv,
  keys,
  filter(isCFCKey),
  converge(
    zipObj, [
      map(rmPrefix),
      map(getEnvVar)
    ]
  )
)

const getConfigVal = converge(
  prop, [
    addPrefix,
    getEnv
  ]
)

module.exports = {
  getBucketName,
  parseFileBuffer,
  setConfig,
  getConfig,
  getConfigVal
}

