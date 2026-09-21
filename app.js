require('dotenv').config()
const express = require('express');
const app = express()
const path = require('path')
const DbConnect = require('./src/config/dbcon')
DbConnect()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"src","views"))

const authrouter = require('./src/router/apis/authrouter')
app.use("/api",authrouter);

const homerouter = require('./src/router/homerouter')
app.use(homerouter)



const port = process.env.PORT
app.listen(port,()=>{
    console.log(`run this application in ${port} port`);
    
})