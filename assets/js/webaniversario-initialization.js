/**
 * Init Script
 * Initializes Stuff
 * By Arthur Annibal - WebAniversario
 * Version 0.0.0
 */

verbose("Initializing...");
var wNiver = {}
var i=0;
var isCheckOK = true;

if (typeof utils != "undefined") {
	wNiver.utils = utils;
	delete utils;
	verbose("Checking utility functions . . . ok");
} else {
	verbose("Checking utility functions . . . failed");
}

if (typeof jQuery == "undefined") {isCheckOK = false; throw "jQuery is not defined."}
if (typeof angular == "undefined") {isCheckOK = false; throw "Angular is not defined."}
if (isCheckOK) { verbose("Checking libraries . . . ok");} else {verbose("Checking libraries . . . failed");}

structure = {
	menu : jQuery("#menu"),
	main : jQuery("#main"),
	messageContainer : jQuery("#message-container"),
	header : jQuery("#header"),
	content : jQuery("#content"),
	pageOptions : jQuery("#page-options"),
	pageOptionsRight : jQuery("#page-options-right"),
	pageOptionsLeft : jQuery("#page-options-left"),
	contentInner : jQuery("#content-inner"),
	modalContainer: jQuery("#modal-container"),
	backgroundContainer : jQuery("#background-container"),
	backgroundInner : jQuery("#background-inner"),
}

isCheckOK = true;
for (i in structure) {
	if (structure[i].length == 0) {
		verbose("( ! ) WARNING: "+i+" was not found.");
		isCheckOK = false
	}
}

wNiver.structure = structure;
delete structure;
if (isCheckOK) { verbose("Checking structure reference . . . ok");} else {verbose("Checking structure reference . . . failed");}


verbose("Initialization complete.")


jQuery(function() {
	verbose("Document loaded.");
	
	wNiver.attributes = {
		width: document.body.clientWidth,
		height: document.body.clientHeight
	}
	verbose ("Width: "+document.body.clientWidth, "Height: "+document.body.clientHeight);
	
	if (typeof wNiver.backgrounder != "undefined") wNiver.backgrounder.initialize();
	if (typeof wNiver.feedbackzator != "undefined") wNiver.feedbackzator.initialize();
	if (typeof wNiver.formzator != "undefined") wNiver.formzator.initialize();
	if (typeof wNiver.menuzator != "undefined") wNiver.menuzator.initialize();
});



