const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/model')

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{
        done(null,user)
    })
})

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},(accessToken,refreshToken,profile,done)=>{
    User.findOne({username:profile._json.email}).then(user=>{
        if(user){
            done(null,user)
        }else{
            new User({
                username: profile._json.email,
                password: profile._json.sub,
                name: profile._json.name,
                history: [],
                favourites: []
            }).save().then(()=>done(null,user)).catch(err=>console.log(err))
        }
    }).catch(err=>console.log(err))
}))