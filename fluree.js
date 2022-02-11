#!/usr/bin/env node

import { signQuery } from '@fluree/crypto-utils';
import fetch from "node-fetch";
import yargs from "yargs";
import { hideBin } from 'yargs/helpers';

const { network, db, port, url, privateKey, json } = yargs(hideBin(process.argv))
	.scriptName('flureecli')
	.usage('$0 <cmd> [args]')
	.command('query')
	.command('transact')
	.option('n', {
		alias: 'network',
		demandOption: true,
		default: 'fluree',
		desc: 'name of the network of the dataset',
		type: 'string'
	})
	.option('d', {
		alias: 'db',
		demandOption: true,
		desc: 'name of the database of the dataset',
		type: 'string'
	})
	.option('u', {
		alias: 'url',
		default: 'http://localhost',
		desc: 'base url of the connection string',
		type: 'string'
	})
	.option('p', {
		alias: 'port',
		default: '8090',
		desc: 'port for the connection string',
		type: 'string'
	})
	.option('k', {
		alias: 'privateKey',
		desc: 'private key for the user to sign comms to fluree backend',
		type: 'string',
		demandOption: true
	})
	.option('j', {
		alias: 'json',
		desc: 'json to send as the body to the request to fluree',
		type: 'string'
	})
	.help()
	.argv

let uri = '';
// Build the uri to connect to and query
if (url === 'https://api.dev.flur.ee') {
	uri = `${url}:${443}/fdb/${network}/${db}/query`;
}	else {
	uri = `${url}:${port}/fdb/${network}/${db}/query`;
}

// Build the dataset name to pass to the signQuery function
const dataset = `${network}/${db}`
let query = '';
// Stringify the json body for the query (required for signing)
if (json === undefined) {
	query = JSON.stringify({ "select": ["*"], "from": "_collection" });
} else {
	query = json;
}

// Pass opts to the signQuery function
const fetchOpts = signQuery(privateKey, query, 'query', dataset);
try {
	// Fetch 
	const response = await fetch(uri, fetchOpts)
	const data = await response.json();
	console.log(data);
} catch (error) {
	console.error(error)
}
