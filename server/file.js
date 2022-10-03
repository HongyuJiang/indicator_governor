var fs = require("fs");
var csv = require("csvtojson");

let readCsvFile = (filepath, encoding) => {

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    let file = fs.readFileSync(filepath, encoding);
    let text = file.toString('utf-8')
    
    return csv().fromString(text);
}

let readCsvFile2 = (filepath, encoding) => {

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    return csv().fromFile(filepath)
}

module.exports = {
    readCsvFile: readCsvFile2
}
