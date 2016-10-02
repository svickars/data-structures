// QUERY MONGODB

var datetimeStart = new Date();

var dbName = 'citibike';
var collName = 'stations';

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

var stationsAbove96 = [];

// Retrieve
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection(collName);
// $gt = greater than
    collection.find({ latitude: { $gt : 40.783067 } }).toArray(function(err, docs) {
        if (err) {console.log(err)}
        
        else {
            stationsAbove96.push(docs);
            console.log(stationsAbove96);
        }
        db.close();
        console.log("This process completed in", new Date() - datetimeStart, "milliseconds.");
    });
});