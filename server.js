'use strict';

var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var jade = require('jade');
var app = express();

var port = process.env.PORT || 2000;

var username = 'jack';

app.use(express.static(__dirname + '/public'));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.get('/', function(req, res) {
//   res.render('index', {userName: username});
// });

app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/', function(req, res) {
  var lat = req.body.lat;
  var lon = req.body.lon;
  console.log(lat, lon)
  request('http://api.wunderground.com/api/' + process.env.WUNDERAPI + '/geolookup/conditions/q/' + lat + ',' + lon + '.json',
    function(err, response, body) {
      var parsedBody = JSON.parse(body);
      if(!err) {
        var weather = parsedBody.current_observation;
        var rain = weather.precip_1hr_in;
        var cond = weather.weather;
        var temp = weather.temp_f;

        var obj = {jacket: 'no jacket',
                   rain: 'no rain',
                   temp: temp};
        if (cond != 'Clear' || temp < 60) {
          obj.jacket = 'jacket';
        }
        if (rain > 1) {
          obj.rain = 'rain'
        }
        // if ()her
        res.send(obj);
      }
  });
});

app.listen(port);
console.log('listening to ' + port);

