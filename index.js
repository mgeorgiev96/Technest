const express = require('express')
const PORT = process.env.PORT||5000
const app = express()
const mongoose = require('mongoose')
const User = require('./models/model')
const uniqid = require('uniqid')
const path = require('path')
const privateRoutes = require('./routes/private-routes')
const publicRoutes = require('./routes/public-routes')
const cookieSession = require('cookie-session')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')

mongoose.connect('mongodb://mgeorgiev9611:martin12345@testcluster1-shard-00-00.u94v9.mongodb.net:27017,testcluster1-shard-00-01.u94v9.mongodb.net:27017,testcluster1-shard-00-02.u94v9.mongodb.net:27017/shophut?ssl=true&replicaSet=TestCluster1-shard-0&authSource=admin&retryWrites=true&w=majority',{ useUnifiedTopology: true ,useNewUrlParser: true })

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.set('view engine','ejs')

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: ['sho290tech01-299203key']
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/',publicRoutes)

app.use(express.static(path.resolve(__dirname,'./client/build')))
app.use(express.static(path.resolve(__dirname,'./styles')))


app.use('/api',privateRoutes)


app.listen(PORT,()=>{
    console.log(`Running on port:${PORT}.`)
})