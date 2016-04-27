module.exports = {
    mavenlinkAPIOut : function(ptores){
        this.employeefullname = ptores.employee[0]._;
        this.employeeid = ptores.employee[0].$;
        this.startdate = ptores.start;
        this.enddate = ptores.end;
        this.vacationtype = ptores.type[0]._;
        this.dateamount = ptores.amount[0]._;
        return 'Velir OOO' + ' - ' + this.vacationtype + ', ' + 
            this.employeefullname + ', ' + this.dateamount + 'D, ' + this.startdate + ' - ' + this.enddate;
    }
}