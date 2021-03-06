'use strict';

var express = require('express');
var request = require('superagent');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 2000;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));

app.post('/', function(req, res) {
  var lat = req.body.lat;
  var lon = req.body.lon;

  request
    .get('http://api.wunderground.com/api/' + process.env.WUNDERAPI + '/geolookup/conditions/q/' + lat + ',' + lon + '.json')
    .end(function(err, response) {
      var parsedBody = JSON.parse(response.text);
      if(!err) {
        var location = parsedBody.current_observation.display_location.full;
        var weather = parsedBody.current_observation;
        var rain = weather.weather;
        var cond = weather.weather;
        var temp = weather.temp_f;
        var forecast = weather.forecast_url;
        var obj = {jacket: 'no jacket',
                   rain: 'no rain',
                   temp: temp,
                   test: 'test',
                  forecast: forecast };
                  console.log(weather);
        if (cond != 'Clear' || temp < 60) {
          obj.jacket = 'yes';
        }
        if (rain === 'Rain') {
          obj.rain = 'yes';
        }
      }
  });
});

app.listen(port);
console.log('listening to ' + port);
