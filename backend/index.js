const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

let  min = 400, max = 3500;
// generating random values between 400 and 3500
let genRandom = (max, min) => {
    return Math.floor(Math.random() * max) + min;
}

//Routes
app.get("/data",(req,res)=>{
    let data = genRandom(max,min)
    res.send(data.toString())
})

app.listen(8080,(req,res)=>{
    console.log("server is running")
})