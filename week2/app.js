var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('/home/ubuntu/workspace/week1/zones/01.txt');

var $ = cheerio.load(content);

// find the tbody and the table row within each
$('td').find('tr').each(function(i, elem){
        // find the td equal to zero (zeroeth element is the first one)
        // then split on the break tag and take the third [2] element, trim removes whitespace
        console.log($(elem).find('td').eq(0).html().split('<br>')[2].trim());
    });