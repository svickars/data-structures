var fs = require('fs');
var address = [];

var addList = fs.readFileSync('/home/ubuntu/workspace/week3/data/meetings01.txt').toString().replace('["','').replace('"]','').split('","');


for (var i = 0; i < addList.length; i++) {
    address.push(addList[i]
    .substring(0, addList[i].indexOf(','))
    .concat(', New York, NY')
    .split(' ').join('+'));
}

for (var i = 0; i < address.length; i++) {
    console.log(address[i]);
}