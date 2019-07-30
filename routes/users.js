const express=require('express');
const router=express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
const User=require('../model/user');
const jwtsecret=require('../config/jwtconfig');

router.post('/register',(req,res,next)=>{
    
    
    var UserData=req.body;
    
    
    passport.authenticate('local.signup',(err,user,info)=>{
       // console.log('the user',user)
        if(err){
           // console.log('if error',err)
            console.log('in the error part',err)
        }
        if(info!=undefined){
            console.log('in info part')
            console.log(info.message)
            res.send(info.message)
        }
        else{
            req.login(user,err=>{
                console.log('the user part',user)
                const data={
                    username:UserData.username,
                    email:UserData.email
                };
                User.findOne({email:data.email}).then(function(user){
                    console.log(user)
                    user.update({email:data.email},{username:data.username}).then(()=>{
                        console.log('user created in database');
                        const token=jwt.sign({id:user.username},jwtsecret.secret);

                        res.status(200).send({
                            message:'user created',
                            auth:true,
                            token:token});
                    })

                })
            })
        }
        
    })(req,res,next);
});
router.post('/signin',(req,res,next)=>{
    passport.authenticate('local.signin',(err,user,info)=>{
        if(err){
            console.log(err)

        }
        if(info!=undefined){
            console.log(info.message)
            res.send(info.message)
        }
        else{
            req.login(user,err=>{
                User.findOne({email:user.email}).then(user=>{
                    const token=jwt.sign({id:user.email},jwtsecret.secret);
                    res.status(200).send({
                        auth:true,
                        token:token,
                        message:'User found and logged in'
                    })
                })
            })
        }
    })(req,res,next)
});
router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
   // console.log(req.user);
    res.send(req.user)

    }
)
 

module.exports=router;