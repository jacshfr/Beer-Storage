'use strict';

var express = require('express');
var app = express();

var port = process.env.PORT || 5000;

app.listen(port);
console.log('listening on port ' + port);

