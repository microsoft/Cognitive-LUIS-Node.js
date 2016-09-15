LUIS
==============
LUIS is a service for language understanding that provides intent classification and entity extraction.
In order to use the SDK you first need to create and publish an app on www.luis.ai where you will get your appId and appKey and input their values in the sample application file "sample.js".

The SDK
--------------
The SDK can be used by creating 2 callback functions "onSuccess" and "onFailure" and passing them to the "predict" and "reply" functions to be called asynchronously in the cases of the request success or failure.

Sample Application
--------------
The sample application allows you to perform the Predict and Reply operations and to view the following parts of the parsed response:
- Query
- Top Intent
- Entities
- Dialog status, parameter name, and prompt 

License
=======

All Microsoft Cognitive Services SDKs and samples are licensed with the MIT License. For more details, see
[LICENSE](</LICENSE.md>).

Developer Code of Conduct
=======

Developers using Cognitive Services, including this client library & sample, are required to follow the “[Developer Code of Conduct for Microsoft Cognitive Services](http://go.microsoft.com/fwlink/?LinkId=698895)”.

