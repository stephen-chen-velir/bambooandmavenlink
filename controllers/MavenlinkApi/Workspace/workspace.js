module.exports = function() {
    'use strict';

    var workspace = {};
    
    workspace.search = require('./searchcontroller.js');
    workspace.edit = require('./editcontroller.js');
    return workspace;
}();