var filehelper = function(filename, fn) {
    var content;
    var fs = require('fs');
    fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        content = data;
        fn(data);
    });
    return content;
}

module.exports = filehelper;
