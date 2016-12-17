var five = require("johnny-five"),
  fsr, force, fsrG, fsrR, fsrADC, fsrV;

var VCC = 4.98;
var R_DIV = 3230.0;

(new five.Board()).on("ready", function() {

  // Create a new `fsr` hardware instance.
  fsr = new five.Sensor({
    pin: "A0",
    freq: 1000
  });

    fsr.on("change", function() {
      var fsrADC = this.value; //raw value from sensor, if no pressure resistance will be near infinite, so:
      if (fsrADC != 0)
      {
        // calculate voltage
        fsrV = fsrADC * VCC / 1023.0;
        // calculate resistance
        fsrR = R_DIV * (VCC / fsrV - 1.0);
        // calculate conductance
        fsrG = 1.0 / fsrR;
        // calculate foce based on two linear slopes
        if (fsrR <= 600)
          force = (fsrG - 0.00075) / 0.00000032639;
        else
          force = fsrG / 0.000000642857;
        // display results in ohms and grams
        console.log("resistance: " + fsrR + " ohms ");
        console.log("force: " + force + "g");
      }
    });
});
