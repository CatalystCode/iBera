
var express = require('express');
var fs = require('fs');
var app = express();

const bc = require('./bc');

console.log('starting iBera service');

app.use((req, res, next) => {
	console.log(`url: ${req.path}`);
	return next();
});

// TODO: error handling: https://expressjs.com/en/guide/error-handling.html


app.get('/', (req, res) => res.end('iBera service is on...'));

app.get('/balance', async (req, res) => {
	
	return wrapFuncWithTryCatchBlock(async () => {
			return res.json(await bc.getBalances());
	}, res)
	
});

var account1 = { address: "0xf2294a7a078b345be9e46c1f20e688d8ee614b08", password: "Pa$$word1" };
var account2 = { address: "0xfa4cb19fe87354dd62b03ab2e4bf6198c7fdb980", password: "Pa$$word1" };

app.get('/sendTransaction', async (req, res) => {
	
	return wrapFuncWithTryCatchBlock(async () => {
		var tx = {
			from: account1,
			to: account2,
			value: "2.3", 
			units: "ether", 
			data: { "a": "b" }
		};
		var result = await bc.sendTransaction(tx);
		return res.json(result);
	}, res);

});

app.get('/getTransaction', async (req, res) => {
	
	return wrapFuncWithTryCatchBlock(async () => {
		var hash = "0x3900b291743f0db20e3b7ca4aff9ace566b18c7c66f56007826b8fffba601131";
		var result = await bc.getTransaction(hash);
		return res.json(result);
	}, res);

});

/**
 * wrap any function with a try-catch block and send 
 * a generic error to the client in case of an exception
 * 
 * @param {any} fn the function to wrap
 * @param {any} res the response object
 * @returns 
 */
async function wrapFuncWithTryCatchBlock(fn, res) {
	try {
		await fn();
	}
	catch(err) {
		return res.status(500).end(`error invoking API: ${err}`);
	}
}

module.exports = app;
