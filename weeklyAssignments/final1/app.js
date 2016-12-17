var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export NEW_VAR="Content of NEW_VAR variable"
// printenv | grep NEW_VAR
var apiKey = process.env.GMAKEY;

// create empty arrays for storing data
var address = [];
var meetingsData = [];

// change this number according to data set
var fileNumber = '03';

// read text file from assignment 2 and clean up
var addList = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/final1/data/' + fileNumber + '.json'));
// console.log(addList);

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachObject(addList, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.streetAddress + '&key=' + apiKey;
    var thisMeeting = new Object;
    thisMeeting.address = value;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
         else {
            thisMeeting.clean = JSON.parse(body).results[0].formatted_address;
            thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        }
        meetingsData.push(thisMeeting.clean);
    });
    setTimeout(callback, 1000);
    console.log(thisMeeting);
}, function() {
    // console.log(meetingsData); // print results to console
    // fs.writeFileSync('/home/ubuntu/workspace/week3/data/locations' + fileNumber +'.txt', JSON.stringify(meetingsData)); // save results to text file
});