var fs = require('fs');

// QUERY MONGODB

var datetimeStart = new Date();

var dbName = 'aaDatabase';
var collName = 'meetings';

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

// Retrieve
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection(collName);

// find meetings on Tuesdays starting at 7pm or later or Wednesdays starting at 4am or earlier
    collection.aggregate([ { $match: { $or: [ { day: "Tuesdays", startTime: {$gte: 1900} }, { day: "Wednesdays", startTime: {$lte: 400} } ] } } ]).toArray(function(err, docs) {
        if (err) {console.log(err)}
        
        else {
            console.log(docs);
            fs.writeFileSync('/home/ubuntu/workspace/week6/output.json', JSON.stringify(docs)); // save results to text file
        }
        db.close();
        console.log("This process completed in", new Date() - datetimeStart, "milliseconds.");
    });
});