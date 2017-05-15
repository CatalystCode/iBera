
var express = require('express');
var fs = require('fs');
var app = express();

const bc = require('./bc');

console.log('starting iBera service');

app.use((req, res, next) => {
	console.log(`url: ${req.path}`);
	return next();
});

app.get('/', (req, res) => res.end('iBera service is on...'));

app.get('/balance', async (req, res) => res.json(await bc.getBalances()));

module.exports = app;
