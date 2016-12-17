// IN THE MONGO SHELL: 
//   CREATE DATABASE citibike AND SWITCH TO IT WITH: 
//      use meetingsData
//   CREATE COLLECTION stations WITH: 
//      db.createCollection('meetings')
//   QUERY THE ENTIRE stations COLLECTION WITH:
//      db.meetings.find()
//   COUNT THE NUMBER OF DOCUMENTS IN THE stations COLLECTION WITH:
//      db.meetings.find().count()

var request = require('request');
var fs = require('fs');
var zoneNumber = '10';

var data = fs.readFileSync('/home/ubuntu/workspace/week6/data/' + zoneNumber + '.json');
var meetingsData = JSON.parse(data);

    // Connection URL
    var url = 'mongodb://' + process.env.IP + ':27017/aaDatabase';

    // Retrieve
    var MongoClient = require('mongodb').MongoClient; // npm install mongodb

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}

        var collection = db.collection('meetings');

        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        for (var i=0; i < meetingsData.length; i++) {
            collection.insert(meetingsData[i]);
            }
        db.close();

    }); //MongoClient.connect

