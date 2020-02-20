var express = require('express')
var app = express()
var unirest = require('unirest');

app.get('/', function(req, res, next) {
	var req = unirest("GET", "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/inception");
	req.headers({
		"x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
		"x-rapidapi-key": "f93b4d55a4msh3d248b9d4fd11edp19aac5jsn485b985a5480"
	});
	req.end(function (res) {
		if (res.error) throw new Error(res.error);

		console.log(res.body);
		return res.body;
	});
})
module.exports = app