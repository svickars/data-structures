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
var fileNumber = '01';
var content = fs.readFileSync("/home/ubuntu/workspace/week5/data/" + fileNumber + ".json");

var meetingsData = JSON.parse(content);
console.log(meetingsData);

    // Connection URL
    var url = 'mongodb://' + process.env.IP + ':27017/meetingsData';

    // Retrieve
    var MongoClient = require('mongodb').MongoClient; // npm install mongodb

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}

        var collection = db.collection('meetings');

        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        for (var i=0; i < meetingsData.length; i++) {
            collection.insert(meetingsData[i].zone);
            }
        db.close();

    }); //MongoClient.connect