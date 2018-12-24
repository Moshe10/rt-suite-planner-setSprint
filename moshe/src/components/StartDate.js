import React, { Component } from 'react';
import { connect } from 'react-redux';



class StartDate extends Component {


      createWeeks(len,startDate) {
        let weeksArr = [];
        let endWeeksArr=[]
        let startDate = startDate;
        // weeksArr.push(startDate)
        console.log("1", startDate);
        let day = startDate.getDate();
        let month = startDate.getMonth();
        let year = startDate.getFullYear();
        let start = Date.UTC(year, month, day);
        console.log("2", start);
        let week=start
        let endWeek=start
        for (let i = 0; i < len; i++) {
           week +=604800000;
           endWeek =week-86400000
          console.log("3", week);
          console.log("3", endWeek);
          let weekDate = new Date(week);
          let endWeekDate = new Date(endWeek)
          console.log("4", weekDate);
          console.log("4", endWeekDate);
          weeksArr.push(weekDate)
          endWeeksArr.push(endWeekDate)
        }
        console.log(weeksArr.length);
        console.log("end  ",endWeeksArr.length);
        let newWeeksArr = []
        let newEndWeeksArr= []
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
        console.log(newWeeksArr);
    
      }
    

    render() {
        return (
            <div>
                {this.createWeeks(10,this.props.projectFromDB.startDate)}
            </div>
        );
    }
}

export default connect(state => state)(StartDate);