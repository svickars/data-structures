var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('/home/ubuntu/workspace/week1/zones/01.txt');

var $ = cheerio.load(content);

// Print to console: text from all td elements with style below... where to go from here?! This finds content on either side of the address. How to narrow it down?
$('td').each(function(i, elem) {
    if($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px") {
            $(elem).find('br').next().each(function(i, elem) {
            console.log($(elem).text());
        });
    }
})

