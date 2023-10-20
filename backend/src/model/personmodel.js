const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const personSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
});
personSchema.pre("save", async function(next){
    if(this.isModified("password")){
        const passwordHash = await bcrypt.hash(this.password, 10);
        this.password = passwordHash;
    }
    next();
})
const personModel = mongoose.model("asset", personSchema);

module.exports = personModel;