var express= require('express')
var app=express()



const mongoose= require('mongoose')
const bodyParser = require("body-parser")

mongoose.connect(" mongodb://127.0.0.1:27017").then(()=>{
    console.log("db connected")
})



const Schema = mongoose.Schema({
    name:{
type:String,
require:true
    }
,



    email:{
        type:String,
        require:true
    }
    ,

    password:{
        type:String,
        require:true
    }
},{timestamps:true})



const shayariSchema= mongoose.Schema({

    category:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    }
    ,
    sid:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    }


},{timestamps:true})

const User = mongoose.model("user",Schema)

const Shayari = mongoose.model("shayari",shayariSchema)

app.use(bodyParser.urlencoded({extended:true}))


app.post("/signup", async(req,res)=>{

    const {name,username,email,password}= req.body

    const user = await User.create({name:name,email:email,password:password})
    res.send("data add")

})

 
app.post('/signin', async(req,res)=>{

    const {email,password}=req.body

   const user=  await User.findOne({email:email,password:password})

   if(user){
    res.send(user)
   }else{
    res.send("user not found")
   }
})



app.post('/shayari', async (req,res)=>{

    const {uid}= req.body

    const shayari = await Shayari.find({userid:uid})

    if(shayari){
        res.send(shayari)
     
    }
    else{
        res.send('record not found !!')
    }

})

app.put('/shayari',async(req,res)=>{

    const {category,content,uid} = req.body

    const shayari = await Shayari.create({category:category,content:content,userid:uid})

    if(shayari){
        res.send(shayari)
    }else{
        res.send("not added")
    }

})

app.delete('/shayari',async (req,res)=>{
 const {sid}= req.body

 const shayari = await Shayari.deleteOne({_id:sid})

 if(shayari){
    res.send({status:"sucess" ,shayari:shayari})
 }else{
    res.send("not deleted !!")
 }

})


app.patch('/shayari', async (req,res)=>{

    const {sid,category,content} = req.body
 const shayari = await Shayari.updateOne({_id:sid},{category:category,content:content})

 if(shayari){
    res.send(shayari)
 }
    else{

    res.send("record not updated")
 }


})



app.listen(8000)