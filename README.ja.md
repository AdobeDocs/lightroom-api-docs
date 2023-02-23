<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Lightroom API へようこそ！](#lightroom-api-%E3%81%B8%E3%82%88%E3%81%86%E3%81%93%E3%81%9D)
- [準備](#%E6%BA%96%E5%82%99)
  - [認証](#%E8%AA%8D%E8%A8%BC)
    - [個人ユーザー](#%E5%80%8B%E4%BA%BA%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC)
    - [サービスとサービスのあいだで通信するクライアント](#%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%A8%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%AE%E3%81%82%E3%81%84%E3%81%A0%E3%81%A7%E9%80%9A%E4%BF%A1%E3%81%99%E3%82%8B%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88)
      - [Adobe Creative Cloud に保存されているアセット](#adobe-creative-cloud-%E3%81%AB%E4%BF%9D%E5%AD%98%E3%81%95%E3%82%8C%E3%81%A6%E3%81%84%E3%82%8B%E3%82%A2%E3%82%BB%E3%83%83%E3%83%88)
      - [Adobe の外部に保存されているアセット](#adobe-%E3%81%AE%E5%A4%96%E9%83%A8%E3%81%AB%E4%BF%9D%E5%AD%98%E3%81%95%E3%82%8C%E3%81%A6%E3%81%84%E3%82%8B%E3%82%A2%E3%82%BB%E3%83%83%E3%83%88)
  - [APIキー](#api%E3%82%AD%E3%83%BC)
  - [リトライ](#%E3%83%AA%E3%83%88%E3%83%A9%E3%82%A4)
  - [利用量の制限](#%E5%88%A9%E7%94%A8%E9%87%8F%E3%81%AE%E5%88%B6%E9%99%90)
- [一般的な利用手順](#%E4%B8%80%E8%88%AC%E7%9A%84%E3%81%AA%E5%88%A9%E7%94%A8%E6%89%8B%E9%A0%86)
    - [入力および出力ファイルの保存](#%E5%85%A5%E5%8A%9B%E3%81%8A%E3%82%88%E3%81%B3%E5%87%BA%E5%8A%9B%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E4%BF%9D%E5%AD%98)
  - [入力および出力ファイルの形式](#%E5%85%A5%E5%8A%9B%E3%81%8A%E3%82%88%E3%81%B3%E5%87%BA%E5%8A%9B%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E5%BD%A2%E5%BC%8F)
- [サポートされる機能](#%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%81%95%E3%82%8C%E3%82%8B%E6%A9%9F%E8%83%BD)
  - [自動補正](#%E8%87%AA%E5%8B%95%E8%A3%9C%E6%AD%A3)
    - [/autoTone](#autotone)
    - [例：画像を自動補正する](#%E4%BE%8B%E7%94%BB%E5%83%8F%E3%82%92%E8%87%AA%E5%8B%95%E8%A3%9C%E6%AD%A3%E3%81%99%E3%82%8B)
  - [自動歪み補正](#%E8%87%AA%E5%8B%95%E6%AD%AA%E3%81%BF%E8%A3%9C%E6%AD%A3)
    - [/autoStraighten](#autostraighten)
    - [例：画像を自動歪み補正する](#%E4%BE%8B%E7%94%BB%E5%83%8F%E3%82%92%E8%87%AA%E5%8B%95%E6%AD%AA%E3%81%BF%E8%A3%9C%E6%AD%A3%E3%81%99%E3%82%8B)
  - [プリセット](#%E3%83%97%E3%83%AA%E3%82%BB%E3%83%83%E3%83%88)
    - [/presets](#presets)
    - [例：画像にプリセットを適用する](#%E4%BE%8B%E7%94%BB%E5%83%8F%E3%81%AB%E3%83%97%E3%83%AA%E3%82%BB%E3%83%83%E3%83%88%E3%82%92%E9%81%A9%E7%94%A8%E3%81%99%E3%82%8B)
  - [編集](#%E7%B7%A8%E9%9B%86)
    - [/edit](#edit)
    - [例：画像に編集を適用する](#%E4%BE%8B%E7%94%BB%E5%83%8F%E3%81%AB%E7%B7%A8%E9%9B%86%E3%82%92%E9%81%A9%E7%94%A8%E3%81%99%E3%82%8B)
  - [XMP](#xmp)
    - [/xmp](#xmp)
    - [例：画像にxmpを適用する](#%E4%BE%8B%E7%94%BB%E5%83%8F%E3%81%ABxmp%E3%82%92%E9%81%A9%E7%94%A8%E3%81%99%E3%82%8B)
  - [ジョブのステータス](#%E3%82%B8%E3%83%A7%E3%83%96%E3%81%AE%E3%82%B9%E3%83%86%E3%83%BC%E3%82%BF%E3%82%B9)
    - [/status](#status)
    - [例：ステータスと結果のポーリング](#%E4%BE%8B%E3%82%B9%E3%83%86%E3%83%BC%E3%82%BF%E3%82%B9%E3%81%A8%E7%B5%90%E6%9E%9C%E3%81%AE%E3%83%9D%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0)
- [現在の制限](#%E7%8F%BE%E5%9C%A8%E3%81%AE%E5%88%B6%E9%99%90)
- [リリースノート](#%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E3%83%8E%E3%83%BC%E3%83%88)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


[README(English)](https://github.com/AdobeDocs/lightroom-api-docs)

[README(Japanese)](https://github.com/AdobeDocs/lightroom-api-docs/README.ja.md)


<!--
# Welcome to Lightroom API's!

The Adobe Lightroom APIs allow you to make Lightroom like automated edits to image files.  This page is meant to help you onboard with the service and get you started with some basic usage examples. This service does not support the storage that Lightroom users have access to, instead, it allows users to use any other form of storage to work on their images. The list of supported storage systems are listed further below in this documentation.
-->

# Lightroom API へようこそ！

Adobe Lightroom API を使用すると、画像ファイルに Lightroom のような自動編集をすることができます。このページは、サービスの導入を支援し、基本的な使用例をいくつかはじめてもらうことを目的としています。このサービスは、Lightroom のユーザーがアクセスできるストレージには対応していませんが、かわりに、他の形式のストレージを使って画像を編集できます。対応しているストレージシステムのリストは、このドキュメントの途中にあります。

<!--
# Setup

## Authentication

You must pass in an OAuth 2.0 access token with every request. The APIs do not provide any API methods for authentication or authorization. Access tokens are granted by Adobe's IMS service. The APIs need an access token with the scope="openid,creative_sdk", which you pass to the IMS Login Authorization API.

The access token must never be transmitted as a URI parameter. Doing so would expose it to being captured in-the-clear by intermediaries such as proxy server logs. The API does not allow you to send an access token anywhere except the Authorization header field.

There are two scenarios that require different authentication methods:
-->

# 準備

## 認証

すべてのリクエストで、OAuth 2.0 アクセストークンを渡す必要があります。どの API も、認証または許可のための API メソッドはありません。アクセストークンは Adobe の IMS サービスによって付与されます。API には scope="openid,creative_sdk" のアクセストークンが必要で、これを IMS ログイン認証 API に渡します。

アクセストークンは、URIパラメーターとして送信しないでください。これをすると、プロキシサーバーのログなどの仲介者により、暗号化されていないテキストとしてキャプチャされる可能性があります。API では、Authorization ヘッダーフィールド以外の場所にアクセストークンを送信することはできません。

認証方法には、異なる2つの方法があります。

<!--
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
-->

### 個人ユーザー

プレリリースプログラムに承認されると、IMS エンドポイントに必要なクライアント ID とクライアントシークレットがメールで送信されてきます。メールを受信したら、次のようにしてください。

- かんたんなテストをしてください：

- [https://ps-prerelease-us-east-1.cloud.adobe.io/](https://ps-prerelease-us-east-1.cloud.adobe.io/) にアクセスします。

- メールに記載されたクライアント ID とクライアントシークレットを入力します。

- ログイン画面が表示されたら Adobe のユーザーアカウントを入力します。

- 表示されたアクセストークンを使って、この README のなかにあるサンプルの API 呼び出しを試します。

Adobe IMS エンドポイントについての詳しい説明は [アクセストークンの生成](https://www.adobe.io/authentication/auth-methods.html#!adobeio/adobeio-documentation/master/auth/OAuth2.0Endpoints/web-oauth2.0-guide.md#generatingaccesstokens) にあります。

詳しい手順については [OAuth認証の設定](https://www.adobe.io/authentication/auth-methods.html#!adobeio/adobeio-documentation/master/auth/OAuth2.0Endpoints/web-oauth2.0-guide.md) にあります。

OAuth エンドポイントの具体的なサンプルは [OAuthエンドポイントのサンプル](https://www.adobe.io/authentication/auth-methods.html#!adobeio/adobeio-documentation/master/auth/OAuth2.0Endpoints/web-oauth2.0-guide.md#completeexamplesforoauthendpoints) にあります。

<!--
### Service-to-service clients

For service-to-service clients you'll need to set up an Adobe I/O Console Integration and create a JSON Web Token (JWT) to retrieve your access token for API's. It is assumed your organization already has an Adobe IMS Org ID and you have added the required users to it.

#### Assets stored on Adobe's Creative Cloud

The Adobe Lightroom APIs currently have a limitation that Service clients must store their assets externally to Adobe's Creative Cloud.
-->

### サービスとサービスのあいだで通信するクライアント

サービスとサービスのあいだで通信するクライアントの場合、Adobe I/O コンソールインテグレーションを設定し、JSON Web Token（JWT）を作成して、API のアクセストークンを取得する必要があります。あなたの組織が、すでに Adobe IMS Org ID をもっており、必要なユーザーを追加していることが前提になります。

#### Adobe Creative Cloud に保存されているアセット

Adobe Lightroom API の現在の制限として、サービスクライアントが、アセットを Adobe Creative Cloud の外に保存する必要があります。

<!--
#### Assets stored externally to Adobe

This applies to assets stored outside of Adobe's Creative Cloud and accessed via preSigned URL's

- Browse to https://console.adobe.io/integrations

- Select New Integration

- Select `Access an API`

- Select `Lightroom`

- Select `Service Account integration`

- Select `Create new integration`

To retrieve your access token see additional instructions at [Setting up JWT Authentication](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/JWT.md)
-->

#### Adobe の外部に保存されているアセット

以下は、Adobe Creative Cloud の外に保存されており、事前に署名されたURLによりアクセスされるアセットに適用されます。

- https://console.adobe.io/integrations にアクセスします。

- New Integration を選択します。

- `Access an API` を選択します。

- `Lightroom` を選択します。

- `Service Account integration` を選択します。

- `Create new integration` を選択します。

アクセストークンを取得するための詳しい手順は [JWT認証の設定](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/JWT.md)
 を参照してください。

<!--
## API Keys

Also known as the `client_id`. You must pass in your Adobe API key in the `x-api-key` header field.

## Retries

- You should only retry requests that have a 5xx response code. A 5xx error response indicates there was a problem processing the request on the server.
- You should implement an exponential back-off retry strategy with 3 retry attempts.
- You should not retry requests for any other response code.

## Rate Limiting

We have not put a throttle limit on requests to the API at this time.
-->

## APIキー

これは `client_id` とも呼ばれます。`x-api-key` ヘッダーフィールドで Adobe API キーを渡す必要があります。

## リトライ

- 5xx のレスポンスコードを持つリクエストのみ、リトライする必要があります。 5xx のエラーレスポンスは、サーバーにおけるリクエストの処理に問題があったことを示します。
- 3回のリトライをするエクスポネンシャルバックオフの仕組みを実装する必要があります。
- 他のレスポンスコードの要求をリトライしないでください。

## 利用量の制限

現時点では、API へのリクエストに上限は設けていません。

<!--
# General Workflow

The typical workflow involves specifying an image and the operation to be applied to it. The endpoint is asynchronous so the response will contain the `/status` endpoint to poll for job status and results
## Input and Output file storage

Clients can use assets stored on one of the following storage types:
1. Adobe: by referencing the path to the files on Creative Cloud
2. External: (like AWS S3) by using a presigned GET/PUT URL
3. Azure: By generating a SAS (Shared Access Signature) for upload/download
4. Dropbox: Generate temporary upload/download links using https://dropbox.github.io/dropbox-api-v2-explorer/
-->

# 一般的な利用手順

典型的な利用手順むは、画像と、それに適用する操作を指定します。エンドポイントは非同期であるため、レスポンスは、ジョブのステータスと結果をポーリングするための `/status` エンドポイントを含んでいます。

### 入力および出力ファイルの保存

クライアントは、次のストレージタイプのいずれかに保存されているアセットを使うことができます。

1. Adobe： Creative Cloud 上のファイルへのパスを参照する。
2. 外部：（AWS S3のような）署名済みの GET/PUT URL を使う。
3. Azure： アップロード/ダウンロード用の SAS（Shared Access Signature）を生成する。
4. Dropbox： https://dropbox.github.io/dropbox-api-v2-explorer/ を用いて一時的なアップロード/ダウンロードリンクを生成する。

<!--
## Input and Output file formats

Any input image format that is supported by Lightroom is also supported by the APIs. To look at the list of these formats in more detail, please refer to: [https://helpx.adobe.com/lightroom-classic/help/supported-file-formats.html](https://helpx.adobe.com/lightroom-classic/help/supported-file-formats.html)

At this point the output formats supported are JPG, DNG and PNG.
-->

## 入力および出力ファイルの形式

入力する画像について、Lightroom が対応している画像形式はすべて、API も対応しています。これらの形式のリストは [https://helpx.adobe.com/lightroom-classic/help/supported-file-formats.html](https://helpx.adobe.com/lightroom-classic/help/supported-file-formats.html) に詳しくあります。

出力する画像について、今の時点で対応している形式は、JPG、DNG、PNG です。

<!--
# Supported Features

This is a list of currently supported features

## AutoTone
Automatically tone an image to correct exposure/contrast/sharpness/etc
### /autoTone
The API is documented [here](https://adobedocs.github.io/lightroom-api-docs/#api-autoTone-auto_tone_post)

### Example: Initiate a job to auto tone an image
-->

# サポートされる機能

以下は、現在、対応している機能の一覧です。

## 自動補正

画像を自動的に補正して、露出/コントラスト/シャープネスなどを調整します。

### /autoTone

API ドキュメントは [こちら](https://adobedocs.github.io/lightroom-api-docs/#api-autoTone-auto_tone_post)

### 例：画像を自動補正する

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
<!--
This initiates an asynchronous job and returns a request body containing the href to poll for job status.
-->

これにより、非同期ジョブが開始され、ジョブのステータスをポーリングするための href を含むレスポンスボディが返されます。

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

<!--
To check the status of the job completion, use the `/status` API. An example usage of the API can be found [here](https://github.com/AdobeDocs/lightroom-api-docs#job-status).

## AutoStraighten
Applies the Auto Upright transformation on an image
### /autoStraighten
The API is documented [here](https://adobedocs.github.io/lightroom-api-docs/#api-autoStraighten-auto_straighten_post)

### Example: Initiate a job to auto straighten an image
-->

ジョブの完了ステータスを確認するには、 `/status` API を使います。API の使用サンプルは [こちら](https://github.com/AdobeDocs/lightroom-api-docs#job-status)

## 自動歪み補正
画像に自動で Upright 変形を適用します。

### /autoStraighten
API ドキュメントは [こちら](https://adobedocs.github.io/lightroom-api-docs/#api-autoStraighten-auto_straighten_post)

### 例：画像を自動歪み補正する

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

<!--
This initiates an asynchronous job and returns a request body containing the href to poll for job status.
-->

これにより、非同期ジョブが開始され、ジョブのステータスをポーリングするための href を含むレスポンスボディが返されます。

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

<!--
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
-->

ジョブの完了ステータスを確認するには、 `/status` API を使います。API の使用サンプルは [こちら](https://github.com/AdobeDocs/lightroom-api-docs#job-status)

## プリセット

クラウドに保存されているプリセットファイルを参照して、1つ以上の XMP Lightroom プリセットを画像に適用します。
プリセットファイルは、lightroom で画像を編集して `.xmp` ファイルとしてエクスポートすることで作成できます。
プリセットの作成方法の詳細は [こちら](https://helpx.adobe.com/lightroom-cc/how-to/photo-presets-lightroom-cc.html) 。
ユーザーから直接に取得したスライダー値から `.xmp` ファイルを作成する場合は、2つの方法があります：
1. [こちら](https://github.com/AdobeDocs/lightroom-api-docs/tree/master/sample-app/crs.xml) にある空の `.xmp` ファイルから始めて、対応するスライダー値を追加します。
2. または、このページの [/edit API](https://github.com/AdobeDocs/lightroom-api-docs#edit) をご覧ください。

### /presets

API ドキュメントは [こちら](https://adobedocs.github.io/lightroom-api-docs/#api-presets-presets_post)

### 例：画像にプリセットを適用する

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

<!--
This initiates an asynchronous job and returns a request body containing the href to poll for job status.
-->

これにより、非同期ジョブが開始され、ジョブのステータスをポーリングするための href を含むレスポンスボディが返されます。

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

<!--
To check the status of the job completion, use the `/status` API. An example usage of the API can be found [here](https://github.com/AdobeDocs/lightroom-api-docs#job-status).

## Edit
Apply one or more Lightroom edits to an image.
### /edit
The API is documented [here](https://adobedocs.github.io/lightroom-api-docs/#api-edit-edit_post)
The options section shown in the sample curl command below also indicates the set of Lightroom edits and the corresponding values that can be applied to the input image.

### Example : Initiate a job to apply edits to an image
-->

ジョブの完了ステータスを確認するには、 `/status` API を使います。API の使用サンプルは [こちら](https://github.com/AdobeDocs/lightroom-api-docs#job-status)

## 編集
画像に、1つ以上の Lightroom の編集を適用します。

### /edit
API ドキュメントは [こちら](https://adobedocs.github.io/lightroom-api-docs/#api-edit-edit_post) 。

以下の curl コマンドのサンプルにある options セクションは、Lightroom の編集の項目リストと、取り得る値も示しています。

### 例：画像に編集を適用する

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

<!--
This initiates an asynchronous job and returns a request body containing the href to poll for job status.
-->

これにより、非同期ジョブが開始され、ジョブのステータスをポーリングするための href を含むレスポンスボディが返されます。

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

<!--
To check the status of the job completion, use the `/status` API. An example usage of the API can be found [here](https://github.com/AdobeDocs/lightroom-api-docs#job-status).

## XMP
Apply a Lightroom preset to an image, by passing in the preset XMP contents inline through the API.
### /xmp
The API is documented [here](https://adobedocs.github.io/lightroom-api-docs/#api-xmp-xmp_post)
### Example : Initiate a job to apply xmp to an image
-->

ジョブの完了ステータスを確認するには、 `/status` API を使います。API の使用サンプルは [こちら](https://github.com/AdobeDocs/lightroom-api-docs#job-status)

## XMP

API で直接にプリセットXMPを渡して、Lightroom プリセットを画像に適用します。

### /xmp

API ドキュメントは [こちら](https://adobedocs.github.io/lightroom-api-docs/#api-xmp-xmp_post)

### 例：画像にxmpを適用する

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

<!--
This initiates an asynchronous job and returns a request body containing the href to poll for job status.
-->

これにより、非同期ジョブが開始され、ジョブのステータスをポーリングするための href を含むレスポンスボディが返されます。

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

<!--
To check the status of the job completion, use the `/status` API. An example usage of the API can be found [here](https://github.com/AdobeDocs/lightroom-api-docs#job-status).

## Job Status
### /status
Check the status of job completion using the JobID returned from a call to one of the Lightroom APIs listed above.
### Example: Poll for status and results

Use the JobID to poll on the href that is returned in the response from one of the Lightroom APIs.
1. Upon successful job completion, the output file will be available at the specified output href.
2. If the job failed due to an error, the `errorDetails` field in the response will contain the details of the failure.
-->

ジョブの完了ステータスを確認するには、 `/status` API を使います。API の使用サンプルは [こちら](https://github.com/AdobeDocs/lightroom-api-docs#job-status)

## ジョブのステータス

### /status

上記のいずれかの Lightroom API への呼び出しから返された JobID を使って、ジョブの完了ステータスを確認します。

### 例：ステータスと結果のポーリング

JobID を使って、Lightroom API からのレスポンスに含まれる href をポーリングします。

1. ジョブが正常に完了すると、レスポンスに含まれる href で出力されたファイルが利用可能になります。
2. エラーによりジョブが失敗した場合、レスポンスの `errorDetails` フィールドにエラーの詳細が含まれます。

```shell
curl -X GET \
  https://image.adobe.io/lrService/status/<jobId> \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>'
```

<!--
And this will return a request body containing the job status for each requested output and eventually either errors or the hrefs to the requested outputs
-->

そしてこれは、リクエストそれぞれの出力のジョブステータスを含むリクエストボディを返し、最終的にはエラーまたはリクエストされた画像への href のいずれかを返します。

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

<!--
# Current Limitations
&nbsp;
# Release Notes
-->

# 現在の制限

# リリースノート
