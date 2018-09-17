const express =require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const userRoute = require('./routes/userRoute')
const articleRoute = require('./routes/articleRoute')

app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(cors())

mongoose.set('useFindAndModify', false);

if(process.env.DB_TEST === 'TEST'){
    console.log('blog-db-TEST connected')
    mongoose.connect(`mongodb://localhost/blog-db-test`, { useNewUrlParser: true });
}else{
    console.log('blog-db connected');
    mongoose.connect('mongodb://localhost/blog-db', { useNewUrlParser: true });
}

app.use('/users', userRoute)
app.use('/articles', articleRoute)

app.listen(3000, ()=> console.log('listening on port 3000'))

module.exports = app