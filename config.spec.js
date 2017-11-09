const t = require('tap')
const { setEnvVars, getBucketName, parseFileBuffer } = require('./config.js')

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

t.test('method to set env vars should work', t => {
  const config = {
    test: '123',
    enabled: true 
  }
  setEnvVars(config)
  t.equals(process.env.test, '123')
  t.ok(process.env.enabled)
  t.end()
})

