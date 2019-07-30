import React,{Component} from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/navbar';
import Home from './components/Home';
import About from './components/About'
import Register from './components/users/Register';
import Signin from './components/users/Signin';
import Profile from './components/users/Profile'
import status from './components/users/status'
import Project from './components/Project';

const PrivateRoute=({component:Component,user,...rest})=>(
    <Route {...rest} render={(props)=>(
    status.login_status===true?
    <Component {...props} user={user}/>:
    <Redirect to="/users/signin"/>
  )}
  

  />
)

const NotLoggedInRoutes=({component:Component,set_status,...rest,})=>(
  <Route {...rest} render={(props)=>(
    status.login_status===false?
    <Component {...props} set_status={set_status} />:
    <Redirect to="/"/>
  )}/>
)

export default class App extends Component  {
  constructor(props){
    super(props);
    this.state={
      login_status:false,
      user:''
    }
  }

  componentDidMount(){

    var accessString=localStorage.getItem('JWT');
    if(accessString!=null){
    axios.get('/users/profile',{headers:{Authorization:`Bearer ${accessString}`}}).then(response=>{
     var {email}=response.data;
      this.set_status(email);
      
    });
  }
  else{
    console.log('not logged in');
    }
  }
  set_status=(email)=>{
    console.log('before the call',this.state.login_status)
    var l_status=this.state.login_status;
    status.setStatus();
    this.setState({
      login_status:!l_status,
      user:email
    },function(){
      console.log('login_status=',this.state.login_status);
    })
    

  }
  render(){
    
    return (
      <div className="App">
      <BrowserRouter>
      <Route path="/" render={(props)=><Navbar login_status={this.state.login_status} user={this.state.user} {...props}/>}/>
      
      <Switch>
      <Route exact path="/"  render={(props)=><Home {...props} />}/>
      <Route exact path="/about"  component={About}/>
      <NotLoggedInRoutes exact path="/users/register" set_status={this.set_status} component={Register} />}/>
      <NotLoggedInRoutes exact path="/users/signin"  set_status={this.set_status} component={Signin} />}/>
      <PrivateRoute exact path="/profile/:username" component={Profile}/>
      <PrivateRoute exact path="/projects" component={Project} user={this.state.user}/>
      </Switch>
      
      </BrowserRouter>
      </div>
    )
  }
}


