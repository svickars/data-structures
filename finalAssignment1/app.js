// QUERY MONGODB

var dbName = 'aaDatabase';
var collName = 'meetings';

var http = require("http");
var fs = require("fs");
var dateFormat = require('dateformat');

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

var index1 = fs.readFileSync("index1.txt");
var index3 = fs.readFileSync("index3.txt");

// Retrieve
var MongoClient = require('mongodb').MongoClient;

var server = http.createServer(function(req, res) {

    MongoClient.connect(url, function(err, db) {
        if (err) {
            return console.dir(err);
        }

        var dateTimeNow = new Date();
        var today = dateTimeNow.getDay();
        var tomorrow;
        if (today == 6) {
            tomorrow = 0;
        }
        else {
            tomorrow = today + 1
        }
        var hour = (dateTimeNow.getHours() - 5) * 100;
        
        var weekday = new Array(7);
        weekday[0] =  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        
        today = weekday[today] + "s";
        tomorrow = weekday[tomorrow] + "s";
        

        // var dateTimeNow = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
        // var today = dateFormat(dateTimeNow, "dddd");
        // var hour = dateFormat(dateTimeNow, "HH");
        
        // var weekday = new Array(7);
        // weekday["Saturday"] =  "Sunday";
        // weekday["Sunday"] = "Monday";
        // weekday["Monday"] = "Tuesday";
        // weekday["Tuesday"] = "Wednesday";
        // weekday["Wednesday"] = "Thursday";
        // weekday["Thursday"] = "Friday";
        // weekday["Friday"] = "Saturday";
        
        // var tomorrow = weekday[today];


        // today = today + "s";
        // tomorrow = tomorrow + "s";
        // hour = hour * 100
        
        // console.log(today + " (" + tomorrow + "): " + hour)

        var collection = db.collection(collName);

        collection.aggregate([ // start of aggregation pipeline
            // match by day and time
            {
                $match: {
                    $or: [{
                        $and: [{
                            day: today
                        }, {
                            startTime: {
                                $gte: hour
                            }
                        }]
                    }, {
                        $and: [{
                            day: tomorrow
                        }, {
                            startTime: {
                                $lte: 400
                            }
                        }]
                    }]
                }
            },

            // group by meeting group
            {
                $group: {
                    _id: {
                        latLong: "$latLong",
                        meetingName: "$groupName",
                        locationName: "$locationName",
                        meetingAddress: "$address",
                        meetingDetails: "$notes",
                    },
                    meetingDay: {
                        $push: "$day"
                    },
                    meetingStartTime: {
                        $push: "$startTime"
                    },
                    meetingType: {
                        $push: "$meetingType"
                    }
                }
            },

            // group meeting groups by latLong
            {
                $group: {
                    _id: {
                        latLong: "$_id.latLong"
                    },
                    meetingGroups: {
                        $push: {
                            groupInfo: "$_id",
                            meetingDay: "$meetingDay",
                            meetingStartTime: "$meetingStartTime",
                            meetingType: "$meetingType"
                        }
                    }
                }

        }]).toArray(function(err, docs) { // end of aggregation pipeline
            if (err) {
                console.log(err)
            }

            else {
                // res.writeHead(200, {
                //         'content-type': 'application/json'
                //     });
                // res.end(JSON.stringify(docs));
                res.writeHead(200, {
                    'content-type': 'text/html'
                });
                res.write(index1);
                res.write(JSON.stringify(docs));
                res.end(index3);
            }
            db.close();
        });
    });
});

server.listen(process.env.PORT);