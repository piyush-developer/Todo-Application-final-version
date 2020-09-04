import React, {useState,useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import Login from './Login';
import '../App.css';

const GraphReport=()=> {
    const [chartData,setChartData]=useState({});
    const data = JSON.parse(localStorage.getItem('UsersData'));
    const data2 = JSON.parse(localStorage.getItem('todoApplication'));

     var countUsers=0;   
     var countUsers2=0;
    for(var user of data){
    
        // var dt = new Date("December 30, 2017 11:20:25");
        //  dt.setDate( dt.getDate() - 10 );
        //  document.write( dt );
    
    var todayDate=new Date();
    todayDate.setDate( todayDate.getDate() - 7 );
    var sevenDaysAgoTime = todayDate.getTime();
    var userdate=new Date(user.today);
    var userTime=userdate.getTime();
    console.log(userTime,'usertime');
    console.log(sevenDaysAgoTime,'sevendays ago time');
    if(userTime-sevenDaysAgoTime>=0)
        {
            
            countUsers=countUsers+1;
            console.log(countUsers);
        }
    }

    for(var user2 of data2){
        var todayDateTask=new Date();
        todayDateTask.setDate(todayDateTask.getDate()-7);
        var sevenDaysAgoTimeTask=todayDateTask.getTime();
        var userdate2=new Date(user2.today);
        //console.log(userdate2);
        var userTime2=userdate2.getTime();
        //console.log(curdate2-userday2);
        if(userTime2-sevenDaysAgoTimeTask>=0)
        {
            countUsers2=countUsers2+1;
          //  console.log(countUsers2);
        }
    }

    const chart=()=>{

        setChartData({
            labels:['Record of last 7 days'],
            datasets:[
            {
                label:'Report of User SignUp',
                data:[countUsers],
                borderColor:['green'],
                backgroundColor:['green'],
                pointBorderColor:['green'],
                pointBackGroundColor:['green']
              
            },
            {
                label:'Report of User Activities',
                data:[countUsers2],
                borderColor:['yellow'],
                backgroundColor:['yellow'],
                pointBorderColor:['yellow'],
                pointBackGroundColor:['yellow']
            }
        ]
        })

    }

useEffect(() => {
    
       chart()
    
}, [])

    return (
        <div>
            <Bar data={chartData}/>
        </div>
    )
}
export default GraphReport
