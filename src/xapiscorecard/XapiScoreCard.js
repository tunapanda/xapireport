var fs = require("fs");
var TinCan = require("tincanjs");
var Thenable = require("tinp");
var ArrayUtil = require("../utils/ArrayUtil");

/**
 * xAPI Scorecard.
 */
function XapiScoreCard() {}

/**
 * Load configuration.
 * @method loadConfig
 */
XapiScoreCard.prototype.loadConfig = function(fn) {
	var content = fs.readFileSync(fn);
	var data = JSON.parse(content);
	this.parseConfig(data);
}

/**
 * Parse config
 * @method parseConfig
 */
XapiScoreCard.prototype.parseConfig = function(config) {
	this.tinCan = new TinCan({
		recordStores: [{
			endpoint: config.xapiEndpoint,
			username: config.xapiUsername,
			password: config.xapiPassword,
			allowFail: false
		}]
	});
}

/**
 * Run.
 * @method run.
 */
XapiScoreCard.prototype.run = function() {
	this.runThenable = new Thenable();
	this.tinCan.getStatements({
		params: {},
		callback: this.onGetStatements.bind(this)
	});

	return this.runThenable;
}

/**
 * On get statement.
 * @method onGetStatements
 */
XapiScoreCard.prototype.onGetStatements = function(err, result) {
	if (err) {
		this.runThenable.reject(err);
		return;
	}

	this.actors = [];

	var statements = result.statements;
	for (var i = 0; i < statements.length; i++) {
		var statement = statements[i];
		var email = statement.actor.mbox;

		if (!ArrayUtil.contains(this.actors, email))
			this.actors.push(email);
	}

	console.log(this.actors);
}

module.exports = XapiScoreCard;