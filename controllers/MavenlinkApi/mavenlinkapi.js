﻿module.exports = function() {
    'use strict';

    var api = {};
    api.authenticate = require('./Authentication/Authentication.js');
    api.customFields = require('./CustomFields/customfields.js');
    api.workspace = require('./Workspace/workspace.js');
    
    return api;
}();