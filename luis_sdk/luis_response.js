/**
 * This module validates the JSON response and attaches extra helper properties to it
 * @param JSONResponse a string that represents the JSON response of LUIS
 */
module.exports = function(JSONResponse) {
  if (typeof JSONResponse === 'undefined' || JSONResponse === null || JSONResponse.length === 0) {
    throw Error('Invalid Application Id');
  }
  var LUISresponse = JSON.parse(JSONResponse);
  if (LUISresponse.hasOwnProperty('statusCode')) {
    throw Error('Invalid Subscription Key');
  }
  if (LUISresponse.hasOwnProperty('topScoringIntent') && LUISresponse.topScoringIntent !== null
    && typeof LUISresponse.topScoringIntent !== 'undefined') {
    LUISresponse.intents = [LUISresponse.topScoringIntent];
  } else if(LUISresponse.hasOwnProperty('intents') && LUISresponse.intents !== null
    && typeof LUISresponse.intents !== 'undefined' && LUISresponse.intents.length > 0) {
    LUISresponse.topScoringIntent = LUISresponse.intents[0];
  }
  if(LUISresponse.hasOwnProperty('dialog') && typeof LUISresponse.dialog !== 'undefined'){
    LUISresponse.dialog.isFinished = function () {
      return this.status === 'Finished';
    };
  }
  return LUISresponse
};