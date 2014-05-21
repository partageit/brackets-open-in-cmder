/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

// Re-indent the open document according to your current indentation settings.
define(function (require, exports, module) {
	"use strict";

	var NodeDomain     = brackets.getModule("utils/NodeDomain"),
			ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
			CommandManager = brackets.getModule("command/CommandManager"),
			Menus          = brackets.getModule("command/Menus"),
			ProjectManager = brackets.getModule("project/ProjectManager"),
			COMMAND_ID     = "openincmder.open";

	var openInCmderDomain = new NodeDomain("openInCmder", ExtensionUtils.getModulePath(module, "node/OpenInCmderDomain"));

	var openInCmder = function() {
		console.log("Entering in openInCmder");
		//var entry = ProjectManager.getSelectedItem();
		var entry = ProjectManager.getProjectRoot();
		if (entry) {
			console.log("Entering in openInCmder, path: '" + entry.fullPath + "'");
			openInCmderDomain.exec("startCmder", entry.fullPath)
				.done(function () {
					console.log("cmder successfully started, showing : '" + entry.fullPath + "'");
				})
				.fail(function(err) {
					console.error("Error showing '" + entry.fullPath + "' in cmder:", err);
				});
		}
		console.log("openInCmder end");

	};

	CommandManager.register("Open in cmder", COMMAND_ID, openInCmder);

	var menu1 = Menus.getContextMenu(Menus.ContextMenuIds.PROJECT_MENU);
	menu1.addMenuItem(COMMAND_ID /*, [{ "key": "Ctrl-Alt-I" }, { "key": "Ctrl-Alt-I", "platform": "mac" }]*/);
	var menu2 = Menus.getContextMenu(Menus.ContextMenuIds.WORKING_SET_MENU);
	menu2.addMenuItem(COMMAND_ID);
	/*var menu3 = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
	menu3.addMenuItem(COMMAND_ID);*/
});
