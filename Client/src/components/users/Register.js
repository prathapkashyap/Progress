import React, { Component } from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import { header } from 'express-validator/check';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            username:"",
            email:"",
            password:"",
            info_messages:[]
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        
        this.setState({
            username:"",
            email:"",
            password:"",
            info_messages:[],
            
        })
      
        var {username,email,password}=this.state
        axios.post('/users/register',{username,email,password}).then((response)=>{
            console.log(response.data);
            if(username==""|| email==""|| password==""){
                this.setState({
                    info_messages:['fill in the credentials']
                })
            }
            else if(response.data.message===undefined){
                
                var messages=response.data.map(data=>{
                    return(data.msg)
                })
                this.setState({
                    info_messages:messages
                })
                console.log(this.state.info_messages)
            }
            else{
            localStorage.setItem('JWT', response.data.token);
            this.props.history.push('/profile/'+email);
            console.log('the props of register',this.props)
            this.props.set_status(email);
                }
        })
    }
    showErrors=()=>{
        
    }
    render() {
        var showerrors=this.state.info_messages.map(msg=>{
            return(
                <div className="red-text" key={msg}>
                    <p> {msg}</p>
                </div>
            )
        })
        
            return (

            <div className="container">
            <h1 className="center"> SignUp</h1>
           

                <div className="row">
                <div className="col s12 l8 push-l2">
               {showerrors}
                 </div>
                    <div className="col s12 l8 push-l2">
                        <form onSubmit={this.handleSubmit}> 
                            UserName:<input type="text" name="username" id="username" onChange={this.handleChange} value={this.state.username}/>
                            Email:<input type="text" name="email" id="email" onChange={this.handleChange} value={this.state.email}/>
                            password:<input type="password" name="password" id="password" onChange={this.handleChange} value={this.state.password}/>
                            <button  className="col push-l5 btn blue">Submit </button>
                        </form>

                    </div>

                </div>
            </div>
        )
        
       
    }
}






