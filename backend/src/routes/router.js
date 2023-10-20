const express = require("express");
const cookieParser = require("cookie-parser");
const cwd = process.cwd();
const {register, signin, authentication} = require(cwd+"/src/controllers/usercontroller.js")

const router = express.Router();
router.use(express.json());
router.use(cookieParser());
router.use(express.urlencoded({extended:false}));

router.get("/get-cookie", (req,res)=>{
    res.cookie("sky","dark",{path:"/"}).send("cookie is set");
})

router.post("/register", register);

// router.get("/login", (req,res)=>{
//     if(req.cookies.token)
//         res.redirect("/dashboard");
//     else
//         res.render("login");
// });

router.post("/login", signin);

// router.get("/dashboard", authentication, (req,res)=>{
//     res.status(200).render("dashboard", {user:req.user})
// });

router.post("/money-transfer", authentication, (req,res)=>{
    const {amount, to} = req.body;
    res.send(`${amount} transferred to ${to}'s account`);
});

// router.get("/logout", (req,res)=>{
//     const token = req.cookies.token;
//     if(token){
//         res.clearCookie("token");
//         res.redirect("/");
//     }
//     else
//         res.send("No Login found")
// })
module.exports = router;