import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { BrowserRouter as Router ,NavLink,Switch,Route} from 'react-router-dom';
import TodoList from './Components/TodoList';
import Admin from './Components/Admin';
import Test from './Components/Test';
import Test2 from './Components/Test2';
import test3 from './Components/test3';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GraphReport from './Components/GraphReport';
import Simple from './Components/Simple';
import pagenotfound from './Components/pagenotfound'
function App() {
  return (
    <div>
    <Router>
       

  <ToastContainer />
 <Switch>
  <Route path='/' exact component={Login}/>
  <Route path='/signup' component={Signup}/>
  <Route path='/test3' component={test3}/>
  <Route path='/admin' component={Admin}/>   
  <Route path='/graphreport' component={GraphReport}/>
  <Route path='/simple' component={Simple}/>
  <Route path='*' component={pagenotfound}/>
</Switch>


      </Router>
  
    </div>
  );
}

export default App;
