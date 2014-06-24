/**
 *
 * ╔═╗╔═╗┌─┐┬─┐┌─┐┌┬┐┌─┐┬ ┬┌─┐┬─┐┬┌─
 + ║  ╠═╝├┤ ├┬┘├─┤│││├┤ ││││ │├┬┘├┴┐
 + ╚═╝╩  └  ┴└─┴ ┴┴ ┴└─┘└┴┘└─┘┴└─┴ ┴
 *
 * CodeProgressive Framework for Node.JS
 *
 * Airodump-NG module
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
exports.name = "airodump-ng";

// When the module is being registered
exports.onRegister = function(app) {

    app.log.info("Airodump-ng : Booting...");

    // Require the "class" file
    var AirodumpNGClass = require(__dirname + "/common/airodump-ngClass.js");
    // Instantiate the mongodb object
    app.arduino = new AirodumpNGClass(exports.name);
};


/*
 |--------------------------------------------------------------------------
 | The boot class
 |--------------------------------------------------------------------------
 */

// Constructor
var airodumpNGBoot = function(app) {

    var self = this;

    app.arduino.init(function(err){

        if(err) {
            throw err;
        }

        app.log.info("Airodump-ng : Sucessfully booted...");

        self.done();
    });

};

module.exports.boot = airodumpNGBoot;