require("../db/db.js")();
const bcrypt = require('bcryptjs');
const personmodel = require("../model/personmodel.js");
const jwt = require("jsonwebtoken");

async function register(req,res){
    console.log(req.body);
    const {username, password, email} = req.body;
    try{
        const existingUser = await personmodel.findOne({email});
        if(existingUser)
            return res.status(400).send("person already exists");
        const newModel = new personmodel({username,password,email});
        const result = await newModel.save();
        if(result)
            res.status(201).send("succesfully registered the person");
        else 
            res.status(400).send({error: "can not add the person record"});
    } 
    catch(e){
        res.status(500).send("internal error");
    }
}
async function signin(req,res){
    const { password,email } = req.body;
    try{
        const existingUser = await personmodel.findOne({email});
        if(!existingUser)  return res.status.send("user not found");
        if(await bcrypt.compare(password,existingUser.password)){
            console.log("token generated")
            const token = jwt.sign({username:existingUser.username,email,},process.env.SECRET_KEY, {expiresIn: '1h'});
            console.log("token: ",token);
            res.cookie("token", token, {path:"/"}).status(201).json({username:existingUser.username, email, isAuthenticated:true});
        }
        else
            res.status(401).json({isAuthenticated:false});
    }
    catch(e){
        res.status(500).send({error:e});
    }
}
function authentication(req, res, next){
    const token = req.cookies.token
    console.log("token header: ",token);
    if(!token)
        return res.status(401).send("Login first!");
    //token = token.replace("Bearer","").trim();
    jwt.verify(token, "supersecret", (err,decoded)=>{
        if(err) return res.send("No Authorization!");
        req.user = decoded;
        console.log("decoded: ", decoded);
        next();
    })
}

module.exports = { register, signin, authentication };