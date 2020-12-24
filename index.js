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

mongoose.connect(process.env.MONGO_DB,{ useUnifiedTopology: true ,useNewUrlParser: true })

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.set('view engine','ejs')

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [process.env.SECRET_KEY]
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