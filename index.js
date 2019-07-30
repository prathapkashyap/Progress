const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const validator=require('express-validator');
const mongoose=require('mongoose');
const cookie=require('cookie-parser');
const flash=require('connect-flash');
const app=express();
const passport=require('passport')
require('./config/passport');
mongoose.connect('mongodb://localhost:27017/Progress',{useNewUrlParser:true, useFindAndModify: false });


const PORT=process.env.PORT||5000
app.use(express.json());
app.use(validator());
app.use(flash());
app.use(passport.initialize());

app.use('/users',require('./routes/users'));
app.use('/project',require('./routes/projects_routes'))
app.get('/',(req,res)=>{
    res.send('hello world')
});
app.listen(PORT,()=>{
    console.log('listening to port 5000');
});