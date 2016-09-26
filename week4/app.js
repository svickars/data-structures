// IN THE MONGO SHELL: 
//   CREATE DATABASE meetingsData AND SWITCH TO IT WITH: 
//      use meetingsData
//   CREATE COLLECTION meetings WITH: 
//      db.createCollection('meetings')
//   QUERY THE ENTIRE meetings COLLECTION WITH:
//      db.meetings.find()
//   COUNT THE NUMBER OF DOCUMENTS IN THE meetings COLLECTION WITH:
//      db.meetings.find().count()

var request = require('request');
var fs = require('fs');
var fileNumber = '10';

var meetingsData = JSON.parse(fs.readFileSync("/home/ubuntu/workspace/week3/data/locations" + fileNumber + ".txt"));
// console.log(meetingsData);

    // Connection URL
    var url = 'mongodb://' + process.env.IP + ':27017/meetingsData';

    // Retrieve
    var MongoClient = require('mongodb').MongoClient; // npm install mongodb

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}

        var collection = db.collection('meetings');

        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        for (var i=0; i < meetingsData.length; i++) {
            collection.insert({
                address: meetingsData[i].clean,
                location: meetingsData[i].latLong,
                });
            }
        db.close();

    }); //MongoClient.connect