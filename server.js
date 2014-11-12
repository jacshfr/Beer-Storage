'use strict';

var express = require('express');
var app = express();

var port = process.env.PORT || 2000;

app.use(express.static(__dirname + '/public/'));

app.listen(port);
console.log('listening to ' + port);

