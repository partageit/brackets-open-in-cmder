(function () {
	"use strict";

	var exec = require("child_process").exec;

	function cmdStartCmder(path) {
		console.log("In cmdStartCmder, path: '" + path + "'");
		exec("cmder \"" + path + "\"");
		return true;
	}

	function init(domainManager) {
		if (!domainManager.hasDomain("openInCmder")) {
			domainManager.registerDomain("openInCmder", {major: 0, minor: 1});
		}
		domainManager.registerCommand(
			"openInCmder", // domain name
			"startCmder", // command name
			cmdStartCmder, // command handler function
			false, // this command is synchronous in Node
			"Starts cmder, which should be defined in the PATH environment variable",
			[{name: "path", // parameters
				type: "string",
				description: "The starting path, the most often: the project folder path"}],
			[] // return value
		);
	}

	exports.init = init;

}());