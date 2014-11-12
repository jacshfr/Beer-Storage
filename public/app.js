(function() {
  if ("geolocation" in navigator) {
    console.log(navigator.geolocation);
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
    });
    /* geolocation is available */
  } else {
    console.log('no')
    /* geolocation IS NOT available */
  }
}());
