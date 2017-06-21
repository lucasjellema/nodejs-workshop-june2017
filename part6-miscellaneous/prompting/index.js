var prompt = require('prompt');

// 
// Start the prompt 
// 
prompt.start();

// 
// Get two properties from the user: username and email 
// 
prompt.get(['username', 'email'], function (err, result) {
    // 
    // Log the results. 
    // 
    console.log('Command-line input received:');
    console.log('  username: ' + result.username);
    console.log('  email: ' + result.email);
    promptForInput();
});

var timeToExit = false;

var allInput = [];

function promptForInput() {
    prompt.get(['yourInput'], function (err, result) {
        // 
        // Log the results. 
        // 
        console.log('Your Input:' + result.yourInput);
        timeToExit = ('exit' == result.yourInput)
        if (timeToExit) {
            wrapItUp();
        }
        else {
            allInput.push(result.yourInput);
            promptForInput();
        }
    });
}

function wrapItUp() {
    console.log('It was nice talking to you. Goodbye!');
    // final recap of the dialog:
    console.log("All your input:\n "+JSON.stringify(allInput));
}

