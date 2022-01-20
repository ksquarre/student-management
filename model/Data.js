const mongoose = require('mongoose')
const schema= mongoose.Schema;

const studentSchema= schema({
    _id: {
        type:Number,
        required :[true,'Please Enter ID']
    },
    name: {
        type : String,
        maxLength:25,
        required:[true, 'Please Enter Student Name'] 
    },
    age: {
        type:Number,
        required:[true, 'Please Enter Age']
    },
    subjects : {
        type :  [String],
        required:[true, 'Please Enter Subjects']
    },  
    marks: {
        type:Number,
        required:[true, 'Please Enter Marks']
    },
    mentor_id: {
        type:[Number],
        required:[true, 'Please Enter Mentor ID']
    },
    address :{
        type: String,
        maxLength:100,
        required:[true, 'Please Enter Address']
    }
  
});

const student =mongoose.model('student',studentSchema,'student');

const teacherSchema=schema({
    _id: {
        type:Number,
        required:[true, 'Please Enter ID']
        
    },
    name: {
        type : String,
        minlength:[2,"Minimum 2 characters for Name are Required"],
        maxlength:[25,"Name too Long, only 25 characters are allowed"],
        required:[true, 'Please Enter User Name']
    },
    subject : {
        type :  String,
        required:[true, 'Please Enter Subject']
    },  
   
    age: {
        type:Number,
        required:[true, 'Please Enter Age']
    },
    
    address :{
        type: String,
        maxLength:100,
        required:[true, 'Please Enter Address']
    }
  
})

const teacher =mongoose.model('teacher',teacherSchema,'teacher');

module.exports={
    student:student,
    teacher:teacher
}