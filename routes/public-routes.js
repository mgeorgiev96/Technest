const router = require('express').Router()

router.get('/',(req,res)=>{
    res.render('login')
})

router.get('/signup',(req,res)=>{
    res.render('signup')
})

router.get('/wrong-username',(req,res)=>{
    res.render('wrong-username')
})
router.get('/wrong-password',(req,res)=>{
    res.render('wrong-password')
})
router.get('/email-invalid',(req,res)=>{
    res.render('invalid')
})

module.exports = router