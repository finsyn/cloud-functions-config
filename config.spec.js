const t = require('tap')
const { getEnvVars, setEnvVars, getBucketName, parseFileBuffer } = require('./config.js')

t.test('should get bucket name according to convention', t => {
  projectName = 'test-123'
  process.env.GCP_PROJECT = projectName 
  const name = getBucketName()
  t.equals(name, `${projectName}-config-private`)
  t.end()
})

t.test('should parse json buffer to js object', t => {
  const obj = { test: '123' }
  const data = [ new Buffer(JSON.stringify(obj)) ]
  const objParsed = parseFileBuffer(data)
  t.match(objParsed, obj)
  t.end()
})

t.test('method to get and set env vars should work', t => {
  const config = {
    test_num: '123',
    enabled: true 
  }
  setEnvVars(config)
  const { test_num, enabled } = getEnvVars()
  t.equals(test_num, '123')
  t.ok(enabled)
  t.end()
})

