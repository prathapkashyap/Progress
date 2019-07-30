const passport=require('passport');
const bcrypt=require('bcrypt-nodejs');
const Local=require('passport-local').Strategy;
const User=require('../model/user');
const JWTStrategy=require('passport-jwt').Strategy;
const jwtsecret=require('./jwtconfig');
const ExtractJWT=require('passport-jwt').ExtractJwt

passport.use('local.signup',new Local({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true,
    session:false
},
function(req,email,password,done){
    //valiadtion
    req.checkBody('email','please choose a valid email address').notEmpty().isEmail();
    req.checkBody('password','password must be a minimum of 5 charecters').notEmpty().isLength({min:5});
    var errors=req.validationErrors();
    if(errors){
        messages=[];
        errors.forEach(error=>{
            messages.push(error);
        });
        return done(null,false,{message:messages});
    }
    // console.log('in passport local.signup',req.body);
    // console.log('the email',email)
    //signing up user
    User.findOne({'email':email},function(err,user){
        console.log('inside the function in passport',user)
        if(err){
            return done(err)
        }
        if(user){
            console.log('user exists',user);
            return done(null,false,{message:[{msg:'Email already in use'}]});
        }
        else{
            var newUser=new User({});
            newUser.username=req.body.username;
            newUser.email=email;
            newUser.password=newUser.encryptPassword(password);
            newUser.save().then(function(err,user){
                if(err){
                    return(done(err));

                }
                else{
                    return(done(null,user))
                }
            });
        }
    })
}));

passport.use('local.signin',new Local({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true,
    session:false

},function(req,email,password,done){
    //validation
    req.checkBody('email','Email not valid').notEmpty().isEmail();
    req.checkBody('password','unacceptable password').notEmpty().isLength({min:5});
    var errors=req.validationErrors();
    if(errors){
        messages=[];
        errors.forEach(error=>{
            messages.push(error);
        });
        return done(null,false,{message:messages});
    }
    //signing in the user
    User.findOne({'email':email},function(err,user){
        
        if(err){
            return (done(err))
        }
        if(!user){
            return(done(null,false,{message:[{msg:'user does not exist'}]}));
        }
        
        if(!user.validatePassword(password)){
            return(done(null,false,{message:[{msg:"password does not match"}]}));
        }
        return(done(null,user));
    })
}
));

const opts={

    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:jwtsecret.secret
}

passport.use('jwt',new JWTStrategy(opts,(jwt_payload,done)=>{
    try{
        console.log('the calling');
        console.log(jwt_payload.id)
        User.findOne({email:jwt_payload.id},function(err,user){
            if(err){
                console.log(err)
            }
            if(user){
                console.log('user found');
                done(null,user)
            }
            else{
                console.log('no user found');
                done(null,false);
            }
        })
    }
    catch(err){
        done(err)
    }
}))