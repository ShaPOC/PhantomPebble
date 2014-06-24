/**
 *
 * ╔═╗╔═╗┌─┐┬─┐┌─┐┌┬┐┌─┐┬ ┬┌─┐┬─┐┬┌─
 + ║  ╠═╝├┤ ├┬┘├─┤│││├┤ ││││ │├┬┘├┴┐
 + ╚═╝╩  └  ┴└─┴ ┴┴ ┴└─┘└┴┘└─┘┴└─┴ ┴
 *
 * CodeProgressive Framework for Node.JS
 *
 * Airodump-NG class
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
    OptionsClass = require(paths.__common + "options.js"),
    exec = require("child_process").exec;

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

    "monitor_interface" : "wlan1",
    "dump_file" : "var/temp/airodump.log"
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
var airodumpNGClass = function(name) {

    // Merge the default options with the options set in the config file
    this.options = new OptionsClass(name).merge(default_options);
};

airodumpNGClass.prototype.startAirodumpToFile = function(intface, filename, callback) {

    this.createMonitor(intface, function(err, result){


    });
}

/*
 |--------------------------------------------------------------------------
 | Create the monitor
 |--------------------------------------------------------------------------
 */
airodumpNGClass.prototype.createMonitor = function(intface, callback) {

    this.ifConfig(function(err, result){

        // something went wrong?
        if(err) {
            return console.log(err, result);
        }

        // Does the interface exist?
        if(typeof result[intface] === 'undefined') {
            return console.log("The selected interface " + intface + " is not available. Aborting monitor mode.");
        }

        exec("airmon-ng start " + intface, function(err, stdout, stderr){

            if (err) {

                callback(err, stderr);

            } else {

                // Get the monitor interface name
                var start = stdout.substr(stdout.lastIndexOf("(monitor mode enabled on ")),
                    mon = start.substr(0, start.lastIndexOf(")"));

                // Return the monitor name and no error
                callback(null, mon);
            }
        });

    });
}

/*
 |--------------------------------------------------------------------------
 | Check IFConfig and return a JSON object with the result
 |--------------------------------------------------------------------------
 */
airodumpNGClass.prototype.ifConfig = function(callback) {

    exec("ifconfig", function (err, stdout, stderr) {

        if (err) {

            callback(err, stderr);

        } else {

            // ifconfig emits a kind of mish-mash formats, the following gobbledygook turns that into nested objects in
            // a (hopefully) intuitive way (see sample below).
            var results = stdout.split('\n').reduce(function (a, line) {

                if (/^\t/.test(line)) { // tabs indicate "features" of previous unindented line
                    a[a.length - 1].push(line.replace(/^\t/,'').trim());
                } else if (line) {
                    a.push(line.split(':').map(function (s) { return s.trim(); })); // unindented lines start with a name followed by a :
                }

                return a;

            }, []).reduce(function (o, a) {

                o[a.shift()] = a.map(function (l) {
                    return l.match(/^([^ =:]+)[ =:](?:[ ]?)(.*)$/).slice(1,3); // indented lines start with a name followed by a space, :, or =
                }).reduce(function (p,b) {

                    p[b[0]] = b[1];
                    return p;

                }, {});
                return o;

            }, {});

            callback(null, results);
        }
    });
}

/*
 |--------------------------------------------------------------------------
 | The initialisation of the connection
 |--------------------------------------------------------------------------
 */
airodumpNGClass.prototype.init = function(callback) {


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
airodumpNGClass.prototype.destroy = function() {

    // Close the database connection gracefully

};

// Export the module!
module.exports = airodumpNGClass;