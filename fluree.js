import { signQuery } from '@fluree/crypto-utils';
import fetch from "node-fetch";
import yargs from "yargs";
import { hideBin } from 'yargs/helpers';

const { network, db, port, url, privateKey } = yargs(hideBin(process.argv))
	.scriptName('fluree')
	.usage('$0 <cmd> [args]')
	.command('query')
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
		type: 'string'
	}
	)
	.argv

const uri = `${url}:${port}/fdb/${network}/${db}/query`;
const dataset = `${network}/${db}`.toString();

const query = JSON.stringify({ "select": ["*"], "from": "_collection" });

const fetchOpts = signQuery(privateKey, query, 'query', dataset);

try {
	const response = await fetch(uri, fetchOpts)
	const data = await response.json();
	console.log(data);
} catch (error) {
	console.error(error)
}
