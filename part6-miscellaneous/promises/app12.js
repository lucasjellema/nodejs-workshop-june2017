var fs = require('fs');
var step1 = "step1.json";

function readElementFromJsonFile(fileName, elementToRead) {
    return new Promise((resolve, reject) => {
        var elementToRetrieve = 'nextfile';
        if (elementToRead) {
            elementToRetrieve = elementToRead;
        }
        console.log('file to read from ' + fileName);
        fs.readFile(__dirname + '/' + fileName, "utf8", function (err, data) {
            var element = "";
            if (err) return callback(err);
            try {
                element = JSON.parse(data)[elementToRetrieve];
            } catch (e) {
                return callback(e);
            }
            console.log('element read = ' + element);
            resolve(element);
        });
    })// promise
}

readElementFromJsonFile(step1)
    .then(readElementFromJsonFile)
    .then(readElementFromJsonFile)
    .then(readElementFromJsonFile)
    .then(function (filename) { return readElementFromJsonFile(filename, 'actualValue') })
    .then(function (value) { console.log('Value read after processing five files = ' + value); })
