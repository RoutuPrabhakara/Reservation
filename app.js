const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')
const dotenv = require('dotenv')

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()
mongoose.connect('mongodb+srv://routuprabhakar2000:routu123@cluster0.0o7o8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("Mongodb is conceted")
})
.catch(()=>{
    console.log('Error')
})
const userSchema = new mongoose.Schema(({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    guests:{
        type:Number,
        required:true
    }
}))
   
const database = mongoose.model('database',userSchema)


app.post('/registration',async(req,res)=>{
    try {
        const newData = req.body
        // newData.date = new Date(newData.date)
        // console.log(newData)
        const newpost = new database(newData)
        await newpost.save()
        res.json({
            message:"fb connected",
            data:newpost
        })
    } catch (error) {
        res.json({
            data:error
        })
        console.log('error')
    }
})

app.get('/getreservations',async(req,res)=>{
    try {
        const reservation =  await database.find();
        const formatedata = reservation.map(reservation =>({
                ...reservation_doc,
                date:reservation.date.toISOString().split('T')[0]
        }))
        res.json(formatedata)
    } catch (error) {
        console.log(error)
    }
})

app.listen(5000,()=>{
    console.log('Server is connected')
})