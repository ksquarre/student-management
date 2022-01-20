const jwt= require('jsonwebtoken');
const allfunc=require('../model/teacher.model')

const handleError=(err)=>{
 //  console.log(err.message)
   let error={
      _id:'',
      name:'',
      subject:'',
      age:'',
      address:''
   }
   if(err.message==="incorrect username"){
      error.name='Wrong Username';
      
   }
   if(err.message==="incorrect ID"){
      error._id='Wrong ID';
   }
   if(err.code===11000){
      error._id='THIS ID IS ALREADY REGISTERED !! ENTER A VALID ID';
      return error;
    
   }
   
   if(err.message.includes('teacher validation failed')){
      Object.values(err.errors).forEach(({properties}) =>{
         error[properties.path]=properties.message
      })
      
   }
   return error;
}
const duration=5*60;
const createToken =(id)=>{
   return jwt.sign({id},'secret key',{
      expiresIn: '5m'
   });
}

 //below we'll be interacting with database 
 const signup_post= async(req,res,next)=>{
   try{
      let result=await allfunc.addTeacher(req.body)
      
      res.json({ID : result._id,name :result.name, status:"Teacher Added Successfully"})
   }catch(err){
      console.log(err);
    const error= handleError(err);
    
    res.status(400).json({error})
   }
   
 }
const login_post= async(req,res,next)=>{
   
    const {_id,name }=req.body;
    try{
      const user=await allfunc.login(_id,name)
      if(user){
         const token=createToken(user._id);
         res.cookie('jwt',token, {httpOnly :true,maxAge:5*60*1000})
         res.json({ID : user._id,name :user.name, status:"Signed Up Successfully",jwt:token})
      }else{
         res.json({status:"User Not Found, Please Sign Up"})
      }
     
     
    }catch(err){
      const error= handleError(err);
     console.log(err)
       res.status(400).json({error})
    }
 }

const allStudents =async(req,res,next)=>{
   let result=await allfunc.getAllStudents()
   res.send(result)
   //next();
}
const allTeachers =async(req,res,next)=>{
   let result=await allfunc.getAllTeachers()
   res.send(result)
   //next();
}
const findstudent =async(req,res,next)=>{
   const {name }=req.params
   let result=await allfunc.getStudent(name)
   res.send(result)
  // next();
}
const findTeacher=async(req,res,next)=>{
   const {subject}=req.params
   console.log(subject)
   let result=await allfunc.getTeacher(subject)
   res.send(result)
  // next();
}

const avgmarks=async(req,res,next)=>{
   const { value }=req.params
   let result=await allfunc.studMarks(parseInt(value))
   res.send(result)
  // next();
}
const createStudent= async(req,res,next)=>{
   try{
      let result=await allfunc.createStudent(req.body)
     
      res.json({ID : result._id,name :result.name, status:"Student Added Successfully"})
   }catch(err){
      console.log(err);
    const error= handleError(err);
    
    res.status(400).json({error})
   }
   
 }
const findwithmentor=async(req,res,next)=>{
  // console.log("is it wokring ? ")
   const {mentor} = req.params
   const result=await allfunc.mentorid(mentor)
   res.send(result)
}
module.exports={
    signup_post:signup_post,   
    login_post:login_post,
    allStudents:allStudents,
    allTeachers:allTeachers,
    findstudent:findstudent,
    avgmarks:avgmarks,
    createStudent:createStudent,
    findTeacher : findTeacher,
    findwithmentor:findwithmentor
}