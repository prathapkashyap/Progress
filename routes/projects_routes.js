const passport=require('passport');
const Project=require('../model/project_model');
const User=require('../model/user')
const express=require('express');
const router=express.Router();


router.post('/getprojects',(req,res)=>{
    var {user}=req.body;
   
    
    User.findOne({email:user},(err,userdata)=>{
      
      var toSend=new Array();
      var i=0
      
        userdata.projects.forEach(project=>{
           
            Project.findOne({project_name:project},(err,data)=>{
                
               
                toSend.push(data);
                if(i==userdata.projects.length-1){
                    
                    res.send(toSend)
                }
                i++
             })
            })
    });

})
router.post('/create_new_project',(req,res)=>{
    console.log(req.body);
    var {name,description,user}=req.body.proj;
    //console.log(name,description,user);

    var date=new Date();
    var newProject=new Project();
    newProject.project_name=name;
    newProject.project_description=description;
    newProject.created_by=user;
    newProject.created_on=date.toISOString();
    
    newProject.save().then((response)=>{
        console.log('saving new project',response);

    });
    

    User.findOneAndUpdate({'email':user},{$push:{projects:name}},{new:true}).then(data=>{
        console.log(data)
    });


})
router.post('/delete_project',(req,res)=>{
    const {id,user,project_name}=req.body;
   // console.log('delete project');
   // console.log(id,user,project_name)
    Project.findOneAndDelete({_id:id},(err,data)=>{
        console.log('find anddelete projrct',data);
    });
    Project.find({},(err,data)=>{
        console.log('finding all projects after deleting a particular one',data);
    })
    
    User.findOneAndUpdate({'email':user},{$pull:{projects:project_name}},{new:true},(err,data)=>{
        console.log('user projects',data)
    })
    res.send('deleted successfully')
       
});
    

  


module.exports=router;


