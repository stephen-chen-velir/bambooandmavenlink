module.exports = function() {
    var dataimporter = {};
    dataimporter.csv = require('./csvuploader.js');
    return dataimporter;
}();