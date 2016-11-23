var pg = require('pg');

// connection string
var un = "sam"; // aws db username
var pw = "passwordistaco"; // aws db password
var db = "augdogsuperbowl"; // aws db database name
var ep = "augdogsuperbowl.czoqkqork3og.us-east-1.rds.amazonaws.com:5432"; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;
// console.log(conString);

var createTableQuery = "CREATE TABLE walking3 (dateCreated timestamp DEFAULT current_timestamp, force numeric, resistance numeric, fullness varchar(15));"
var insertIntoQuery = "INSERT INTO bowl VALUES (DEFAULT, 195.15, 7970.98, 'half full');"
var query = "SELECT * FROM walking2;"
var complexQuery = "SELECT sum(amount) as total FROM wham GROUP BY whammy;"

pg.connect(conString, function(err, client, done) {
    if (err) {
        return console.error('error fetching client from pool', err);
    }

    client.query(createTableQuery, function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if (err) {
            return console.error('error running query', err);
        }
        console.log(result.rows);
    });

});
