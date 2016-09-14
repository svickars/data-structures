
var request = require('request');
var fs = require('fs');

request('https://maps.googleapis.com/maps/api/geocode/json?address=79+Fifth+Avenue,+New+York,+NY&key=AIzaSyDiyOTIFB5PzdZlyuiLbgjO7iC0CoOWLV8', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    // fs.writeFileSync('/home/ubuntu/workspace/data/m02meetings.txt', body);
    var gmo = JSON.parse(body);
    console.log(gmo.results[0].geometry.location)
  }
  else {console.error('request failed')}
})