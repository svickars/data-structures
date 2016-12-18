var pg = require('pg');
var fs = require('fs');

// connection string
var un = "sam"; // aws db username
var pw = "passwordistaco"; // aws db password
var db = "augdogsuperbowl"; // aws db database name
var ep = "augdogsuperbowl.czoqkqork3og.us-east-1.rds.amazonaws.com:5432"; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;
// var un = process.env.USERNAME; // aws db username
// var pw = process.env.PASSWORD; // aws db password
// var db = process.env.DBNAME; // aws db database name
// var ep = process.env.DBEP; // aws db endpoint
// var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;

var query = "SELECT * FROM superbowlIII ORDER BY dateCreated;"

pg.connect(conString, function(err, client, done) {
    if (err) {
        return console.error('error fetching client from pool', err);
    }

    client.query(query, function(err, result) {
        done();

        if (err) {
            return console.error('error running query', err);
        }
        console.log(result.rows);
        fs.writeFileSync('/home/ubuntu/workspace/weeklyAssignments/week9/testOutput.json', JSON.stringify(result.rows)); // save results to text file
    });

});
