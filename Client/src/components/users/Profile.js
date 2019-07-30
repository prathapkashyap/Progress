import React, { Component } from 'react'
import axios from 'axios';
export default class Profile extends Component {
    
    constructor(props){
        super(props);
        this.state={
            user:''
        }
    }
    componentDidMount(){
        var id=localStorage.getItem('JWT');
        console.log(id);
        
        axios.get('/users/profile',{headers:{Authorization:`Bearer ${id}`}}).then(response=>{
            var {email}=response.data;
             this.setState({
                 user:email
             });
           });
        
    }
    render() {
        
        return (
            <div className="container">
               <h1> The profile page of{this.state.user} </h1>
            </div>
        )
    }
}


