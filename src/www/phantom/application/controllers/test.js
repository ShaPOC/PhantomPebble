/**
 *
 * ╔═╗╔═╗┌─┐┬─┐┌─┐┌┬┐┌─┐┬ ┬┌─┐┬─┐┬┌─
 + ║  ╠═╝├┤ ├┬┘├─┤│││├┤ ││││ │├┬┘├┴┐
 + ╚═╝╩  └  ┴└─┴ ┴┴ ┴└─┘└┴┘└─┘┴└─┴ ┴
 *
 * CodeProgressive Framework for Node.JS
 *
 * PhantomPebble
 *
 * CONTROLLER FILE - dashboard
 *
 * @author Jimmy Aupperlee <jimmy@codeprogressive.com>
 * @copyright codeProgressive
 */

/*jslint node: true */
'use strict';

/*
 |--------------------------------------------------------------------------
 | Constructor
 |--------------------------------------------------------------------------
 */
var testController = function(model, view) {
    // Insert the model object into the object
    this.model = model;
    // Insert the view object into the object
    this.view = view;
};

testController.prototype.index = function() {

    return this.view.send(404, "<h1>It works!</h1>");
};

// Export the module!
module.exports = testController;