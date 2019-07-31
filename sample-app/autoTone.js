const assert = require('assert')
const config = require('./config.json')
const path = require('path');

const { performJobOperation, writeStatus } = require("./performJobOperation");

/* turn off eslint warnings about console.log */
/* eslint no-console: 0 */

/* Obtain inputs from env */
const token = process.env.TOKEN
assert(token, 'TOKEN not found')
const apiKey = process.env.API_KEY
assert(apiKey, 'API_KEY not found')
const inputFile = process.argv[2] // argument to program
assert(inputFile, 'input file argument not found')
const outputFile = process.argv[3] // argument to program
assert(outputFile, 'output file argument not found')

/* Declare service endpoints */
const autoToneUrl = `${config.services.lrService}/autoTone`

async function main () {
  try {
    writeStatus('STARTING')
    writeStatus(inputFile)
    writeStatus(outputFile)
    const body = {
      inputs: {
        href: inputFile,
        storage: 'external'
      },
      outputs: [
        {
          href: outputFile,
          storage: 'external'
        }
      ]
    }
    console.log(JSON.stringify(body, null, 2));
    const result = await performJobOperation({
      uri: autoToneUrl,
      body,
      apiKey,
      token
    })
    console.log(JSON.stringify(result, null, 2))
    if (result.outputs[0].status !== 'succeeded') {
      console.log(JSON.stringify(result))
      throw new Error(`operation failed: ${autoToneUrl} for ${inputFile}`);
    }

    writeStatus('DONE SUCCESS')
  }
  catch (e) {
    console.log(e)
    writeStatus('DONE ERROR')
    process.exit(4)
  }
}

main().catch(e => {
  console.log(e)
  writeStatus('DONE ERROR')
  process.exit(5)
})
