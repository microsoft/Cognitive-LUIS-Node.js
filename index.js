'use strict'

const Assert = require('assert')
const Https = require('https')
const Util = require('util')

const Concat = require('concat-stream')

const LUISURL = 'api.projectoxford.ai'
const LUISPredictMask = '/luis/v2.0/apps/%s?subscription-key=%s&q=%s&verbose=%s'
const LUISReplyMask = '/luis/v2.0/apps/%s?subscription-key=%s&q=%s&contextid=%s&verbose=%s'

/**
 * Sends an API request.
 *
 * @param {object} options - Request options.
 * @param {function} done - Callback function.
 */
function sendRequest (options, done) {
  let req = Https.request(options, (response) => {
    response.pipe(Concat((data) => {
      let body
      data = data.toString()

      if (data && data.length > 0) {
        body = JSON.parse(data)

        if (response.statusCode !== 200) return done(new Error(body.message))

        return done(null, body)
      }

      done(new Error('Invalid or empty response from LUIS.'))
    }))
  })

  req.on('error', done.bind(null))
  req.end()
}

/**
 * This is the interface of the LUIS SDK
 * Constructs a LUISClient with the corresponding user's App ID and Subscription
 * Keys.
 *
 * @param {object} initData - Configuration object to initialize the client.
 * @param {string} initData.appId - Application ID for your LUIS app.
 * @param {String} initData.appKey - Application Key for your LUIS app.
 * @param {boolean} initData.verbose - Whether to receive verbose output.
 * @returns {{predict: function, reply: function}} - Interface methods.
 */
module.exports = (initData) => {
  Assert.ok(initData, 'Configuration object required to initialize LUIS Client')
  Assert.ok(initData.appId, 'You must specify an \'appId\'')
  Assert.ok(initData.appKey, 'You must specify an \'appKey\'')

  initData.verbose = Boolean(initData.verbose || true)

  return {
    /**
     * Initiates the prediction procedure.
     *
     * @param {string} text - The text to be analyzed and predicted.
     * @param {function} done - Callback function.
     */
    predict: (text, done) => {
      if (!text) return done(new Error('Text  cannot be empty'))

      let options = {
        hostname: LUISURL,
        path: Util.format(LUISPredictMask, initData.appId, initData.appKey, encodeURIComponent(text), initData.verbose),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }

      sendRequest(options, done)
    },
    /**
     * Initiates the prediction procedure
     *
     * @param {string} text - The text to be analyzed and predicted.
     * @param {string} context - Context of the request.
     * @param {string} forceSet - Optional fording set.
     * @param {function} done - Callback function.
     */
    reply: (text, context, forceSet, done) => {
      if (!text) return done(new Error('Text cannot be empty'))
      if (typeof forceSet === 'function') {
        done = forceSet
        forceSet = null
      }

      let options = {
        hostname: LUISURL,
        path: Util.format(LUISReplyMask, initData.appId, initData.appKey, encodeURIComponent(text), context, initData.verbose),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }

      if (forceSet) options.path += `&forceset=${forceSet}`

      sendRequest(options, done)
    }
  }
}
