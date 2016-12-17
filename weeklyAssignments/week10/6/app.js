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

        var collection = db.collection(collName);

        // find meetings on Tuesdays starting at 7pm or later
        collection.aggregate([{
                $match: {
                    $and: [{
                        day: searchDay,
                        startTime: {
                            $gte: searchTime
                        }
                    }]
                }
            }, {
                $group: {
                    _id: {
                        locationName: "$locationName",
                        address: "$address",
                        notes: "$notes",
                        latLong: "$latLong"
                    },
                    meetings: {
                        $push: {
                            groupName: "$groupName",
                            type: "$type",
                            meetingDay: "$day",
                            startTime: "$startTime",
                            endTime: "$endTime"
                        }
                    }
                }
            }])
            .toArray(function(err, docs) {
                if (err) {
                    console.log(err)
                }

                else {
                    // console.log(docs);
                    results.push(docs);
                    console.log(results);
                    // fs.writeFileSync('/home/ubuntu/workspace/week6/output.txt', JSON.stringify(docs)); // save results to text file
                    res.writeHead(200, {
                        'content-type': 'application/json'
                    });
                    res.end(JSON.stringify(docs));
                }
                db.close();
                // console.log("This process completed in", new Date() - datetimeStart, "milliseconds.");
            });
    });
});

server.listen(process.env.PORT);