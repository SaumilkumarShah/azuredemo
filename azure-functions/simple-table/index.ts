import { AzureFunction, Context, HttpRequest } from '@azure/functions';
const fetch = require('node-fetch');

// a list of tasks. POST would select an item randomly from this array and
// will add it to the List through the GraphQL endpoint
const tasks = [
	'Get Haircut',
	'Mow Lawn',
	'Have Dinner',
	'Book Dinner',
	'Watch TV',
	'Play Cricket',
	'Play Drums',
	'Take a nap',
	'Play Rughby',
	'Have Coffee',
	'Cook Pasta',
	'Have a Beer',
	'Call Mum'
];

/**
 * If its a GET request, just return the list by querying the GraphQL endpoint.
 * If its a POST request, pick a task randomly from the `tasks` list and issue a
 * mutatation before returning the new list. 
 */
const exec = async (method: string): Promise<Object> => {
	const queryGET = `
		query {
			List {
				item
			}
		}`;
	const queryPOST = `
		mutation {
  			insert_List_one(
    			object: {
      				item:"${tasks[Math.floor(Math.random() * tasks.length)]}"
    			}
  			) {
    			item
  			}
		}`;
	const res = await fetch(process.env['GRAPHQL_SERVER_APP_SERVICE'], {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query: method === `GET` ? queryGET : queryPOST })
	});
	const { data } = await res.json();
	return data;
};

/**
 * This Azure Function reads a simple table through the Hasura GraphQL interface.
 */
const httpTrigger: AzureFunction = async function(context: Context, req: HttpRequest): Promise<void> {
	context.log('Simple table read');
	let gqlRes = await exec(req.method);
	if (req.method === 'POST') gqlRes = await exec('GET');
	context.res = { body: gqlRes };
};

export default httpTrigger;
