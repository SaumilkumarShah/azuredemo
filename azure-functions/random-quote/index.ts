const { BlobServiceClient } = require('@azure/storage-blob');
import { AzureFunction, Context, HttpRequest } from '@azure/functions';

// Establish a connection to the Blob storage and obtain the quotes.json file
const getQuotes = async (): Promise<string> => {
	const AZURE_STORAGE_CONNECTION_STRING = process.env['AZURE_STORAGE_CONNECTION_STRING'];
	const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
	const containerClient = blobServiceClient.getContainerClient('random-quote');
	const blockBlobClient = containerClient.getBlockBlobClient('quotes.json');
	const downloadBlockBlobResponse = await blockBlobClient.download(0);
	const quotes = await streamToString(downloadBlockBlobResponse.readableStreamBody);
	return JSON.parse(quotes);
};

// A helper function used to read a Node.js readable stream into a string
async function streamToString(readableStream): Promise<string> {
	return new Promise((resolve, reject) => {
		const chunks = [];
		readableStream.on('data', (data) => {
			chunks.push(data.toString());
		});
		readableStream.on('end', () => {
			resolve(chunks.join(''));
		});
		readableStream.on('error', reject);
	});
}

/**
 * This Azure Function returns a random quote to the calller. It reads the file `quotes.json` that has been stored
 * on Azure Blob Storage, and picks a random quote from it. The return is a json that has the quote and the author in it
 */
const httpTrigger: AzureFunction = async function(context: Context, req: HttpRequest): Promise<void> {
	context.log('Quote requested');
	const quotes = await getQuotes();
	context.res = {
		body: quotes[Math.floor(Math.random() * quotes.length)]
	};
};

export default httpTrigger;
