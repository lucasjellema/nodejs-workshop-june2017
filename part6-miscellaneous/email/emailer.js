var email = require('emailjs');
/* http://javascript.tutorialhorizon.com/2015/07/02/send-email-node-js-express/ */


// configure details for your mail server account
var sendMailAccount = "yourmailaccount";
var sendMailPassword = "yourpasswordformailaccount";
// for example for gmail
var mailServerHost = "smtp.gmail.com";

var emailerAPI = module.exports;

emailerAPI.sendEmail = function(subject, body, addressees, bodytext) {
    console.log("Send email " + subject + " to:" + addressees);
    var server = email.server.connect({
        user: sendMailAccount,
        password: sendMailPassword,
        host: mailServerHost,
        ssl: true
    });
    console.log("connected to mail server");
    // send the message and get a callback with an error or details of the message that was sent
    var sendEmail = {
        text: bodytext,
        from: sendMailAccount,
        to: addressees,
        cc: sendMailAccount,
        subject: subject,
        attachment:
        [
            { data: body, alternative: true },

        ]
    };
    if (!body || body == null) {
        console.log("no html body, resort to text");
        sendEmail.attachment = [];
    }
    server.send(sendEmail, function (err, message) {
        if (err) {
            console.log("*** Emailer: email sending failed: " + JSON.stringify(err));
        }
        else {
            console.log("*** Emailer: email was sent: " + JSON.stringify(message));
        }
        return err;
    });

}// sendEmail
