var pg = require('pg');

// connection string
var un = process.env.USERNAME; // aws db username
var pw = process.env.PASSWORD; // aws db password
var db = process.env.DBNAME; // aws db database name
var ep = process.env.DBEP; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;
// console.log(conString);

var createTableQuery = "CREATE TABLE bowl (dateCreated timestamp DEFAULT current_timestamp, force numeric, resistance numeric, fullness varchar(15));"
var insertIntoQuery = "INSERT INTO bowl VALUES (DEFAULT, 195.15, 7970.98, 'half full');"
var query = "SELECT * FROM bowl;"
var complexQuery = "SELECT sum(amount) as total FROM wham GROUP BY whammy;"

pg.connect(conString, function(err, client, done) {
    if (err) {
        return console.error('error fetching client from pool', err);
    }

    client.query(query, function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if (err) {
            return console.error('error running query', err);
        }
        console.log(result.rows);
    });

});
