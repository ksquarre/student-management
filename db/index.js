const mongoose=require('mongoose');
const connString='mongodb+srv://kahkasha:123@cluster0.gikml.mongodb.net/majorpro?retryWrites=true&w=majority'
const mongooseConnection=async()=>{
    try{
        await mongoose.connect(connString,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('connected to database successfully');
    }catch(error){
        console.log('Error in connecting to the db');
    }
};

module.exports={
    mongooseConnection:mongooseConnection
};