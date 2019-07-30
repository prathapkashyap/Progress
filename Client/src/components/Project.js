import { Modal, Button } from 'react-materialize';
import React,{ Component } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';


export default class Project extends Component{

    
    componentDidMount(){
        console.log('in projects to get projects',this.props.user)
        // axios.post('project/getprojects',{user:this.props.user}).then(response=>{
        //     console.log(response);
           
        //    this.setState({
        //        projects:response.data
        //    })
           
        // })
        this.getProjects('did mount');
        setTimeout(()=>{
            this.setState({
                loading:false
            });
        },2500);
    }
    getProjects=(from)=>{
        console.log(from,'function is being called',)
        axios.post('project/getprojects',{user:this.props.user}).then(response=>{
            console.log(from,response);
           
           this.setState({
               projects:response.data
           })
           
        })
    }
    constructor(props){
        super(props);
        this.state={
            projects:[],
            modalState:false,
            project_name:'',
            project_description:'',
            user:'',
            loading:true,
            }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
        console.log(this.state.modalState)
    }
    handleDelete=(id,user,project_name)=>{
        var projects=this.state.projects.filter(project=>{
            return(project._id!==id)
        })
        this.setState({
            projects
        })
        axios.post('/project/delete_project',{id:id,user:user,project_name:project_name}).then(response=>{
            console.log(response);
           
           
        })
       
        
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state);
        this.setState({
            project_name:'',
            project_description:''
        })
        
        var proj={name:this.state.project_name,description:this.state.project_description,user:this.props.user}
        var accessString=localStorage.getItem('JWT')
        axios.post('/project/create_new_project',{proj},
                    {headers:{Authorization:`Bearer ${accessString}`}}).then(response=>{
            console.log('in the submit section',response);
           
            
        });
        
        this.getProjects('submit');
       
    }
    
    
    
    render(){
        const trigger = 
        <div className="fixed-action-btn top"  >
            <a className="btn-floating btn-large red">
                <i className="large material-icons">add</i>
            </a>
            <ul>
                
            </ul>
        </div>
       
        const NewProjModal=  
        <Modal trigger={trigger} >
        <h4> New Project</h4>
        <form onSubmit={this.handleSubmit}>
        
            <div className="input-field">
                <input type="text" name="project_name" id="project_name" onChange={this.handleChange} value={this.state.project_name} />
                <label htmlFor="project_name">PROJECT NAME</label>
            </div>
            <div className="input-field">
                <textarea onChange={this.handleChange} className="materialize-textarea" type="text" name="project_description" id="project_description" value={this.state.project_description}/>
                <label htmlFor="project_description">PROJECT DESCRIPTION</label>
            </div>
            <button className="btn">Submit</button>
        </form>
    </Modal>
    
        var Your_projects=this.state.projects.map(project=>{
            return(
                
                <div className="row" key={project._id}>
                    <div className="col s12 m12 l12">
                    <div className="card black">

                        <div className="card-content white-text">
                        <button onClick={()=>this.handleDelete(project._id,this.props.user,project.project_name)} className="btn-floating container  red secondary-content"><i className="material-icons">delete</i></button>
                        <NavLink to={`/project/${project.project_name}`}  >
                        <span className="card-title">Name: {project.project_name}</span>
                        <p>Description: {project.project_description}</p>
                        </NavLink>
                        </div>
                    
                    </div>
                    </div>
                </div>
                
            )
        })
        if(this.state.loading==true){
            return(
            <h1 className="center">Loading...</h1>
            )}
        else{
        if ((this.state.projects.length)===0){
            return(
                <div className="container">
                <h1> No Projects yet</h1>
                {NewProjModal}
                </div>
            )
        }
        
        else{
        return(

            <div className="container">
            <h3 className="center">Your Projects</h3>
            {Your_projects}
                {NewProjModal}
              
            </div>
        )
        
        }
    }
}
}