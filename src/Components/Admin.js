import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'
import disableBrowserBackButton from 'disable-browser-back-navigation';
import '../App.css';

export class Admin extends Component {
    
    constructor(props) {
    super(props)

    this.state = {
         allviewApplication:[]
    }
}
 componentDidMount(){
    var arr=JSON.parse(localStorage.getItem('UsersData'))
    this.setState({
        allviewApplication:arr
    })
}

activate=(e)=>{
var person=e.target.value
var arr=JSON.parse(localStorage.getItem('UsersData'))

for(var i=0;i<arr.length;i++){
    if(arr[i].FirstName==person){
        arr[i].isUserActive=true
        arr[i].status='Activate'
        this.setState({
            allviewApplication:arr
        })
        break;
    }
}

localStorage.setItem('UsersData',JSON.stringify(arr))
}

deactivate=(e)=>{
    var person=e.target.value
    var arr=JSON.parse(localStorage.getItem('UsersData'))
    
    for(var i=0;i<arr.length;i++){
        if(arr[i].FirstName==person){
            arr[i].isUserActive=false
            arr[i].status='Deactivate'
            this.setState({
                allviewApplication:arr
            })
            break;
        }
    }
    localStorage.setItem('UsersData',JSON.stringify(arr))
    }

renderingViewApplication=()=>{
return this.state.allviewApplication.map((application,index)=>{
    const {FirstName,isUserActive,status}=application
    return (
        <tr key={index}>
            <td style={{ color: 'blue' }}> {FirstName}</td>
            <td style={{ color: 'blue' }}> {status}</td>
            
            <td style={{ color: 'blue' }}> {isUserActive}</td>
            <td> 
                <button onClick={this.activate} value={FirstName} className="btn btn-warning"> Activate</button>&nbsp;&nbsp;
                <button onClick={this.deactivate} value={FirstName} className='btn btn-danger'> Deactivate</button>
                        
            </td>


        </tr>
    )
})
    }

loginstatus=()=>{
    let signinValue=JSON.parse(localStorage.getItem('UsersData'));
        console.log(signinValue);
        for(var user of signinValue)
        {
        
                user.adminstatus='signout';
                if(user.signinstatus!='login'){
                disableBrowserBackButton();
                }
                
        }
           
        }


logOut=()=>{
this.props.history.push('/');
disableBrowserBackButton();
    }

graph=()=>{
    this.props.history.push('/graphreport');
}

simple=()=>{
    this.props.history.push('/simple');
}

    render() {
        return (
            <div className='container'>
                <h2 style={{ color: 'black' }}> Welcome Admin</h2>
                
               
                <button type='button' onClick={this.logOut} className='btn btn-primary right'> Sign Out</button>&nbsp;&nbsp;&nbsp;
                <button type='button' onClick={this.graph} className='btn btn-primary left'> Graphical Report</button>&nbsp;&nbsp;&nbsp;
                <button type='button' onClick={this.simple} className='btn btn-primary left'> Simple Report</button>
               
    
                <table className='table table-hover striped'  >
                <thead>
                   <tr>
                            <th scope='col' style={{ textAlign: 'center' }}>UserName </th>
                           
                            <th scope='col' style={{ textAlign: 'center' }}>Status</th>
                            <th scope='col' style={{ textAlign: 'center' }}>Action </th>
                   </tr>
                   </thead>
                   <tbody>
                    {this.renderingViewApplication()}
                    </tbody>
                    </table>
            </div>
        )
    }
}

export default Admin
