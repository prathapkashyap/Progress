import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios';
import status from './users/status'
export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.state={
            user:this.props.user
        }
    }
    logout=()=>{
        
        localStorage.clear();
        status.setStatus();

        this.props.history.push('/');
    }
    componentDidMount(){
        console.log(this.props);

    }

  
    render() {
       
        
       var accessString=localStorage.getItem('JWT');
       if(accessString===null){
           console.log('its not there')
       }
       else{
           console.log('its there')
       }
        if(accessString===null){
        return (
            <div>
            <nav className="nav-wrapper black">
                <ul>
                
                    <li className="center  brand-logo ">
                        <NavLink to="/" > <h5> Progress</h5> </NavLink>
                    </li>
                    <li className="right">
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li className="right col push-l4 right-align">
                        <NavLink to="/users/signin">Sign In </NavLink>
                    </li>
                    <li className="right">
                        <NavLink to="/users/register">Register </NavLink>
                    </li>
                    
                </ul>
                
            
            </nav>
                
            </div>
        )
    }
    else{
        return(
        <div>
            <nav className="nav-wrapper black">
                <ul>
                    <li className=" center brand-logo">
                        <NavLink to="/"><h5> Progress</h5> </NavLink>
                    </li>
                    <li className="right">
                        <NavLink to="/user/logout" onClick={this.logout}>logout</NavLink>
                    </li>
                    <li className="right">
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li className="left">
                        <NavLink to="/projects">Projects</NavLink>
                        
                    </li>
                    <li className="left">
                        <NavLink to="/teams">Teams</NavLink>
                        
                    </li>
                    <li className="right">
                        <NavLink to={`/profile/${this.props.user}`}>Profile</NavLink>
                    </li>
                    
                </ul>
                
            </nav>
        </div>
        )
    }
}

}
