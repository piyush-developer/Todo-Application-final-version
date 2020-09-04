import React, { Component } from 'react'
import queryString from 'query-string';
import {ToastContainer, toast} from 'react-toastify'
import disableBrowserBackButton from 'disable-browser-back-navigation';
import '../App.css';
export class test3 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUserDetails: {},
            title: '',
            description: '',
            todoApplication: [],
            cur_date: '',
            unique_id: '',
            index: '',
            disabled: true
            
        }
    }
    componentWillMount() {
         const query = new URLSearchParams(this.props.location.search);
        const userId = query.get('myparam1');
        console.log(userId)
        const details = JSON.parse(localStorage.getItem('UsersData'))
        details.map(user => {
            if (userId == user.Email) {
                this.setState({
                    currentUserDetails: user
                })
            }
        })
        var todo_application_current_user = JSON.parse(localStorage.getItem('todoApplication'))
        var arr = []
        if (todo_application_current_user == null) {
            todo_application_current_user = []
        }
        else {
            todo_application_current_user.map(application => {
                if (userId == application.userId) {
                    arr.push(application)
                }
            })
        }
        this.setState({
            todoApplication: arr
        })

    }

    submitData = () => {
         
        const todo_title = this.state.title
        const todo_description = this.state.description
        const index = this.state.index
        const status = 'pending'
        const userid = this.state.currentUserDetails.Email
        const val = Math.floor(1000 + Math.random() * 9000)
        const FirstName = this.state.currentUserDetails.FirstName
        const  today=new Date();

        var TodoApplications = JSON.parse(localStorage.getItem('todoApplication'))
        if (TodoApplications == null) {
            TodoApplications = []
        }
        var current_user_Application = {
            App_id: val,
            name: FirstName,
            userId: userid,
            title: todo_title,
            description: todo_description,
            status: status,
            today:today
        }
        TodoApplications.push(current_user_Application)
        localStorage.setItem('todoApplication', JSON.stringify(TodoApplications))
        var arr = JSON.parse(localStorage.getItem('todoApplication'))
        var new_Arr = []
        arr.map(a => {
            if (a.userId == this.state.currentUserDetails.Email) {
                new_Arr.push(a)
            }
        })
        this.setState({
            todoApplication: new_Arr,
            title: '',
            description: ''
        })
    }
 
    EditApplication = (e) => {
        const editData = e.target.value
        this.setState({
            unique_id: editData,
            disabled: !this.state.disabled

        })
        let arr = JSON.parse(localStorage.getItem('todoApplication'))
        for (var i = 0; i <= arr.length; i++) {
            if (arr[i].App_id == editData) {
                this.setState({
                    title: arr[i].title,
                    description: arr[i].description,
                    index: i
                })
                break;
            }
        }
    }
    renderingViewApplication = () => {
        return this.state.todoApplication.map((application, index) => {
            const { App_id, userId, title, description, status } = application
            
            return (
                <tr key={index}>
                    <td> {index + 1}</td>
                    <td> {title}</td>
                    <td> {description}</td>
                    <td> {status}</td>
                    <td><button className='btn btn-success' value={App_id} onClick={this.EditApplication}> Edit</button></td>
                    <td><button className='btn btn-danger'  value={App_id} onClick={this.DeleteApplication}> Delete</button></td>
                    <td><button className='btn btn-warning'  value={App_id} data-key={index}   onClick={()=>this.completeItem(index)}> Complete</button></td>

                </tr>
            )

        })
    }


    onchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    updateData = e => {
        var arr = JSON.parse(localStorage.getItem('todoApplication'))

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].App_id == this.state.unique_id) {
                arr[i].title = this.state.title
                arr[i].description = this.state.description
                break;
            }
        }
        localStorage.setItem('todoApplication', JSON.stringify(arr))
        var new_Arr = []
        arr.map(a => {
            if (a.userId == this.state.currentUserDetails.Email) {
                new_Arr.push(a)
            }
        })
        this.setState({
            todoApplication: new_Arr,
            title: '',
            description: ''
        })
    }

 DeleteApplication = (e) => {
        var TodoApplications = JSON.parse(localStorage.getItem('todoApplication'))
        const deleteData = e.target.value

        for (var i = 0; i < TodoApplications.length; i++) {
            var user = TodoApplications[i]
            if (user.App_id == deleteData) {
                TodoApplications.splice(i, 1)
            }
        }
        localStorage.setItem('todoApplication', JSON.stringify(TodoApplications))
        var arr = JSON.parse(localStorage.getItem('todoApplication'))

        var new_Arr = []
        arr.map((a) => {
            if (a.userId == this.state.currentUserDetails.Email) {
                new_Arr.push(a)
            }
        })
        this.setState({
            todoApplication: new_Arr
        })
    }
    // componentDidMount() {

    //     this.date_validation()
    // }


        completeItem=index=>{
        let statusValue=JSON.parse(localStorage.getItem('todoApplication'));
       // console.log(statusValue[index]);
       let arr=statusValue.filter((a)=>a.userId==this.state.currentUserDetails.Email)
        arr[index].status='Complete';
        localStorage.setItem('todoApplication',JSON.stringify(arr));
         statusValue=JSON.parse(localStorage.getItem('todoApplication'));
        arr=statusValue.filter((a)=>a.userId==this.state.currentUserDetails.Email)
        
        this.setState({
            todoApplication:arr
            });
            console.log(arr);
        localStorage.setItem('todoApplication',JSON.stringify(statusValue));
        let newstatus=JSON.parse(localStorage.getItem('todoApplication'));
        for(var i=0;i<newstatus.length;i++){
            if(newstatus[i].status='complete'){
                 toast.success("Congratulations!! You complete your  task");
            }
            break;
        }
       // renderingViewApplication();
    }
    

    logOut=()=>{
this.props.history.push('/');
disableBrowserBackButton();
    }
    render() {
        return (
            <div className='container'>
                <h2 > welcome {this.state.currentUserDetails.FirstName}</h2>

                <button type='button' onClick={this.logOut} className='btn btn-primary right'> Sign Out</button>


                <label className='left'><h4> Title</h4> </label>
                <input type="text" name="title" value={this.state.title} onChange={this.onchange}  />
                <label className='left'><h4> Description</h4> </label>
                <input type="text" name="description" value={this.state.description} onChange={this.onchange}  />

                <button className='btn btn-primary' onClick={this.submitData} disabled={!this.state.disabled} > Add</button> &nbsp;&nbsp;&nbsp;
                <button className='btn btn-primary' onClick={this.updateData} disabled={this.state.disabled}> update</button>


                <center>
                    <table className='table table-hover striped ' border='1'>
                        <tr>
                            <th scope='col'>Sr.No </th>
                            <th scope='col'>Title </th>
                            <th scope='col'>Description </th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Action </th>
                            
                        </tr>
                        {this.renderingViewApplication()}


                    </table>
                </center>
            </div>
        )
    }
}

export default test3
