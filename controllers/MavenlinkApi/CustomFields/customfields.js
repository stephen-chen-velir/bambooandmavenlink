module.exports = function() {
    var customFields = {};
    customFields.getChoices = require('./choices.js');

    return customFields;
}();