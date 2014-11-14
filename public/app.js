'use strict';

(function() {
  var lat;
  var lon;
  if ('geolocation' in navigator) {
    console.log(navigator.geolocation);
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      // console.log(lat, lon);
      $.ajax({
        type: 'POST',
        url: '/',
        data: {lat:lat,
              lon: lon},
        success: function(parsedJson) {
          console.log(parsedJson);
          $('#jacket').text('Jacket: ' + parsedJson.jacket);
          $('#rain').text('Rain: ' + parsedJson.rain);
          $('#temp').text('Temperature: ' + parsedJson.temp);
        },
        dataType: 'json'
      });
      console.log(lat, lon);
    });
    /* geolocation is available */
  } else {
    console.log('no');
    /* geolocation IS NOT available */
  }
    $.ajax({
    type: 'POST',
    url: '/text',
    data: {msg:"cmon"},
    success: function(parsedJson) {
      console.log(parsedJson);
      console.log('success');
    },
    dataType: 'json'
  });
}());
