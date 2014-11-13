'use strict';

var express = require('express');
var request = require('superagent');
var bodyParser = require('body-parser');
var jade = require('jade');
var app = express();

var port = process.env.PORT || 2000;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/', function(req, res) {
  var lat = req.body.lat;
  var lon = req.body.lon;
  console.log(lat, lon);
  request
    .get('http://api.wunderground.com/api/' + process.env.WUNDERAPI + '/geolookup/conditions/q/' + lat + ',' + lon + '.json')
    .end(function(err, response) {
      var parsedBody = JSON.parse(response.text);
      if(!err) {
        var weather = parsedBody.current_observation;
        var rain = weather.precip_1hr_in;
        var cond = weather.weather;
        var temp = weather.temp_f;

        var obj = {jacket: 'no jacket',
                   rain: 'no rain',
                   temp: temp,
                   test: 'test'};
        if (cond != 'Clear' || temp < 60) {
          obj.jacket = 'yes';
        }
        if (rain > 1) {
          obj.rain = 'yes';
        }
        // if ()her
        res.json(obj);
      }
  });
});

app.listen(port);
console.log('listening to ' + port);

