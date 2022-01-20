let express = require('express');
const jwt = require("jsonwebtoken");
let app = express();
const path= require('path')
let cookieParser = require('cookie-parser')
//body parser
 

app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
//setting views directory
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))
let router=require('./route/index.route')


const mongoose=require('mongoose')
const mongConn=require('./db/index')
//globally established connection
mongConn.mongooseConnection();


app.use('/',router)
app.all("*",(req,res)=>{
    res.send('Invalid Request!!')
})
app.listen(3000,()=>{
    console.log("hi we are at port 3000")
})