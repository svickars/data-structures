var fs = require('fs');
var request = require('request'); // npm install request
var cheerio = require('cheerio'); // npm install cheerio
var async = require('async'); // npm install async

var apiKey = process.env.GMAKEY; 
var zoneNumber = '01';

// read zone html files from assignment 1 and location files (using Google Maps API) from assignment 3
var content = fs.readFileSync('/home/ubuntu/workspace/week1/zones/'+zoneNumber+'.txt');
var googleContent = fs.readFileSync('/home/ubuntu/workspace/week3/data/locations' + zoneNumber + '.txt');

// empty arrays to store meeting data
var meetingStreetAddress = [];
var meetingLocationName = [];
var meetingGroupName = [];
var meetingNotes = [];
var meetingTime = [];
var meetingType = [];
var meetingData = [];

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
        meetingType.push($(elem).find('td').eq(1).html().split('<br>')[1].split('</b>').pop().split('<br>').shift().trim());
    });

console.log(meetingTime);

// for (var i = 0; i < meetingGroupName.length; i++) {
//         meetingData.push(JSON.stringify({ groupName: meetingGroupName[i], locationName: meetingLocationName[i], streetAddress: JSON.parse(googleContent)[i].clean, lat: JSON.parse(googleContent)[i].latLong.lat, long: JSON.parse(googleContent)[i].latLong.lng, meetingNotes: meetingNotes[i], meetingTimes: meetingTime[i], meetingType: meetingType[i]}));
// }

// console.log(meetingData);
// fs.writeFile('/home/ubuntu/workspace/week5/data/' + zoneNumber + '.json', meetingData)