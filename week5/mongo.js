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

request('https://raw.githubusercontent.com/svickars/data-structures/master/week5/data/10.json', function(error, response, body) {
    var meetingsData = JSON.parse(body);

    // Connection URL
    var url = 'mongodb://' + process.env.IP + ':27017/meetingsData';

    // Retrieve
    var MongoClient = require('mongodb').MongoClient; // npm install mongodb

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}

        var collection = db.collection('meetings');

        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        for (var i=0; i < meetingsData.zone.length; i++) {
            collection.insert(meetingsData.zone[i]);
            }
        db.close();

    }); //MongoClient.connect

}); //request