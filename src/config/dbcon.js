const mongoose = require('mongoose');
const DbConnect = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)
        if(connection){
            console.log("mongodb connect succesfully");
            
        }else{
            console.log("mongoDb is not connected");
        }
    } catch (error) {
        console.log(error.message); 
    }
}

module.exports=DbConnect