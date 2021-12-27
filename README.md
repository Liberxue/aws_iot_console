# aws-iot-console

![login](./pic/login.png)

![dashboard](./pic/dashboard.png)

![dashboardTail](./pic/dashboard_detail.png)


|Category|Resource name|Operation |Provider plugin|
| ----------- | ----------- |----------- |----------- |
| Auth     | awsiotconsoleb179285c        | Create    | awscloudformation |
| Function | lambdaThingTriggerf368232f   | Create    | awscloudformation |
| Function | lambdaThing                  | Create    | awscloudformation |
| Function | ThingLogModelTrigger6fe99b16 | Create    | awscloudformation |
| Function | lambdaThingLog               | Create    | awscloudformation |
| Storage  | lambdaThing                  | Create    | awscloudformation |
| Storage  | ThingLogModel                | Create    | awscloudformation |
| Api      | ConsoleRESTAPI               | Create    | awscloudformation |


## Quick Start

```shell
git clone https://github.com/Liberxue/aws-iot-console.git
```
```shell
cd aws-iot-console
```

```shell
yarn install
```

####  [amplify](https://docs.amplify.aws/cli/start/install)

```shell
amplify configure
```

```shell
amplify init
```


### [REST API](https://docs.amplify.aws/lib/restapi/getting-started/q/platform/js/#configure-your-application)

```shell
amplify add api
```

### [analytics](https://docs.amplify.aws/lib/analytics/getting-started/q/platform/js/#configure-your-app)

```shell
amplify add analytics
```
### [Cognito Lambda](https://docs.amplify.aws/cli/function/#function-templates)

#### env 
```shell
var environment = process.env.ENV
var region = process.env.REGION
var apiBetatestGraphQLAPIIdOutput = process.env.API_BETATEST_GRAPHQLAPIIDOUTPUT
var apiBetatestGraphQLAPIEndpointOutput = process.env.API_BETATEST_GRAPHQLAPIENDPOINTOUTPUT
```

### [Authentication](https://docs.amplify.aws/cli/auth/overview/)


```shell
amplify add auth
```

```shell
amplify auth console

```


```shell
amplify status

```

```shell
amplify push
```

### Compiles and hot-reloads for development
```shell
yarn serve
```

### Compiles and minifies for production

```shell
yarn build
```

### Lints and fixes files
```shell
yarn lint
```


### Destroy
#### *Deletes all of the resources tied to the project from the cloud*
```shell
amplify delete
```