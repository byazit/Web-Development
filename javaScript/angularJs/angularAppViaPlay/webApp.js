var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html')
});

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/fonts', express.static('fonts'));
app.listen(80);
