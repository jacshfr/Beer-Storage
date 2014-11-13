'use strict';

var cityState = '', lat, lon;
(function() {
  if ("geolocation" in navigator) {
    console.log(navigator.geolocation);
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      // console.log(lat, lon);
      $.ajax({
        type: 'POST',
        url: '/weather',
        data: {"lat":lat,
              "lon": lon},
        success: function(parsed_json) {
          console.log(parsed_json);
          $('header').text(parsed_json.jacket + parsed_json.rain + parsed_json.temp);
        },
        dataType: 'json'
      });
      console.log('sent');
    });
    /* geolocation is available */
  } else {
    console.log('no')
    /* geolocation IS NOT available */
  }
}());
