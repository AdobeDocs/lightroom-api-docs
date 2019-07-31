const assert = require('assert')
const config = require('./config.json')
const path = require('path');

const { performJobOperation, writeStatus } = require("./performJobOperation");

/* turn off eslint warnings about console.log */
/* eslint no-console: 0 */

/* Obtain inputs from env */
const token = process.env.TOKEN;
assert(token, 'TOKEN not found');
const apiKey = process.env.API_KEY;
assert(apiKey, 'API_KEY not found');
const inputFile = process.argv[2] // argument to program
assert(inputFile, 'input file argument not found');
const outputFile = process.argv[3] // argument to program
assert(outputFile, 'output file argument not found');
const presetFile = process.argv[4] // argument to program
assert(presetFile, 'preset file argument not found');

/* Declare service endpoints */
const presetsUrl = `${config.services.lrService}/presets`

async function main () {
  try {
    writeStatus('STARTING')
    writeStatus(inputFile)
    writeStatus(outputFile)
    const body = {
      inputs: {
        source: {
          href: inputFile,
          storage: 'adobe'
        },
        presets: [
          {
            href: presetFile,
            storage: "adobe"
          }
        ]
      },
      outputs: [
        {
          href: outputFile,
          storage: 'adobe'
        }
      ]
    }
    console.log(JSON.stringify(body, null, 2));
    const result = await performJobOperation({
      uri: presetsUrl,
      body,
      apiKey,
      token
    })
    console.log(JSON.stringify(result, null, 2))
    if (result.outputs[0].status !== 'succeeded') {
      console.log(JSON.stringify(result))
      throw new Error(`operation failed: ${presetsUrl} for ${inputFile}`);
    }

    writeStatus('DONE SUCCESS');
  }
  catch (e) {
    console.log(e)
    writeStatus('DONE ERROR')
    process.exit(4)
  }
}

main(input, output, preset).catch(e => {
  console.log(e)
  writeStatus('DONE ERROR')
  process.exit(5)
});
