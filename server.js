'use strict';

var express = require('express');
var request = require('superagent');
var bodyParser = require('body-parser');
var accountSid = 'AC25571a0c40f7b73c6e794c461033825f';
var authToken = "8508d33bc7bdfa213386318431c51d60";
var twil = require('twilio')(accountSid, authToken);
var app = express();

var port = process.env.PORT || 2000;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));

app.post('/text', function(req, res) {
  console.log(req.body);
  var events = req.body.syncEvent;
  var invite = req.body.syncEvent.invites;
  var msgObj = invite.name + ', I am having a ' + events.name + '. Would you like to come to ' + events.location + ' on ' + events.when + ' ? Please respond with "y" or "n" only.';
  twil.sendMessage({
      to: invite.phoneNum,
      from: "+14157693308",
      body: msgObj,
      statusCallback: function(err) {
        console.log('it worked');
        }
    }), function(err, message) {
      console.log('hullo');
      // console.log(message.sid);
      };
      res.send({look: "look!"});
});

app.post('/response', function(req, res) {
  console.log(req.body);
  var textResponse = req.body.Body.toLowerCase();
  var respObj = '';
  if (textResponse === 'y') {
    respObj = 'you are awesome, see you there!';
  } else if (textResponse === 'n') {
    respObj = 'too bad, you are missing out. maybe next time.';
  } else {
    respObj = 'please respond with "y" or "n"';
  }
  twil.sendMessage({
    to: "+19152521559",
    from: "+14157693308",
    body: respObj,
    statusCallback: function(err) {
      console.log('it worked');
      }
  }), function(err, message) {
    console.log('hullo');
    // console.log(message.sid);
    };
      res.send({look: "look!"});
});

app.post('/', function(req, res) {
  var lat = req.body.lat;
  var lon = req.body.lon;
  // console.log(lat, lon);

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
