const { decode } = require('jsonwebtoken');
const schemas=require('./Data');

const addTeacher= async(details)=>{
    let object = new schemas.teacher({
        _id :details._id,
        name:details.name,
        subject : details.subject,
        age:details.age,
        address:details.address
    })
    const res= await object.save();
    return res;
}
const createStudent= async(details)=>{
  
    let object = new schemas.student({
        _id :details._id,
        name:details.name,
        age:details.age,
        subjects : details.subjects,
        marks: details.marks,
        mentor_id:details.mentor_id,
        address:details.address
    })
    const res= await object.save();
    return res;
}

const getAllStudents=async()=>{
    const result=await schemas.student.find();
  
    return result;
}
const getAllTeachers=async()=>{
    const result=await schemas.teacher.find();
  
    return result;
}
const getStudent=async(name)=>{
    
    const result=await schemas.student.find({name});
  
    return result;
}
const getTeacher=async(subject)=>{
    
    const result=await schemas.teacher.find({subject:subject});
  
    return result;
}
const mentorid=async(mentor)=>{
    const result=await schemas.student.find({mentor_id:mentor});
    return result
    // console.log(result);
    // const ans=[];

    // for(let x of result){
    //     for(let y of x.mentor_id){
    //         if(y==mentor){
    //             ans.push(x);
    //             break;
    //         }
    //     }
    // }
     // return ans;
   
}

const login =async(_id,name)=>{
    const user= await schemas.teacher.findOne({_id});
    console.log(user._id,user.name);
    if(user){
        if(name==user.name){
            return user;
        }
        throw Error("incorrect username")
    }
    throw Error("incorrect ID")
}
const studMarks =async(value)=>{
    const user= await schemas.student.find({ marks: { $gte: value } });
    // const result=[];   
    // for( let x of user){
    //     if(x.marks>=value){
    //         result.push(x);
    //     }
    // }
    // return result
    return user;
}
module.exports ={
    addTeacher:addTeacher,
    getAllStudents:getAllStudents,
    getStudent :getStudent,
    login:login,
    studMarks:studMarks,
    createStudent:createStudent,
    getAllTeachers:getAllTeachers,
    getTeacher:getTeacher,
   mentorid:mentorid
}