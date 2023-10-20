const mongoose = require("mongoose");

let mongoConnection = async ()=>{
    try{
        dbConnection = await mongoose.connect(process.env.DATABASE, {useNewUrlParser :true, useUnifiedTopology : true});
        if(dbConnection) {
            console.log("connected to mongodb ");
        }
        else console.log("problem with connecting to the mongodb server");
    }
    catch(err) {console.log(err)}
};

module.exports = mongoConnection;