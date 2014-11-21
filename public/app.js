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
          $('#forecast').text('src');
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
  // $.ajax({
  //   type: 'POST',
  //   url: '/text',
  //   data: {
  //     syncEvent: {
  //       name: 'EventSync Meeting',
  //       location: 'Codefellows, 2nd Floor',
  //       when: 'Monday at 9am',
  //       invites: [
  //         // {
  //         //   name: 'Sam',
  //         //   phoneNum: '+12064669834',
  //         //   coming: false
  //         // }, {
  //         //   name: 'Matt',
  //         //   phoneNum: '+12058211458',
  //         //   coming: false
  //         // }, {
  //         //   name: 'Brent',
  //         //   phoneNum: '+16175493609',
  //         //   coming: false
  //         // },
  //         {
  //           name: 'Jacob',
  //           phoneNum: '+19152521559',
  //           coming: false
  //         }
  //       ]
  //     }
  //   },
  //   success: function(parsedJson) {
  //     console.log(parsedJson);
  //     console.log('success');
  //   },
  //   dataType: 'json'
  // });

}());
