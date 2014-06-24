/**
 *
 * ╔═╗╔═╗┌─┐┬─┐┌─┐┌┬┐┌─┐┬ ┬┌─┐┬─┐┬┌─
 + ║  ╠═╝├┤ ├┬┘├─┤│││├┤ ││││ │├┬┘├┴┐
 + ╚═╝╩  └  ┴└─┴ ┴┴ ┴└─┘└┴┘└─┘┴└─┴ ┴
 *
 * CodeProgressive Framework for Node.JS
 *
 * Arduino Yun Board Communication class
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

/*jslint node: true */
'use strict';

/*
 |--------------------------------------------------------------------------
 | Boot after everything has loaded
 |--------------------------------------------------------------------------
 |
 | Here we are sure that everything we need is properly loaded and the
 | Express server can now start booting
 |
 */

var yuncomInit = function(err, app, self) {

    if(err) {
        throw err;
    }

    app.log.info("Yun Communication : Booting...");

    // Require the "class" file
    var YuncomClass = require(__dirname + "/common/yuncomClass.js");
    // Instantiate the express object
    app.yuncom = new YuncomClass(exports.name, app);

    self.done();
};

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
exports.name = "yuncom";

// When the module is being registered
exports.onRegister = function(app) {

    // Wait for airodump before starting Yun communications!
    app.waitFor(exports.name, ["airodump-ng", "api"], yuncomInit);
};

/*
 |--------------------------------------------------------------------------
 | The boot class
 |--------------------------------------------------------------------------
 */

// Constructor
var yuncomBoot = function() {};

module.exports.boot = yuncomBoot;