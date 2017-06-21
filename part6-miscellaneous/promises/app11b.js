// the classic approach with nested callbacks
var fs = require('fs');
var step1 = "/step1.json";

function readElementFromJsonFile(fileName, elementToRead, cb) {
    var elementToRetrieve = 'nextfile';
    if (elementToRead) {
        elementToRetrieve = elementToRead;
    }
    console.log('file to read from ' + fileName);
    fs.readFile(__dirname + '/' + fileName, "utf8", function (err, data) {
        var element = "";
        if (err) return cb(err);
        try {
            element = JSON.parse(data)[elementToRetrieve];
        } catch (e) {
            return cb(e);
        }
        console.log('value of element read = ' + element);
        cb(null, element);
    });
}//readElementFromJsonFile

readElementFromJsonFile(step1, null, function (err, data) {
    if (err) return err;
    readElementFromJsonFile(data, null, function (err, data) {
        if (err) return err;
        readElementFromJsonFile(data, null, function (err, data) {
            if (err) return err;
            readElementFromJsonFile(data, null, function (err, data) {
                if (err) return err;
                readElementFromJsonFile(data, 'actualValue', function (err, data) {
                    if (err) return err;
                    console.log("Final value = " + data);
                });
            });
        });
    });
});
