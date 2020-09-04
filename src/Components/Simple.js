import React from 'react';
import CountUp from 'react-countup';

const Simple=()=> {

    const data = JSON.parse(localStorage.getItem('UsersData'));
    const data2 = JSON.parse(localStorage.getItem('todoApplication'));

     var countUsers=0;   
     var countUsers2=0;
    for(var user of data){
    
    var cur_date=new Date();
    var curdate = cur_date.getDate();
    var userdate=new Date(user.today);
    var userday=userdate.getDate();
    console.log(cur_date-userday);
    if(curdate-userday<=7)
        {
            countUsers=countUsers+1;
            console.log(countUsers);
        }
    }

    for(var user2 of data2){
        var cur_date2=new Date();
        var curdate2=cur_date2.getDate();
        var userdate2=new Date(user2.today);
        var userday2=userdate2.getDate();
        console.log(curdate2-userday2);
        if(curdate2-userday2<=7)
        {
            countUsers2=countUsers2+1;
            console.log(countUsers2);
        }
    }

    return (
        <div style={{paddingTop:'200px'}}>
           <h2 style={{textAlign:'center'}}>Number of users sign up in last 7 days: <CountUp end={countUsers} /></h2>
           <h2 style={{textAlign:'center'}}>Number of tasks completed by users in last 7 days: <CountUp end={countUsers2} /></h2>
        </div>
    )
}

export default Simple
