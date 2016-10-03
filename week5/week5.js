var fs = require('fs');
var request = require('request'); // npm install request
var cheerio = require('cheerio'); // npm install cheerio
var async = require('async'); // npm install async

var apiKey = process.env.GMAKEY; 
var zoneNumber = '01';

var content = fs.readFileSync('/home/ubuntu/workspace/week1/zones/'+zoneNumber+'.txt');
var meetingStreetAddress = [];
var meetingLocationName = [];
var meetingGroupName = [];
var meetingNotes = [];
var meetingTime = [];
var meetingType = [];
var meetingData = [];

var meetingLoc = [];

var $ = cheerio.load(content);

$('tbody').find('tr').each(function(i, elem){
        meetingGroupName.push($(elem).find('td').eq(0).html().split('<br>')[1].split('<b>').pop().split('</b>').shift().replace('&apos;', '\'').trim());
        meetingLocationName.push($(elem).find('td').eq(0).html().split('<br>')[0].split('0;">').pop().split('</h4>').shift().replace('&apos;', '\'').trim());
        meetingStreetAddress.push($(elem).find('td').eq(0).html().split('<br>')[2].split(',').shift().concat(', New York, NY').split(' ').join('+').trim());
        
        if ($(elem).find('div').eq(0).html() == null) {
            meetingNotes.push($(elem).find('div').eq(0).html());
        } else {
            meetingNotes.push($(elem).find('div').eq(0).html().replace('<br>','').replace(' \r\n                        \t', '').replace(' \r\n                        ', ''));
        }
        // only getting the data for *one* meeting time for each group, not sure where to go from here. divide into meetingDay, meetingStartTime, meetingEndTime??
        meetingTime.push($(elem).find('td').eq(1).html().split('<br>')[0].split('\t    <b>').pop().split('<br>').shift().replace('<b>','').replace('</b>','').replace('to</b>','to').trim());
        meetingType.push($(elem).find('td').eq(1).html().split('<br>')[1].split('</b>').pop().split('<br>').shift());
    });
    
// async.eachSeries(meetingStreetAddress, function(value, callback) {
//     var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value + '&key=' + apiKey;
//     var meetingLocation = new Object;
//     request(apiRequest, function(err, resp, body) {
//         if (err) {throw err;}
//          else {
//             meetingLocation.clean = JSON.parse(body).results[0].formatted_address;
//             meetingLocation.latLong = JSON.parse(body).results[0].geometry.location;
//         }
//         meetingLoc.push(meetingLocation);
//     });
//     setTimeout(callback, 2000);
// }, function() {
//     // console.log(meetingLoc); // print results to console
//     // fs.writeFileSync('/home/ubuntu/workspace/week3/data/locations' + fileNumber +'.txt', JSON.stringify(meetingsData)); // save results to text file
// });
    
    


for (var i = 0; i < meetingGroupName.length; i++) {
        meetingData.push(JSON.stringify({ groupName: meetingGroupName[i], locationName: meetingLocationName[i], streetAddress: meetingStreetAddress[i], meetingNotes: meetingNotes[i], meetingTimes: meetingTime[i], meetingType: meetingType[i]}));
}

console.log(meetingData);
fs.writeFile('/home/ubuntu/workspace/week5/data/' + zoneNumber + '.txt', meetingData)