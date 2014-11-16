'use strict';

var express = require('express');
var request = require('superagent');
var bodyParser = require('body-parser');
var twil = require('twilio')(process.env.ACCOUNTSID, process.env.AUTHTOKEN);
var app = express();

var port = process.env.PORT || 2000;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));

app.post('/', function(req, res) {
  var lat = req.body.lat;
  var lon = req.body.lon;
  // console.log(lat, lon);

  request
    .get('http://api.wunderground.com/api/' + process.env.WUNDERAPI + '/geolookup/conditions/q/' + lat + ',' + lon + '.json')
    .end(function(err, response) {
      var parsedBody = JSON.parse(response.text);
      if(!err) {
        var location = parsedBody.current_observation.display_location.full;
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
        twil.sendMessage({
          to: '+19152521559',
          from: "+14157693308",
          body: location,
          statusCallback: function(err) {
            console.log('it worked');
            }
        }), function(err, message) {
          console.log('hullo');
          // console.log(message.sid);
          };
            res.send({look: "look!"});

        res.json(obj);
      }
  });
});

app.listen(port);
console.log('listening to ' + port);
