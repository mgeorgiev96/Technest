const router = require('express').Router()
const path = require('path')
const User = require('../models/model')
const bcrypt = require('bcrypt')
const passport = require('passport')
const stripe = require('stripe')('sk_test_51GxXTwJWnlXzpGEmQ7QU6Vry213lP7XVpRiJ0rLxxwijpYPSBCeNDF4KISxQ2OEB1SFZE26nUKc2FmYGvI66to40008X6y2OQq')
const uniqid = require('uniqid')

//User Authentication
const userAuth = (req,res,next)=>{
    if(!req.user && !req.session.user){
        res.redirect('/')
    }else{
        next()
    }
}



router.get('/profile',userAuth,(req,res)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})
router.get('/item-info',userAuth,(req,res)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})
router.get('/item-info',userAuth,(req,res)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})

router.get('/favourites',userAuth,(req,res)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})
router.get('/shop',userAuth,(req,res)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})
router.get('/cart',userAuth,(req,res)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})
router.get('/purchase-history',userAuth,(req,res)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})
router.get('/storage',(req,res)=>{
    User.findOne({username:'AdminStorage'}).then(user=>{
        if(user){
            if(req.user){
                res.send({items:user.items,user:req.user})
            }else{
                res.send({items:user.items,user:req.session.user})
            }
        }
    }).catch(err=>console.log(err))
})


router.get('/logout',(req,res)=>{
    if(req.user){
        req.logout()
    }else{
        req.session.user = null
    }
    res.redirect('/')
})
router.post('/login',(req,res)=>{
    req.session.user = null
    User.findOne({username:req.body.username}).then(user=>{
        if(user){
            bcrypt.compare(req.body.password,user.password,(err,result)=>{
                if(result){
                    req.session.user = {
                        username: user.username,
                        history: user.history,
                        name: user.name,
                        favourites: user.favourites
                    }
                    res.redirect('/api/profile')
                }else{
                    res.redirect('/wrong-password')
                }
            })
        }else{
            res.redirect('/wrong-username')
        }
    }).catch(err=>console.log(err))
})

router.post('/signup',(req,res)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        User.findOne({username:req.body.username}).then(user=>{
            if(user){
                res.redirect('/email-invalid')
            }else{
                new User({
                    username: req.body.username,
                    password: hash,
                    name: req.body.name,
                    history: [],
                    favourites: []
                }).save().then(()=>res.redirect('/')).catch(err=>console.log(err))
            }
        }).catch(err=>console.log(err))
    })
})

router.get('/google',passport.authenticate('google',{
    scope: ['https://www.googleapis.com/auth/plus.login','email'],
    prompt: ['select_account']
}))

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    req.session.user = null
    res.redirect('/api/profile')
})

//Add Favourite
router.post('/save-favourite',(req,res)=>{
    User.findOne({username:req.body.user}).then(user=>{
        if(user){
            User.update({username:req.body.user},{
                $pull: {favourites: {id:req.body.item.id}}
            }).then(()=>{
                User.update({username:req.body.user},{
                    $push: {favourites: req.body.item}
                }).then(()=>{
                    User.findOne({username:req.body.user}).then(user=>{
                        if(req.user){
                            req.user = {
                                username: user.username,
                                name: user.name,
                                favourites: user.favourites,
                                history: user.history
                            }
                        }else{
                            req.session.user = {
                                username: user.username,
                                name: user.name,
                                favourites: user.favourites,
                                history: user.history
                            }
                        }
                    }).then(()=>{
                        if(req.user){
                            res.send(req.user)
                        }else{
                            res.send(req.session.user)
                        }
                    }).catch(err=>console.log(err))
                }).catch(err=>console.log(err))
            }).catch(err=>console.log(err))
        }
    }).catch(err=>console.log(err))
})

//Remove Favourite
router.post('/remove-favourite',(req,res)=>{
    User.update({username:req.body.user},{
        $pull: {favourites:{id:req.body.id}}
    }).then(()=>{
        User.findOne({username:req.body.user}).then(user=>{
            if(req.user){
                req.user = {
                    username: user.username,
                    name: user.name,
                    favourites: user.favourites,
                    history: user.history
                }
            }else{
                req.session.user = {
                    username: user.username,
                    name: user.name,
                    favourites: user.favourites,
                    history: user.history
                }
            }
        }).then(()=>{
            if(req.user){
                res.send(req.user)
            }else{
                res.send(req.session.user)
            }
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
})


//Make Payment
router.post('/payment',(req,res)=>{
    stripe.customers.create({
        email: req.body.email,
        source: req.body.token
    }).then(customer=>{
        stripe.charges.create({
            amount: req.body.price * 100,
            customer: customer.id,
            description: req.body.description,
            currency:'usd'

        })
    }).then(()=>{
        User.update({username:req.body.username},{
            $push: {history:{
                id: uniqid(),
                description: req.body.description,
                amount: req.body.price
            }}
        }).then(()=>{
            User.findOne({username:req.body.username}).then(user=>{
                if(req.user){
                    req.user={
                        username: user.username,
                        name: user.name,
                        history: user.history,
                        favourites: user.favourites
                    }
                }else{
                    req.session.user={
                        username: user.username,
                        name: user.name,
                        history: user.history,
                        favourites: user.favourites
                    }
                }
            }).then(()=>{
                if(req.user){
                    res.send(req.user)
                }else{
                    res.send(req.session.user)
                }
            }).catch(err=>console.log(err))
        }).catch(err=>console.log(err))
    })
})


//Delete Purchase History Item
router.post('/delete-payment',(req,res)=>{
    User.update({username:req.body.username},{
        $pull: {history: {id:req.body.id}}
    }).then(()=>{
        User.findOne({username:req.body.username}).then(user=>{
            if(req.user){
                req.user = {
                    username: user.username,
                    name: user.name,
                    history: user.history,
                    favourites: user.favourites
                }
            }else{
                req.session.user = {
                    username: user.username,
                    name: user.name,
                    history: user.history,
                    favourites: user.favourites
                } 
            }
        }).then(()=>{
            if(req.user){
                res.send(req.user)
            }else{
                res.send(req.session.user)
            }
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
})

module.exports = router