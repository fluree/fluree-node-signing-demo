# Fluree Node.js signing demo

| This repo is a demo of how to use the crypto lib to sign a query and submit it to Fluree

## npm Link

Once you have the code locally, you will need to run `npm link` from the root directory of the code base. This will create a symlink so that when you type `flureecli` your terminal will be able to find the entrypoint to the script you want to run.

## Create Keys

The first thing you will need to do is create a private/public key pair and generate an auth id
This will be used to create an auth record in your Fluree instance.

Run `node key.js` in your terminal to print a new private key and auth id, in that order, to stdout.

You will need to transact the auth id to fluree with this json:

```json
[
	{
    "_id": "_auth",
    "id": " PUT THE AUTH ID HERE ",
    "doc": "doc string for auth record",
    "roles": [[ "_role/id", "root" ]]  // you can associate the relevant role as needed
	}
]
```

## Use the CLI

This cli has a few options which you can use to define which dataset you will be connecting to.

- The `network` (`-n`) and `db` (`-d`) of your dataset are required.
- The `url` (`-u`)and `port` (`-p`) are optional, but will default to a locally running fluree on localhost:8090.
- The `privateKey` option (`-k`) is required. (Grab this after running key.js above)
- There is also a `json` option (`-j`) which allows you to pass in the query in the command

## Example

``` sh
flureecli --network fluree --db 387028092977257 --privateKey 1611e1493b550fd9995ca7a5f66e8b98f8d4b7217cea72deedef1e2895c66fd6 -j '{"select":["*"], "from":"taxonomy","opts":{"compact":true}}' -u https://localhost:8090/
```

This connects to a dataset running on my flureehub and submits a simple query.
The response is printed to the console.
