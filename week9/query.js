var pg = require('pg');
var fs = require('fs');

// connection string
var un = process.env.USERNAME; // aws db username
var pw = process.env.PASSWORD; // aws db password
var db = process.env.DBNAME; // aws db database name
var ep = process.env.DBEP; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;


var query = "SELECT * FROM superbowlII ORDER BY dateCreated;"

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
        // fs.writeFileSync('/home/ubuntu/workspace/week9/testOutput.txt', results.rows); // save results to text file
    });

});
