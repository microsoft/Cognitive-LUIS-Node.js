'use strict'

const client = require('../')({
  appId: 'appId',
  appKey: 'appKey',
  verbose: true
})

client.predict('Enter text to predict', (err, response) => {
  if (err) throw err

  console.log('Query: ' + response.query)
  console.log('Top Intent: ' + response.topScoringIntent.intent)
  console.log('Entities:')

  response.entities.forEach((e, i) => {
    console.log(`${i + 1} - ${e.entity}`)
  })

  if (response.dialog) {
    console.log('Dialog Status: ' + response.dialog.status)
    if (!response.dialog.isFinished()) {
      console.log('Dialog Parameter Name: ' + response.dialog.parameterName)
      console.log('Dialog Prompt: ' + response.dialog.prompt)
    }
  }
})
