import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import authRouter from "./router/authentication.js"

const app = express()

//Mongo db connection
mongoose.connect('mongodb://localhost/ChatApp')
    .then(()=>{console.log('connection successfully')})
    .catch(err => {console.log(err)})
//Morgan
app.use(morgan('dev'))

//BodyParser
app.use(bodyParser.json())

//Router

app.use('/auth', authRouter)

//Cath 404 error 

app.use((req , res , next)=>{
    const err = new Error('Not Found')
    err.status = 404 
    next(err)
})

//Error handler

app.use((err , req , res , next)=>{
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})

app.listen(3000, ()=>{
    console.log('Listen on port 3000')
})