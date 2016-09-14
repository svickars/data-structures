var fs = require('fs');
var cheerio = require('cheerio'); // npm install cheerio

var content = fs.readFileSync('/home/ubuntu/workspace//week1/zones/10.txt');
// create an empty array
var meetings = [];

var $ = cheerio.load(content);

// find the tbody and the table row within each
$('tbody').find('tr').each(function(i, elem){
        // find the td equal to zero (zeroeth element is the first one)
        // then split on the break tag and take the third [2] element, trim removes whitespace
        meetings.push($(elem).find('td').eq(0).html().split('<br>')[2].trim());
    });

console.log(meetings.length); // print number of meetings in meetings array
fs.writeFileSync('/home/ubuntu/workspace/week3/data/meetings10.txt', JSON.stringify(meetings));