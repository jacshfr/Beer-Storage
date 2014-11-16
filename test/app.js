'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
require('../server');
chai.use(chaihttp);
var port = process.env.PORT || 3000;

var url = 'http://localhost:' + port;
describe('weather and jacket yes or no', function() {
  it('should return obj', function(done) {
    chai.request(url)
    .post('/', function(req, res) {
      var lat = 47.623427799999995;
      var lon = -122.3360643;
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
            expect(obj.test).to.eql('test');
          }
        });
    })
    .end(function(err,res) {

      done();
    });
  });
});



