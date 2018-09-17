const express =require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const userRoute = require('./routes/userRoute')
const articleRoute = require('./routes/articleRoute')

app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(cors())

mongoose.connect('mongodb://localhost/blog-db', { useNewUrlParser: true });

app.use('/users', userRoute)
app.use('/articles', articleRoute)

app.listen(3000, ()=> console.log('listening on port 3000'))