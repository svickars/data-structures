// IN THE MONGO SHELL: 
//   CREATE DATABASE citibike AND SWITCH TO IT WITH: 
//      use citibike
//   CREATE COLLECTION stations WITH: 
//      db.createCollection('stations')
//   QUERY THE ENTIRE stations COLLECTION WITH:
//      db.stations.find()
//   COUNT THE NUMBER OF DOCUMENTS IN THE stations COLLECTION WITH:
//      db.stations.find().count()

var request = require('request');
var fs = require('fs');


    var addressData = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/week3/data/locations01.txt'));
    console.log(addressData);

    // // Connection URL
    // var url = 'mongodb://' + process.env.IP + ':27017/aameetingslocation';

    // // Retrieve
    // var MongoClient = require('mongodb').MongoClient; // npm install mongodb

    // MongoClient.connect(url, function(err, db) {
    //     if (err) {return console.dir(err);}

    //     var collection = db.collection('addresses');

    //     // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
    //     for (var i=0; i < addressData.addressBeanList.length; i++) {
    //         collection.insert(addressData.addressBeanList[i]);
    //         }
    //     db.close();

    // }); //MongoClient.connect