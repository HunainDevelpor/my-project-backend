const mongoose = require('mongoose');
const ConnectMongoDB=async()=>{

await mongoose.connect(process.env.MONGODB_URL)
.then((res)=>{
    console.log("DataBase Connected");
    
}).catch((err)=>{
console.log("Database Connection Failed",err);

})

}
module.exports=ConnectMongoDB