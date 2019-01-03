import React, { Component } from 'react';
import { connect } from 'react-redux';



class StartDate extends Component {


   
    static createWeeks(len, mystartDate) {
        let weeksArr = [];
        let endWeeksArr = []
        let startDate = mystartDate;
        // weeksArr.push(startDate)
        let day = startDate.getDate();
        let month = startDate.getMonth();
        let year = startDate.getFullYear();
        weeksArr.push(startDate)
        let start = Date.UTC(year, month, day);
        let week = start
        let endWeek = start
        for (let i = 0; i < len; i++) {
            week += 604800000;
            endWeek = week - 86400000
            let weekDate = new Date(week);
            let endWeekDate = new Date(endWeek)
            weeksArr.push(weekDate)
            endWeeksArr.push(endWeekDate)
        }
        let end = endWeek + 604800000
        let end1 = new Date(end)
        endWeeksArr.push(end1)
        let newWeeksArr = []
        for (let i = 0; i < weeksArr.length; i++) {
          let day = weeksArr[i].getDate();
          let month = weeksArr[i].getMonth()+1;
          let year = weeksArr[i].getFullYear();
          let day1 = endWeeksArr[i].getDate();
          let month1 = endWeeksArr[i].getMonth()+1;
          let year1 = endWeeksArr[i].getFullYear();
          let startWeek = [day +"/"+ month + "/"+year , day1 +"/"+ month1 + "/"+year1] 
          newWeeksArr.push(startWeek)
        }
        return newWeeksArr;
    }


    render() {
        console.log(StartDate.createWeeks(10, this.props.projectFromDB.startDate));
        return (
            <div>
                {StartDate.createWeeks(10, this.props.projectFromDB.startDate)}
            </div>
        );
    }
}

export default connect(state => state)(StartDate);
