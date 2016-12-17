var fs = require('fs');

// QUERY MONGODB

var datetimeStart = new Date();

var dbName = 'aaDatabase';
var collName = 'meetings';

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection(collName);

    collection.aggregate([ { $match: { $or: [ { day: "Tuesdays", startTime: {$gte: 1900} }, { day: "Wednesdays", startTime: {$lte: 400} } ] } } ]).toArray(function(err, docs) {
        if (err) {console.log(err)}
        
        else {
            var meetings = docs;
            console.log(meetings[0].groupName);
        }
        db.close();
    });
});