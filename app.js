const express= require('express')
const app= express()
const logger = require('morgan')

//const userRoutes= require('./routes/users')


var mongoose = require('mongoose')
var mongoDB = 'mongodb+srv://srimaan:'+process.env.MONGO_ATLAS_PW+'@cluster0-ujclr.mongodb.net/movie_list?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true })
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(logger('dev'))
app.use('/',(req,res,next)=>{
	res.status(200).json({
		message:'hello world'
	})
})
//app.use('/users', userRoutes)

module.exports=app;