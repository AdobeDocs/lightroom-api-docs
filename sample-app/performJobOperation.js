const assert = require("assert");
const request = require("request-promise");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/* turn off eslint warnings about console.log */
/* eslint no-console: 0 */

/* Check job status every x milliseconds for up to y times */
const statusRetryMillis = 200;
const statusRetries = 500;

/* Check for a valid response body from POST */
function getStatusUri(response) {
  return response._links && response._links.self && response._links.self.href
}

/* If any output shows status of not done, then job is still running */
function outputDone(output) {
  if (output[0].status !== 'succeeded' &&
    output[0].status !== 'failed') {
    return false
  } else {
    return true
  }
}

function logOutputStatus(outputs) {
  let statuses = []
  for (let output in outputs) {
    statuses.push(outputs[output].status)
  }
  console.log(` status: ${statuses.join(', ')}`)
}

/* Function to check for result - called from async.retry below */
function checkJobStatus(href, apiKey, token) {
  /* Prepare the options for the HTTPS request call to get the status of our job */
  let options = {
    uri: href,
    headers: {
      Authorization: `Bearer ${token}`,
      'x-api-key': apiKey
    },
    json: true
  }
  /* Send a GET request for the status */
  return request(options)
}

/* Helper function to begin the job */
function beginJobOperation(options) {
  /* Prepare the options for the HTTPS POST call to the API */
  let req = {
    method: 'post',
    uri: options.uri,
    headers: {
      Authorization: `Bearer ${options.token}`,
      'x-api-key': options.apiKey
    },
    body: options.body,
    json: true
  }

  /* Send POST request to the API */
  return request(req)
}

async function performJobOperation(options) {
  assert(options, 'options must be provided')
  assert(options.uri, 'options.uri not found')
  assert(options.body, 'options.body not found')
  assert(options.apiKey, 'options.apiKey not found')
  assert(options.token, 'options.token not found')

  writeStatus(`CALL ${options.uri}`);
  const result = await beginJobOperation(options);
  const statusUri = getStatusUri(result);
  if (!statusUri) {
    writeStatus(`DONE ERROR: ${result}`);
    throw new Error('No statusUri in result');
  }
  let retries = statusRetries;
  let done = false;
  let showJobId = true;
  while (retries-- > 0 && !done) {
    await sleep(statusRetryMillis);
    const status = await checkJobStatus(statusUri, options.apiKey, options.token);
    if (showJobId) {
      console.log(`jobId: ${status.jobId}`);
      showJobId = false;
    }
    logOutputStatus(status.outputs);
    done = outputDone(status.outputs);
    if (done) {
      return status;
    }
  }
  if (!done) {
    throw new Error('retries all used up without completion of task');
  }
}
exports.performJobOperation = performJobOperation;

function writeStatus(message) {
  console.log(message)
  console.log('********')
}
exports.writeStatus = writeStatus;
