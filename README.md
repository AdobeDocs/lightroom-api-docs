


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Prerelease Program](#prerelease-program)
- [Welcome to Lightroom-ACR API's!](#welcome-to-lightroom-acr-apis)
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
- [Supported Features](#supported-features)
  - [AutoTone](#autotone)
- [How to use the APIs](#how-to-use-the-apis)
  - [/autoTone](#autotone)
    - [Example : Initiate a job to auto tone an image](#example--initiate-a-job-to-auto-tone-an-image)
- [Current Limitations](#current-limitations)
- [Release Notes](#release-notes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Prerelease Program

The Lightroom-ACR APIs are made available through the Adobe Prelease program. These APIs are included as part of the Photoshop as a Service pre-release program.  For the ability to make these API calls, we invite you to join the program.

Please be aware of some aspects of the program. For example, you will need to agree to the Adobe Prelease agreement and NDA. The APIs are provided for evaluation purposes. The current APIs are subject to change. You can find more information on the Adobe Prerelease page.

If you are not currently a member, please sign up at [https://photoshop.adobelanding.com/prerelease-stack/](https://photoshop.adobelanding.com/prerelease-stack/)



# Welcome to Lightroom-ACR API's!

The Adobe Lightroom-ACR APIs allow you to make Lightroom like automated edits to JPG image files.  This page is meant to help you onboard with the service and get you started with some basic usage examples.

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

The Adobe Lightroom-ACR APIs currently have a limitation that Service clients must store their assets externally to Adobe's Creative Cloud.

#### Assets stored externally to Adobe
This applies to assets stored outside of Adobe's Creative Cloud and accessed via preSigned URL's

- Browse to https://console.adobe.io/integrations
- Select New Integration
- Select `Access an API`
- Select `Lightroom`
- Select `Service Account integration`
- Select `Create new integration`

To retrieve your access token see additional instructions at [Setting up JWT Authentication](https://www.adobe.io/authentication/auth-methods.html#!adobeio/adobeio-documentation/master/auth/JWTAuthenticationQuickStart.md)

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


# Supported Features

This is a list of currently supported features

## AutoTone

- Auto Tone an image to correct exposure/contrast/sharpness/etc


# How to use the APIs

## /autoTone

### Example : Initiate a job to auto tone an image


```shell
curl -X POST \
	-H "authorization: Bearer $token" \
	-H "Content-Type:application/json" \
	-H "x-api-key:$x-api-key" \
	-d '{
	"inputs":{
		"href":"<href>",
		"storage":"<storage>"},
	"outputs":[{
		"href":"<href>",
		"storage":"<storage>",
		"type":"<type>"}]}'
 https://image-stage.adobe.io/lrService/autoTone


This initiates an asynchronous job and returns a request body containing the href to poll for job status.
```json
{
    "_links": {
        "self": {
            "href": "https://image-stage.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

# Current Limitations

# Release Notes
