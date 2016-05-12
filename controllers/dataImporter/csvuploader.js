module.exports = function() {
    var csvModule = {};
    var mavenlinkApi = require('../MavenlinkApi/mavenlinkapi.js');
    var fieldMapper = [
        { cvsField: 'archived', mlField: 'archived' },
        { cvsField: 'budgeted', mlField: 'budgeted' },
        { cvsField: 'Currency', mlField: 'currency' },
        { cvsField: 'Description', mlField: 'description' },
        { cvsField: 'Due Date', mlField: 'due_date' },
        { cvsField: 'Start Date', mlField: 'start_date' },
        { cvsField: 'Project', mlField: 'title' },
        { cvsField: 'Project Id', mlField: 'Workspace Id' },
        { cvsField: 'access_level', mlField: 'access_level' },
        { cvsField: 'client_role_name', mlField: 'client_role_name' },
        { cvsField: 'stories_are_fixed_fee_by_default', mlField: 'stories_are_fixed_fee_by_default' },
        { cvsField: 'price', mlField: 'price' },
        { cvsField: 'change_orders_enabled', mlField: 'change_orders_enabled' },
        { cvsField: 'posts_require_privacy_decision', mlField: 'posts_require_privacy_decision' },
        { cvsField: 'tasks_default_non_billable', mlField: 'tasks_default_non_billable' },
        { cvsField: 'expenses_in_burn_rate', mlField: 'expenses_in_burn_rate' }
    ];

    var workspaceId;

    function processStandardFields(line) {
        var updateFields = [];
        for (var i = 0; i < fieldMapper.length; i++) {
            var cvsField = fieldMapper[i].cvsField;
            var updateValue = line[cvsField];
            if (updateValue !== undefined && updateValue !=='') {
                var mlField = fieldMapper[i].mlField;
                if (mlField === 'Workspace Id') {
                    workspaceId = updateValue;
                    continue;
                }
                var updateData = {
                    attribute: mlField,
                    value: updateValue
                };
                
                updateFields.push(updateData);
            };
        }
        
        return updateFields;
    }

    csvModule.processCSVLines = function (token, path, oncompleted) {
       
        var Converter = require("csvtojson");
        var converter = new Converter.Converter({});
        
        converter.fromFile(path, function(err, result) {
            var updateFields = [];
            for (var i = 0; i < result.length; i++) {
                var standardFields = processStandardFields(result[i]);
               
                if (Object.keys(standardFields).length !== 0) {
                    updateFields.push(standardFields);
                    mavenlinkApi.workspace.edit(token, workspaceId, standardFields, oncompleted);
                }
            }
          
            
        });
    };
    return csvModule;
}();