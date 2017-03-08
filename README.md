LUIS
==============

LUIS is a service for language understanding that provides intent classification
and entity extraction. In order to use the SDK you first need to create and
publish an app on www.luis.ai where you will get your `appId` and `appKey` and
input their values in the sample application file "sample.js".


## Usage

```js
const client = require('luis-sdk')({
  appId: 'your app ID',
  appKey: 'your app key',
  verbose: true
})

client.predict('Enter text to predict', (err, response) => {
  if (err) throw err

  console.dir(response)

  response.entities.forEach((e, i) => {
    console.log(`${i + 1} - ${e.entity}`)
  })
})

```

## Sample Application

The sample application allows you to perform the Predict and Reply operations and
to view the following parts of the parsed response:

- Query
- Top Intent
- Entities
- Dialog status, parameter name, and prompt

License
=======

All Microsoft Cognitive Services SDKs and samples are licensed with the MIT
License. For more details, see [LICENSE](</LICENSE.md>).

Developer Code of Conduct
=======

Developers using Cognitive Services, including this client library & sample, are
required to follow the [Developer Code of Conduct for Microsoft Cognitive
Services](http://go.microsoft.com/fwlink/?LinkId=698895).
