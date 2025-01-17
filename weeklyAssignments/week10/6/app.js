var pg = require('pg');
var http = require('http');
var dbName = 'aaDatabase';
var collName = 'meetings';
var results = [];

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

var searchDay = "Sundays",
    searchTime = 900;

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
        var today = weekday[today] + "s";
        var tomorrow = weekday[tomorrow] + "s";
        

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
                                $lte: 4
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
                res.writeHead(200, {
                        'content-type': 'application/json'
                    });
                res.end(JSON.stringify(docs));
            }
            db.close();
        });
    });
});

server.listen(process.env.PORT);