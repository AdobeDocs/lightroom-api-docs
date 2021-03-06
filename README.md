<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Welcome to Lightroom API's!](#welcome-to-lightroom-apis)
- [Setup](#setup)
  - [Authentication](#authentication)
    - [Individual users](#individual-users)
    - [Service-to-service clients](#service-to-service-clients)
      - [Assets stored on Adobe's Creative Cloud](#assets-stored-on-adobes-creative-cloud)
      - [Assets stored externally to Adobe](#assets-stored-externally-to-adobe)
  - [API Keys](#api-keys)
  - [Retries](#retries)
  - [Rate Limiting](#rate-limiting)
- [General Workflow](#general-workflow)
  - [Input and Output file storage](#input-and-output-file-storage)
  - [Input and Output file formats](#input-and-output-file-formats)
- [Supported Features](#supported-features)
  - [AutoTone](#autotone)
    - [/autoTone](#autotone)
    - [Example: Initiate a job to auto tone an image](#example-initiate-a-job-to-auto-tone-an-image)
  - [AutoStraighten](#autostraighten)
    - [/autoStraighten](#autostraighten)
    - [Example: Initiate a job to auto straighten an image](#example-initiate-a-job-to-auto-straighten-an-image)
  - [Presets](#presets)
    - [/presets](#presets)
    - [Example : Initiate a job to apply presets to an image](#example--initiate-a-job-to-apply-presets-to-an-image)
  - [Edit](#edit)
    - [/edit](#edit)
    - [Example : Initiate a job to apply edits to an image](#example--initiate-a-job-to-apply-edits-to-an-image)
  - [XMP](#xmp)
    - [/xmp](#xmp)
    - [Example : Initiate a job to apply xmp to an image](#example--initiate-a-job-to-apply-xmp-to-an-image)
  - [Job Status](#job-status)
    - [/status](#status)
    - [Example: Poll for status and results](#example-poll-for-status-and-results)
- [Current Limitations](#current-limitations)
- [Release Notes](#release-notes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


# Welcome to Lightroom API's!

The Adobe Lightroom APIs allow you to make Lightroom like automated edits to image files.  This page is meant to help you onboard with the service and get you started with some basic usage examples. This service does not support the storage that Lightroom users have access to, instead, it allows users to use any other form of storage to work on their images. The list of supported storage systems are listed further below in this documentation.

# Setup

## Authentication

You must pass in an OAuth 2.0 access token with every request. The APIs do not provide any API methods for authentication or authorization. Access tokens are granted by Adobe's IMS service. The APIs need an access token with the scope="openid,creative_sdk", which you pass to the IMS Login Authorization API.

The access token must never be transmitted as a URI parameter. Doing so would expose it to being captured in-the-clear by intermediaries such as proxy server logs. The API does not allow you to send an access token anywhere except the Authorization header field.

There are two scenarios that require different authentication methods:

### Individual users

You will be emailed your Client ID and Client Secret required for the IMS endpoint after you've been accepted to the PreRelease program.  Once you've received your email...

- Do a quick test:

- Browse to [https://ps-prerelease-us-east-1.cloud.adobe.io/](https://ps-prerelease-us-east-1.cloud.adobe.io/)

- Add your Client ID and Client Secret sent in email

- Enter your Adobe credentials when prompted

- Use the access token to try the example calls further down this README

Additional instructions regarding the Adobe IMS endpoints can be found at [Generating Access Tokens](https://www.adobe.io/authentication/auth-methods.html#!adobeio/adobeio-documentation/master/auth/OAuth2.0Endpoints/web-oauth2.0-guide.md#generatingaccesstokens)

Additional instructions can be found at [Setting up OAuth authentication](https://www.adobe.io/authentication/auth-methods.html#!adobeio/adobeio-documentation/master/auth/OAuth2.0Endpoints/web-oauth2.0-guide.md)

Complete examples for OAuth endpoints can be found at [OAuth endpoint examples](https://www.adobe.io/authentication/auth-methods.html#!adobeio/adobeio-documentation/master/auth/OAuth2.0Endpoints/web-oauth2.0-guide.md#completeexamplesforoauthendpoints)

### Service-to-service clients

For service-to-service clients you'll need to set up an Adobe I/O Console Integration and create a JSON Web Token (JWT) to retrieve your access token for API's. It is assumed your organization already has an Adobe IMS Org ID and you have added the required users to it.

#### Assets stored on Adobe's Creative Cloud

The Adobe Lightroom APIs currently have a limitation that Service clients must store their assets externally to Adobe's Creative Cloud.

#### Assets stored externally to Adobe

This applies to assets stored outside of Adobe's Creative Cloud and accessed via preSigned URL's

- Browse to https://console.adobe.io/integrations

- Select New Integration

- Select `Access an API`

- Select `Lightroom`

- Select `Service Account integration`

- Select `Create new integration`

To retrieve your access token see additional instructions at [Setting up JWT Authentication](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/JWT.md)

## API Keys

Also known as the `client_id`. You must pass in your Adobe API key in the `x-api-key` header field.

## Retries

- You should only retry requests that have a 5xx response code. A 5xx error response indicates there was a problem processing the request on the server.
- You should implement an exponential back-off retry strategy with 3 retry attempts.
- You should not retry requests for any other response code.

## Rate Limiting

We have not put a throttle limit on requests to the API at this time.

# General Workflow

The typical workflow involves specifying an image and the operation to be applied to it. The endpoint is asynchronous so the response will contain the `/status` endpoint to poll for job status and results
## Input and Output file storage

Clients can use assets stored on one of the following storage types:
1. Adobe: by referencing the path to the files on Creative Cloud
2. External: (like AWS S3) by using a presigned GET/PUT URL
3. Azure: By generating a SAS (Shared Access Signature) for upload/download
4. Dropbox: Generate temporary upload/download links using https://dropbox.github.io/dropbox-api-v2-explorer/

## Input and Output file formats

Any input image format that is supported by Lightroom is also supported by the APIs. To look at the list of these formats in more detail, please refer to: [https://helpx.adobe.com/lightroom-classic/help/supported-file-formats.html](https://helpx.adobe.com/lightroom-classic/help/supported-file-formats.html)

At this point the output formats supported are JPG, DNG and PNG.
# Supported Features

This is a list of currently supported features

## AutoTone
Automatically tone an image to correct exposure/contrast/sharpness/etc
### /autoTone
The API is documented [here](https://adobedocs.github.io/lightroom-api-docs/#api-autoTone-auto_tone_post)

### Example: Initiate a job to auto tone an image

```shell

curl -X POST \

-H "authorization: Bearer $token" \

-H "Content-Type:application/json" \

-H "x-api-key:$x-api-key" \

-d '{
    "inputs": {
        "href": "<href>",
        "storage": "<storage>"
    },
    "outputs": [
        {
            "href": "<href>",
            "type": "<type>",
            "storage": "<storage>",
            "overwrite": <boolean>
        }
    ]
}'

https://image.adobe.io/lrService/autoTone
```

This initiates an asynchronous job and returns a request body containing the href to poll for job status.

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

To check the status of the job completion, use the `/status` API. An example usage of the API can be found [here](https://github.com/AdobeDocs/lightroom-api-docs#job-status).

## AutoStraighten
Applies the Auto Upright transformation on an image
### /autoStraighten
The API is documented [here](https://adobedocs.github.io/lightroom-api-docs/#api-autoStraighten-auto_straighten_post)

### Example: Initiate a job to auto straighten an image

```shell

curl -X POST \

-H "authorization: Bearer $token" \

-H "Content-Type:application/json" \

-H "x-api-key:$x-api-key" \

-d '{
    "inputs": {
        "href": "<href>",
        "storage": "<storage>"
    },
    "outputs": [
        {
            "href": "<href>",
            "type": "<type>",
            "storage": "<storage>",
            "overwrite": <boolean>
        }
    ]
}'

https://image.adobe.io/lrService/autoStraighten
```

This initiates an asynchronous job and returns a request body containing the href to poll for job status.

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

To check the status of the job completion, use the `/status` API. An example usage of the API can be found [here](https://github.com/AdobeDocs/lightroom-api-docs#job-status).

## Presets
Apply one or more XMP Lightroom presets to an image, by referencing preset file(s) stored on cloud.
The preset file can be created by editing an image in lightroom and exporting it as a `.xmp` file.
The details on how to create a preset can be found [here](https://helpx.adobe.com/lightroom-cc/how-to/photo-presets-lightroom-cc.html).
If the use case would be to be able to create an `.xmp` file from a set of slider values obtained directly from a user, there are 2 ways to achieve this workflow:
1. Start with the empty `.xmp` file from [here](https://github.com/AdobeDocs/lightroom-api-docs/tree/master/sample-app/crs.xml) and add the corresponding slider values
2. Or please look ahead in this documentation page at the [/edit API](https://github.com/AdobeDocs/lightroom-api-docs#edit)
### /presets

The API is documented [here](https://adobedocs.github.io/lightroom-api-docs/#api-presets-presets_post)
### Example : Initiate a job to apply presets to an image

```shell

curl -X POST \

-H "authorization: Bearer $token" \

-H "Content-Type:application/json" \

-H "x-api-key:$x-api-key" \

-d '{
    "inputs": {
        "source": {
            "href": "<href>",
            "storage": "<storage>"
        },
        "presets": [
            {
                "href": "<href1>",
                "storage": "<storage>"
            },
            {
                "href": "<href2>",
                "storage": "<storage>"
            }
        ]
    },
    "outputs": [
        {
            "href": "<href>",
            "type": "<type>",
            "storage": "<storage>",
            "overwrite": <boolean>
        }
    ]
}'

https://image.adobe.io/lrService/presets
```

This initiates an asynchronous job and returns a request body containing the href to poll for job status.

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

To check the status of the job completion, use the `/status` API. An example usage of the API can be found [here](https://github.com/AdobeDocs/lightroom-api-docs#job-status).

## Edit
Apply one or more Lightroom edits to an image.
### /edit
The API is documented [here](https://adobedocs.github.io/lightroom-api-docs/#api-edit-edit_post)
The options section shown in the sample curl command below also indicates the set of Lightroom edits and the corresponding values that can be applied to the input image.

### Example : Initiate a job to apply edits to an image

```shell

curl -X POST \

-H "authorization: Bearer $token" \

-H "Content-Type:application/json" \

-H "x-api-key:$x-api-key" \

-d '{
    "inputs": {
        "source": {
            "href": "<href>",
            "storage": "<storage>"
        }
    },
    "options": {
        "Exposure": -5.00 to 5.00,
        "Contrast": -100 to 100,
        "Sharpness": 0 10 150,
        "WhiteBalance": <"As Shot", "Auto", "Cloudy", "Custom", "Daylight", "Flash", "Fluorescent", "Shade", "Tungsten">
        "Saturation": -100 to 100,
        "ColorNoiseReduction": 0 to 100,
        "NoiseReduction": 0 to 100,
        "VignetteAmount": -100 to 100,
        "Vibrance": -100 to 100,
        "Highlights": -100 to 100,
        "Shadows": -100 to 100,
        "Whites": -100 to 100,
        "Blacks": -100 to 100,
        "Clarity": -100 to 100,
        "Dehaze": -100 to +100,
        "SharpenRadius": 0.5 to 3.0,
        "SharpenDetail": 0 to 100,
        "SharpenEdgeMasking": 0 to 100,
        "Texture": -100 t0 100
    },
    "outputs": [
        {
            "href": "<href>",
            "type": "<type>",
            "storage": "<storage>",
            "overwrite": <boolean>
        }
    ]
}'

https://image.adobe.io/lrService/edit
```

This initiates an asynchronous job and returns a request body containing the href to poll for job status.

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

To check the status of the job completion, use the `/status` API. An example usage of the API can be found [here](https://github.com/AdobeDocs/lightroom-api-docs#job-status).

## XMP
Apply a Lightroom preset to an image, by passing in the preset XMP contents inline through the API.
### /xmp
The API is documented [here](https://adobedocs.github.io/lightroom-api-docs/#api-xmp-xmp_post)
### Example : Initiate a job to apply xmp to an image

```shell

curl -X POST \

-H "authorization: Bearer $token" \

-H "Content-Type:application/json" \

-H "x-api-key:$x-api-key" \

-d '{
    "inputs": {
        "href": "<href>",
        "storage": "<storage>"
    },
    "options": {
        "xmp": "<xmp>"
    },
    "outputs": [
        {
            "href": "<href>",
            "storage": "<storage>",
            "type": "<type>"
        }
    ]
}'

https://image.adobe.io/lrService/xmp
```

This initiates an asynchronous job and returns a request body containing the href to poll for job status.

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

To check the status of the job completion, use the `/status` API. An example usage of the API can be found [here](https://github.com/AdobeDocs/lightroom-api-docs#job-status).

## Job Status
### /status
Check the status of job completion using the JobID returned from a call to one of the Lightroom APIs listed above.
### Example: Poll for status and results

Use the JobID to poll on the href that is returned in the response from one of the Lightroom APIs.
1. Upon successful job completion, the output file will be available at the specified output href.
2. If the job failed due to an error, the `errorDetails` field in the response will contain the details of the failure.

```shell
curl -X GET \
  https://image.adobe.io/lrService/status/<jobId> \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>'
```

And this will return a request body containing the job status for each requested output and eventually either errors or the hrefs to the requested outputs

```json
{
  "jobId":"<jobId>",
  "created":"2018-01-04T12:57:15.12345:Z",
  "modified":"2018-01-04T12:58:36.12345:Z",
  "outputs":[
  {
      "input":"<input_file_href>",
      "status":"succeeded",
      "_links":{
        "self":
        {
          "href":"<output_file_href>",
          "storage":"adobe"
        }
      }
    }
  ],
  "_links":{
    "self":{
      "href":"https://image.adobe.io/lrService/status/<jobId>"
    }
  }
}
```

# Current Limitations
&nbsp;
# Release Notes
