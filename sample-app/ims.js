const assert = require("assert");
const request = require("request-promise");

/* Function to check for result - called from async.retry below */
function checkJobStatus(href, clientId, token) {
  /* Prepare the options for the HTTPS request call to get the status of our job */
  let imsAuth = href + '?response_type=code&client_id' + clientId + '/scope=AdobeID%2Copenid%2Ccreative_sdk'
  let options = {
    uri: href,
    headers: {},
    json: true
  }
  /* Send a GET request for the status */
  return request(options)
}

const imsUri = const autoToneUrl = `${config.services.adobeIms}/authorize/v1`
const status = await checkJobStatus(imsUri, options.apiKey, options.token);
