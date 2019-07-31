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
