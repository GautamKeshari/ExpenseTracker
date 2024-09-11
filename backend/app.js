const express= require('express');
const cors=require('cors');
const {db} =require("./db/db");
const {readdirSync} = require('fs');
const app=express()
require('dotenv').config()

const PORT= process.env.PORT;

//middlewares
app.use(express.json())
app.use(cors())

// routes  
readdirSync("./routes").map((route)=>app.use('/api/v1',require('./routes/' + route))) 

// app.get('/',(req,res)=>{
//     res.send("Hello World");
// })

const server=()=>{
    db()
    app.listen(PORT, () => {
        console.log("Server are listening on port: " + PORT);
    })
}

server();



// The fs.readdirSync() method is used to synchronously read the contents of a given directory. The method returns an array with all the file names or objects in the directory. The options argument can be used to change the format in which the files are returned from the method.
// Syntax: fs.readdirSync( path, options )