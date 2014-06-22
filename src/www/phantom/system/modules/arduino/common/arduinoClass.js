/**
 *
 * ╔═╗╔═╗┌─┐┬─┐┌─┐┌┬┐┌─┐┬ ┬┌─┐┬─┐┬┌─
 + ║  ╠═╝├┤ ├┬┘├─┤│││├┤ ││││ │├┬┘├┴┐
 + ╚═╝╩  └  ┴└─┴ ┴┴ ┴└─┘└┴┘└─┘┴└─┴ ┴
 *
 * CodeProgressive Framework for Node.JS
 *
 * Arduino Board class
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

/*jslint node: true */
'use strict';

/*
 |--------------------------------------------------------------------------
 | Required modules
 |--------------------------------------------------------------------------
 */

var paths        = require('../../../includes/paths.js'),
    OptionsClass = require(paths.__common + "options.js");

/*
 |--------------------------------------------------------------------------
 | Default options object
 |--------------------------------------------------------------------------
 |
 | This object will be used to create a new config file when one doesn't
 | exist already inside the root/config folder. It will also be
 | used to define the default values of these options.
 |
 */

var default_options = {

    databases : [
        {
            dbName : "",
            dbHost : "",
            dbUser : "",
            dbPass : ""
        }
    ]
};

/*
 |--------------------------------------------------------------------------
 | The constructor
 |--------------------------------------------------------------------------
 |
 | Instantiate some variables and use the options object to merge the
 | default options above with options inside the configuration file with
 | the same name as the module
 |
 */
var arduinoClass = function(name) {

    // Merge the default options with the options set in the config file
    this.options = new OptionsClass(name).merge(default_options);
};

/*
 |--------------------------------------------------------------------------
 | The initialisation of the database connection
 |--------------------------------------------------------------------------
 |
 |
 |
 */
arduinoClass.prototype.init = function(callback) {

    callback(null);
};
/*
 |--------------------------------------------------------------------------
 | Destroy function
 |--------------------------------------------------------------------------
 |
 | Will be triggered at the end of the thread to close the connection
 | gracefully.
 |
 */
arduinoClass.prototype.destroy = function() {

    // Close the database connection gracefully

};

// Export the module!
module.exports = arduinoClass;