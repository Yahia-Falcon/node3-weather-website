const request = require("postman-request");

function forecast(latitude, longitude, callback) {
 const url = `http://api.weatherstack.com/current?access_key=afa0091b284be8e44f435ab8bb452499&query=${latitude},${longitude}`;

 request(url, {json: true}, (err, {body}) => {
  if (err) {
   callback("Couldn't connect to weather services!");
  } else if (body.error) {
   callback("Couldn't find location, try another search.");
  } else {
   callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out, there is a ${body.current.precip}% chance of rain!`);
  }
 });
}

function geocode(address, callback) {
 const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieWFoeWEtZmFsY29uIiwiYSI6ImNrcTI5cmlwazBtb28yb3FyYTc3MDJ4ODMifQ.lKPejgVjZgWzYAjhbMbn_Q&limit=1`;

 request(url, {json: true}, (err, {body}) => {
  if (err) {
   callback("Couldn't connect to location services!");
  } else if (body.features.length === 0) {
   callback("Couldn't find location, try another search.");
  } else {
   callback(undefined, {latitude: body.features[0].center[1], longitude: body.features[0].center[0], location: body.features[0].place_name});
  }
 });
}

module.exports = {forecast, geocode};