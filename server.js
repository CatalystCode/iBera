
var app = require('./service');
app.set('port', process.env.PORT || 4000);

var server = app.listen(app.get('port'), (err) => {
	if (err) return console.error(err);
	console.info(`server listening on port ${app.get('port')} process ${process.pid}`);
});
