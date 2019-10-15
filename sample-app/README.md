<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Setup App](#setup-app)
  - [Install Nodejs >= 10.0.0](#install-nodejs--1000)
- [RUN](#run)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Setup App

## Install Nodejs >= 10.0.0
  1. Check node version
  ```node -v ```
  2. Install new version
  https://nodejs.org/en/download/
  3. Get access token
  - Browse to https://ps-prerelease-us-east-1.cloud.adobe.io/
  - Add your Client ID and Client Secret
  - Enter your Adobe credentials when prompted


 Install packages
 ```
 npm install
 ```

# RUN
```
API_KEY=<client_id> TOKEN=<access_token> npm start '<presigned_get_url_for_input_file>' '<presigned_put_url_for_output_file>'
