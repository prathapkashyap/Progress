const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ProjectSchema=new Schema({
    project_name:{type:String,require:true},
    created_by:{type:String,require:true},
    created_on:{type:Date,default:Date.now()},
    project_description:{type:String,},
    members:{type:String},
});

const Project=mongoose.model('Project',ProjectSchema);
module.exports=Project;