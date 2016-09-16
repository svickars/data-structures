// var x = '50 Perry Street, Ground Floor,';

// var x2 = x.substring(0, x.indexOf(','));

// var x3 = x2 + ', New York, NY';

// var x4 = x3.split(' ').join('+');

// console.log(x4);

var fs = require('fs');
var data = [];
var address = [];

var addList = fs.readFileSync('/home/ubuntu/workspace/week3/data/meetings01.txt').toString().replace('["','').replace('"]','').split('","');


for (var i = 0; i < addList.length; i++) {
    address.push(addList[i]
    .substring(0, addList[i].indexOf(','))
    .split(' ').join('+'));
}

for (var i = 0; i < address.length; i++) {
    console.log(address[i] + ',+New York,+NY');
}

// var x3 = x2 + ', New York, NY';
// var x4 = x3.split(' ').join('+');


// for (var i = 0; i < data.length; i++) {
//     address.push(data[i]
//         // splits everything separated by a line break ('\n') into an array of substrings and selects item [3] where the address is placed 
//         .split('\n')[3]
//         // splits everything separated by a ',' into an array of substrings and selects item [0] which is the address
//         .split(',')[0]
//         // splits everything separated by a '- ' into an array of substrings (added a space because some addresses go like 206-208 East 11th Street)
//         .split('- ')[0]
//         // splits everything separated by a '(' into an array of substrings as ome addresses have additional info wraped in parentheses '()' 
//         .split('(')[0]
//         // removes all whitespace
//         .trim());
// }

// // show all addresses in console
// for (var i = 0; i < address.length; i++) {
//     console.log(address[i]);
// }


// console.log(addList);