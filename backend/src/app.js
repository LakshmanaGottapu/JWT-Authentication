require("dotenv").config();
const express = require("express");
const router = require("./routes/router.js");
const hbs = require("hbs");
const app = express();
const cwd = process.cwd();
const path = require("path");
const port = process.env.PORT; 
const cors = require('cors');
const corsOptions = {
    origin: "http://localhost:3000", // Replace with your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Include credentials (cookies, HTTP authentication) in the CORS request if needed
    optionsSuccessStatus: 204, // Respond with a 204 No Content status for preflight requests
  };

app.use(cors(corsOptions));
app.use(express.static(path.join(cwd,"public")));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(cwd,"views","partials"));
app.use("/", router);
app.listen(5500,()=>console.log(`listening to http://localhost:${port}`));