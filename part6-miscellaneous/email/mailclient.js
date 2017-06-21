var emailerAPI = require("./emailer.js");

var subject = "Test Message";
var body = "<h1>Hello</h1>";
var addressees = "lucas.jellema@amis.nl";
var bodytext = "";

emailerAPI.sendEmail(subject, body, addressees, bodytext)