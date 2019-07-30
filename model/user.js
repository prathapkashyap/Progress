const mongoose=require('mongoose');
const bcrypt=require('bcrypt-nodejs')

const Schema= mongoose.Schema;

var UserSchema=new Schema({
    email:{type:String,required:true},
    username:{type:String},
    password:{type:String,required:true},
    projects:[]

});
UserSchema.methods.encryptPassword=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
    //synchronous hashing 
}

UserSchema.methods.validatePassword=function(password){
    return bcrypt.compareSync(password,this.password);
}

var User=mongoose.model('User',UserSchema);
module.exports=User;

