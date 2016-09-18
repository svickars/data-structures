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

// change this number to match file name
var fileNumber = '01';

// read text file from assignment 2 and clean up
var addList = fs.readFileSync('/home/ubuntu/workspace/week3/data/meetings' + fileNumber + '.txt').toString().replace('["', '').split('","');


// reformat address data (ie. "20 Cardinal Hayes Place, Rectory Basement," becomes "20+Cardinal+Hayes+Place,+New+York,+NY")
for (var i = 0; i < addList.length; i++) {
    address.push(addList[i]
    .substring(0, addList[i].indexOf(','))
    .concat(', New York, NY')
    .split(' ').join('+'));
}

// console.log(addres);

var addresses = ["63 Fifth Ave, New York, NY", "16 E 16th St, New York, NY", "2 W 13th St, New York, NY"];


// // eachSeries in the async module iterates over an array and operates on each item in the array in series
// async.eachSeries(addresses, function(value, callback) {
//     var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addresses + '&key=' + apiKey;
//     var thisMeeting = new Object;
//     thisMeeting.address = value;
//     request(apiRequest, function(err, resp, body) {
//         if (err) {throw err;}
//         else {
//             thisMeeting.clean = JSON.parse(body).results[0].formatted_address;
//             thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
//         }
//         meetingsData.push(thisMeeting);
//     });
//     setTimeout(callback, 2000);
// }, function() {
//     console.log(meetingsData); // prints results to console
//     // fs.writeFileSync('/home/ubuntu/workspace/week3/data/locations' + fileNumber + '.txt', JSON.stringify(meetingsData)); // saves results to text file
// });

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(address, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value + '&key=' + apiKey;
    var thisMeeting = new Object;
    thisMeeting.address = value;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
         else {
            thisMeeting.clean = JSON.parse(body).results[0].formatted_address;
            thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        }
        meetingsData.push(thisMeeting);
    });
    setTimeout(callback, 2000);
}, function() {
    console.log(meetingsData);
});