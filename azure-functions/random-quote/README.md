## About random-quote

This is a simple Azure Function that connects to an [Azure Blob Storage](https://azure.microsoft.com/en-au/services/storage/blobs) service to obtain a file called `quotes.json`, which is stored in a container called `random-quote`.

## Running locally

Detailed instructions of running an Azure Function can be found at [Getting started with Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-get-started?pivots=programming-language-javascript) and [Code and test Azure Functions locally](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local). 

## Deploying on Azure

The file `azure-functions.yaml` would trigger the deployment of this project to the Azure Portal.

## Developer Notes

### storing connection string for Azure Storage

As mentioned in [Quickstart: Manage blobs with JavaScript v12 SDK in Node.js](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-nodejs) and [Azure Functions JavaScript developer guide](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=v2#environment-variables), `AZURE_STORAGE_CONNECTION_STRING` are being saved in either `local.sesstings.json` for local development, or as `Application Settings` for running it on Azure.