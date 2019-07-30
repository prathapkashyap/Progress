import React, { Component } from 'react'
import axios from 'axios';

export default class Signin extends Component {
    constructor(props){
        super(props);
        this.state={
            
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
       
        
        var {
        email,password
        }=this.state
        axios.post('/users/signin',{email,password}).then((response)=>{
            console.log(response.data)
            if( email===""|| password===""){
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
                console.log(this.state)
                //this.props.history.push('/profile/'+email);
                const {from}=this.props.location.state|| {from:{pathname:'/'}}
                console.log(from.pathname);
               this.props.history.push(from.pathname);
                this.props.set_status(email);
            }

        })
        this.setState({
           
            email:"",
            password:""
        });
        
    }
    render() {
        return (
            <div className="container">
            <h1 className="center"> SignIn</h1>
                <div className="row">
                    <div className="col s12 l8 push-l2">
                        <form onSubmit={this.handleSubmit}> 
                        <div className="input-field">
                            <input type="text" name="email" id="email" onChange={this.handleChange} value={this.state.email}/>

                            <label htmlFor='email'> E-mail</label>
                        </div>
                        <div className="input-field">
                           <input type="password" name="password" id="password" onChange={this.handleChange} value={this.state.password}/>

                            <label htmlFor='password'>Password</label>
                        </div>
                            <button  className="col push-l5 btn blue">Submit </button>
                        </form>

                    </div>

                </div>
            </div>
        )
    }
}






