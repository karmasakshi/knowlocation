'use strict';

var p1 = { lat: 0, lon: 0 };

var checkGeolocationApiAvailability = function () {

  if (!navigator.geolocation) {

    document.getElementById('geolocation-text').style.display = 'none';

  }

}

var getGeolocation = function () {

  document.getElementById('getgeo').disabled = true;

  document.getElementById('getgeo').innerHTML = 'Loading...';

  navigator.geolocation.getCurrentPosition(

    (position) => {

      document.getElementById('getgeo').disabled = false;

      document.getElementById('getgeo').innerHTML = 'Share Precise Location';

      document.getElementById('latitude-input').value = position.coords.latitude;

      document.getElementById('longitude-input').value = position.coords.longitude;

      p1 = { lat: position.coords.latitude, lon: position.coords.longitude };

      document.getElementById('coarse-location').style.display = 'none';

      document.getElementById('precise-location').style.display = 'block';

    });

}

var getCoarseLocation = function () {

  fetch('https://ipapi.co/json').then(

    (responsePromise) => responsePromise.json()).then(

      (response) => {

        document.getElementById('latitude-input').value = response.latitude;

        document.getElementById('longitude-input').value = response.longitude;

        p1 = { lat: response.lat, lon: response.lon };

      }

    ).catch(error => console.log(error));

}

var rad = x => x * Math.PI / 180;

var updateLocation = function () {

  document.getElementById('lt100').style.display = 'none';

  var p2 = {
    lat: Number(document.getElementById('latitude-input').value),
    lon: Number(document.getElementById('longitude-input').value)
  };

  var R = 6378137;

  var dLat = rad(p2.lat - p1.lat);

  var dLong = rad(p2.lon - p1.lon);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var d = R * c;

  if (d <= 100) {

    document.getElementById('lt100').style.display = 'block';

  }

}

// Get coarse location.
getCoarseLocation();

// Check Geolocation API availability.
checkGeolocationApiAvailability();
