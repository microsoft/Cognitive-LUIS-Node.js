const Test = require('tape')
const Nock = require('nock')

const Client = require('../')

Test('client initialization', (t) => {
  t.plan(3)

  t.throws(() => {
    Client()
  })

  t.throws(() => {
    Client({ appId: 'test' })
  })

  t.throws(() => {
    Client({ appKey: 'test' })
  })
})

Test('predict request handles bad request', (t) => {
  let client = Client({ appId: 'fail', appKey: 'fail' })

  t.plan(1)

  Nock('https://api.projectoxford.ai')
    .get('/luis/v2.0/apps/fail?subscription-key=fail&q=fail&verbose=true')
    .reply(400, { message: 'Bad request' })

  client.predict('fail', (err) => {
    t.equal(err.message, 'Bad request')
  })
})

Test('predict request handles good request', (t) => {
  let client = Client({ appId: 'test', appKey: 'test' })

  t.plan(2)

  Nock('https://api.projectoxford.ai')
    .get('/luis/v2.0/apps/test?subscription-key=test&q=test&verbose=true')
    .reply(200, { dialog: {} })

  client.predict('test', (err, res) => {
    t.notOk(err)
    t.ok(res)
  })
})

Test('reply has optional forceset', (t) => {
  let client = Client({ appId: 'test', appKey: 'test' })

  t.plan(2)

  Nock('https://api.projectoxford.ai')
    .get('/luis/v2.0/apps/test?subscription-key=test&q=test&contextid=context&verbose=true')
    .reply(200, { dialog: {} })

  client.reply('test', 'context', (err, res) => {
    t.notOk(err)
    t.ok(res)
  })
})

Test('reply appends forceset', (t) => {
  let client = Client({ appId: 'test', appKey: 'test' })

  t.plan(2)

  Nock('https://api.projectoxford.ai')
    .get('/luis/v2.0/apps/test?subscription-key=test&q=test&contextid=context&verbose=true&forceset=force')
    .reply(200, { dialog: {} })

  client.reply('test', 'context', 'force', (err, res) => {
    t.notOk(err)
    t.ok(res)
  })
})
