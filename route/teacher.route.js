const router=require('express').Router();
const jwt= require('jsonwebtoken');
const teacherController=require('../controller/teacher.controller')

let flag=false;
const auth=(req,res,next)=>{
    
    const token=req.cookies.jwt
    if(token){
        jwt.verify(token,'secret key',(err,decodedToken)=>{
            if(err){
               
               // console.log("BHAI YE KONSA ERROR HAI ",err.message)
               
            }else{
                console.log(decodedToken)
                flag=true;
                next();
            }
        })
    }else{
       
        if(flag)
        {
            res.send("Token Expired, Please Login Again")
            flag=false;
        }
        else
        res.send("Unauthorised person. Please sign up")
    }
   
}



router.post('/createteacher',auth,teacherController.signup_post)
router.post('/login',teacherController.login_post)
router.post('/createstudent',auth,teacherController.createStudent)
router.get('/allteachers',auth,teacherController.allTeachers)
router.get('/allteachers/:subject',auth,teacherController.findTeacher)
router.get('/allstudents',auth,teacherController.allStudents)
router.get('/allstudents/:name',auth,teacherController.findstudent)
router.get('/:mentor',auth,teacherController.findwithmentor)
router.get('/getavgmarks/:value',auth,teacherController.avgmarks)

module.exports=router;