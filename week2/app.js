
var fs = require('fs');
var cheerio = require('cheerio'); // npm install cheerio
var zoneNumber = '01';

var content = fs.readFileSync('/home/ubuntu/workspace/week1/zones/'+zoneNumber+'.txt');
var meetingStreetAddress = [];
var meetingLocationName = [];
var meetingGroupName = [];
var meetingNotes = [];

var $ = cheerio.load(content);

$('tbody').find('tr').each(function(i, elem){
        meetingGroupName.push($(elem).find('td').eq(0).html().split('<br>')[1].split('<b>').pop().split('</b>').shift().trim());
        meetingLocationName.push($(elem).find('td').eq(0).html().split('<br>')[0].split('0;">').pop().split('</h4>').shift().replace('&apos;', '\'').trim());
        meetingStreetAddress.push($(elem).find('td').eq(0).html().split('<br>')[2].trim());
        meetingNotes.push($(elem).find('td').eq(0).html().split('<br>')[4].trim());
    });

console.log(meetingNotes);
// for (var i = 0; i < meetingStreetAddress.length; i++) {
//         console.log(JSON.stringify({ groupName: meetingGroupName[i], locationName: meetingLocationName[i], streetAddress: meetingStreetAddress[i]}));
// }
// fs.writeFileSync('/home/ubuntu/workspace/data/meetingsArray.txt', JSON.stringify(meetings));
    
    
// var fs = require('fs');
// var cheerio = require('cheerio'); // npm install cheerio
// var file = '01'

// var content = fs.readFileSync('/home/ubuntu/workspace/week1/zones/'+file+'.txt');
// var meetings = [];
// // var meetingData = [];

// var $ = cheerio.load(content);

// $('tbody').find('tr').each(function(i, elem){
//         // meetingData.push('"locationName":" ' + $(elem).find('td').eq(0).html().split('<br>')[0].replace('<h4 style="margin:0;padding:0;">', '').replace('</h4>', '').replace('&apos;', '\'').trim() + '", "groupName":" ' + $(elem).find('td').eq(0).html().split('<br>')[1].replace('<b>', '').replace('</b>', '').replace('&apos;', "'").trim());
//         meetings.locationName = ($(elem).find('td').eq(0).html().split('<br>')[0].replace('<h4 style="margin:0;padding:0;">', '').replace('</h4>', '').replace('&apos;', '\'').trim());
//         meetings.groupName = ($(elem).find('td').eq(0).html().split('<br>')[1].replace('<b>', '').replace('</b>', '').replace('&apos;', "'").trim());
//         meetings.streetAddress = ($(elem).find('td').eq(0).html().split('<br>')[2].trim());
//     });

// // var meetingData = JSON.stringify(meetings);

// console.log(meetings);
// // console.log(meetingData);
// // fs.writeFileSync('/home/ubuntu/workspace/week5/test/' + file +'.txt', JSON.stringify(meetingData));
// // console.log(locationName);
// // console.log(groupName);
// // fs.writeFileSync('/home/ubuntu/workspace/data/meetingsArray.txt', JSON.stringify(meetings));