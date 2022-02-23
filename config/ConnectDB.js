console.clear();
//imports
const mongoose=require('mongoose');

//connection to DB
const connectDB=async ()=>{
    try {
       let result= await mongoose.connect(process.env.DB_URL,{useNewUrlParser: true ,useUnifiedTopology:true});
       console.log("DB Connected");
    } catch (e) {
    console.log("Can not connect to DB",e);
    }

}
//exportation
module.exports=connectDB;