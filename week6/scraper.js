var fs = require('fs');
var asyncEachObject = require('async-each-object');
var request = require('request'); // npm install request
var cheerio = require('cheerio'); // npm install cheerio
var async = require('async'); // npm install async

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export NEW_VAR="Content of NEW_VAR variable"
// printenv | grep NEW_VAR
var apiKey = process.env.GMAKEY;
var zoneNumber = '02';

// // read zone html files from assignment 1
var content = fs.readFileSync('/home/ubuntu/workspace/week6/sourceHTML/' + zoneNumber + '.txt');

// // empty array to store meeting data
var meetingsData = [];

var $ = cheerio.load(content);

$('tbody').find('tr').each(function(i, elem){
        
        var data = $(elem).find('td').eq(1).html().replace('\r\n                    \t\t\r\n\t\t\t\t\t', '').split('<br>\r\n                    \t<br>');
        
        for (var i=0; i < data.length; i++) {
        // ignore blank items
            if (data[i] !== '') {
                
                var meetings = new Object;
                
                // find meeting information: group name, notes and location data
                meetings.groupName = $(elem).find('td').eq(0).html().split('<br>')[1].split('<b>').pop().split('</b>').shift().replace(/&apos;/g, '\'').trim();
                meetings.locationName = $(elem).find('td').eq(0).html().split('<br>')[0].split('0;">').pop().split('</h4>').shift().replace(/&apos;/g, '\'').trim();
                meetings.streetAddress = $(elem).find('td').eq(0).html().split('<br>')[2].split(',').shift().concat(', New York, NY').split(' ').join('+').trim();
                // this will be written over by latLong data below
                if ($(elem).find('div').eq(0).html() !== null) {
                    meetings.notes = $(elem).find('div').eq(0).html().replace(/<br>/g,'').trim();
                }
                
                // find meeting infomration: days, times, and meeting types
                meetings.day = data[i].split('From')[0].replace(/<b>/g,'').trim();
                meetings.startTime = convertTo24Hour(data[i].split('From')[1].split('to')[0].replace(/<b>/g,'').replace(/<\/b>/g,'').trim());
                meetings.endTime = convertTo24Hour(data[i].split('to')[1].split('<br>')[0].replace(/<b>/g,'').replace(/<\/b>/g,'').trim());
                meetings.meetingType = data[i].split('Meeting Type').pop().split('<br>').shift().replace(' ','').replace(/<\/b>/g,'').replace('= ','(').replace('meeting ','meeting)').trim();
                
                meetingsData.push(meetings);
            }
        }
    });

// thanks to Joshua for this idea! should hopefully help with the DB later.
function convertTo24Hour(time) {
    var hours = time.split(':')[0];
    var minutes = time.split(':')[1].split(' ')[0];
    var period = time.split(' ')[1];
    if (period === 'PM' && hours <= 11) {
        hours = String(Number(hours) + 12);
    }
    return Number(hours + minutes);
}

    // console.log(meetingsData);
    // fs.writeFileSync('/home/ubuntu/workspace/week6/data/' + zoneNumber + '.json', JSON.stringify(meetingsData));

async.eachSeries(meetingsData, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.streetAddress + '&key=' + apiKey;
    request(apiRequest, function(err, resp, body) {
        if (err) { throw err; }
        value.latLong = JSON.parse(body).results[0].geometry.location;
        value.address = JSON.parse(body).results[0].formatted_address;
        // value.address = JSON.parse(body);
    });
    setTimeout(callback, 500);
    // console.log(apiRequest);
}, function() {
    console.log(meetingsData);
    fs.writeFileSync('/home/ubuntu/workspace/week6/data/' + zoneNumber + '.txt', JSON.stringify(meetingsData));
});




// async.eachObject(meetingsData, function(value, key, callback) {
//     var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.streetAddress + '&key=' + apiKey;
//     // var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + '501+Fifth+Street,+New+Westminster,+BC' + '&key=' + apiKey;
//     setTimeout(function() {
//     request(apiRequest, function(err, resp, body) {
//         if (err) { throw err; }
//         value.address = JSON.parse(body);
//         // value.address = JSON.parse(body).results[0].formatted_address;
//         // value.latLong = JSON.parse(body).results[0].geometry.location;
//     });
//     }, 2000);
//     // setTimeout(callback, 2000);
//     console.log(value.address);
// }, function() {
//     console.log(meetingsData);
//     fs.writeFileSync('/home/ubuntu/workspace/week6/data/' + zoneNumber + '.json', JSON.stringify(meetingsData));
// });