## About this project

This folder is the [Serverless](https://en.wikipedia.org/wiki/Serverless_computing) Backend for the xApp [universal-native-app](../universal-native-app). For the purpose of demonstration, this project contains the following Azure Functions:

1. [random-quote](random-quote/) - Generate a simple quote by connecting to an [Azure Blob Storage](https://azure.microsoft.com/en-au/services/storage/blobs) service. 

## Running locally

A step-by-step guide on this topic is maintained at [Develop Azure Functions by using Visual Studio Code](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-vs-code?tabs=csharp)

## Deploying on Azure

The file `azure-functions.yaml` would trigger the deployment of this project to the Azure Portal.

## Developer Notes

### enabling CORS

@amarsh:
I have enabled [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) on Azure Portal so that the `universal-native-app` can call our Azure Function. This is _not safe_, and the xAzure environment should set CORS automatically.
