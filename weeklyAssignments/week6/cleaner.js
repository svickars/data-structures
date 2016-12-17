var fs = require('fs');
var request = require('request'); // npm install request
var cheerio = require('cheerio'); // npm install cheerio

var zoneNumber = "01";
var meetingsData = [];

var content = fs.readFileSync('/home/ubuntu/workspace/week6/data/' + zoneNumber + '.json');
var content = JSON.parse(content);

var $ = cheerio.load(content);

for (var i = 0; i < content.length; i++) {
    // ignore blank items
    if (content[i] !== '') {
        var meetings = new Object;

        // find meeting information: group name, notes and location data
        meetings.groupName = content.groupName
        

        meetingsData.push(meetings);
    }
}

console.log(content);
// fs.writeFileSync('/home/ubuntu/workspace/week6/dataNew/' + zoneNumber + '.json', JSON.stringify(content));