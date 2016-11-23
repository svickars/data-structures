var pg = require('pg');
var http = require('http');

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export NEW_VAR="Content of NEW_VAR variable"
// printenv | grep NEW_VAR

// connection string
var un = "sam"; // aws db username
var pw = "passwordistaco"; // aws db password
var db = "augdogsuperbowl"; // aws db database name
var ep = "augdogsuperbowl.czoqkqork3og.us-east-1.rds.amazonaws.com:5432"; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;
// console.log(conString);

var query = "SELECT * FROM superbowlIII ORDER BY dateCreated;";

var server = http.createServer(function(req, res) {

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
            
            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify(result.rows));

        }); // client.query

    }); // pg.connect

}); // server

server.listen(process.env.PORT);