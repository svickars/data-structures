var five = require("johnny-five");
var pg = require('pg');

// connection string
var un = process.env.USERNAME; // aws db username
var pw = process.env.PASSWORD; // aws db password
var db = process.env.DBNAME; // aws db database name
var ep = process.env.DBEP; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;
// console.log(conString);

var fsr, led, force, fsrG, fsrR, fsrADC, fsrV;
var VCC = 4.98;
var R_DIV = 3230.0;

new five.Board().on("ready", function() {

  // Create a new `fsr` hardware instance.
  fsr = new five.Sensor({
    pin: "A0",
    freq: 1000
  });

  fsr.on("change", function() {
    var fsrADC = this.value;
    if (fsrADC != 0)
    {
        fsrV = fsrADC * VCC / 1023.0;
        fsrR = R_DIV * (VCC / fsrV - 1.0);
        fsrG = 1.0 / fsrR;
        if (fsrR <= 600)
          force = (fsrG - 0.00075) / 0.00000032639;
        else
          force = fsrG / 0.000000642857;
        console.log("resistance: " + fsrR + " ohms ");
        console.log("force: " + force + " g");

        // var createTableQuery = "CREATE TABLE walking (dateCreated timestamp DEFAULT current_timestamp, force numeric, resistance numeric);"
        var insertIntoQuery = "INSERT INTO walking VALUES (DEFAULT, " + force + ", " + fsrR + ");"

        pg.connect(conString, function(err, client, done) {
          if(err) {
            return console.error('error fetching client from pool', err);
          }

            client.query(insertIntoQuery, function(err, result) {
                //call `done()` to release the client back to the pool
                done();

                if(err) {
                  return console.error('error running query', err);
                }
            }); //end client.query
        }); //end pg connect
    }
  });
})
