/**
 *
 * ╔═╗╔═╗┌─┐┬─┐┌─┐┌┬┐┌─┐┬ ┬┌─┐┬─┐┬┌─
 + ║  ╠═╝├┤ ├┬┘├─┤│││├┤ ││││ │├┬┘├┴┐
 + ╚═╝╩  └  ┴└─┴ ┴┴ ┴└─┘└┴┘└─┘┴└─┴ ┴
 *
 * CodeProgressive Framework for Node.JS
 *
 * Arduino Board control module
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

/*jslint node: true */
'use strict';

/*
 |--------------------------------------------------------------------------
 | Pre-class definitions
 |--------------------------------------------------------------------------
 |
 | Here we define some variables and methods required before the module
 | and adjacent class is actually loaded.
 |
 */

// The name of the module
exports.name = "arduino";

// When the module is being registered
exports.onRegister = function(app) {

    app.log.info("Arduino : Booting...");

    // Require the "class" file
    var ArduinoClass = require(__dirname + "/common/arduinoClass.js");
    // Instantiate the mongodb object
    app.arduino = new ArduinoClass(exports.name);
};


/*
 |--------------------------------------------------------------------------
 | The boot class
 |--------------------------------------------------------------------------
 */

// Constructor
var arduinobBoot = function(app) {

    var self = this;

    app.arduino.init(function(err){

        if(err) {
            throw err;
        }

        app.log.info("Arduino : Sucessfully booted...");

        self.done();
    });

};

module.exports.boot = arduinobBoot;