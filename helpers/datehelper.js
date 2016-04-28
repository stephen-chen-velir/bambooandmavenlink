module.exports = {
    getYesterday : function(){
        var yesterday = new Date(new Date().setDate(new Date().getDate()-1)).toISOString();
        return yesterday.split('T')[0];
    },
    getPreviousMonth : function(month){
        var pmonth = new Date(new Date().setDate(new Date().getMonth()-month)).toISOString();
        return pmonth.split('T')[0];
    }
}