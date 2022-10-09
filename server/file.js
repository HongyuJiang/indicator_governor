var fs = require("fs");
var csv = require("csvtojson");

let readCsvFile = (filepath, encoding) => {

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    return csv().fromFile(filepath)
}

module.exports = {
    readCsvFile: readCsvFile
}
