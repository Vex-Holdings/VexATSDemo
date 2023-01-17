const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const models = require('../models')
const Chart = require('chart.js')
const SALT_ROUNDS = 10;

// GET pages 
router.get('/',(req,res) => {
    res.render('start')
});

router.get('/atsportal',(req,res) => {
    res.render('atsportal')
});

router.get('/taportal',(req,res) => {
    res.render('taportal')
});

router.get('/register',(req,res) => {
    res.render('register')
})

router.get('/register2',(req,res) => {
    res.render('register2')
})

router.get('/login',(req,res) => {
    res.render('login')
})

router.get('/logout',(req,res,next) => {

    if(req.session) {
        req.session.destroy((error) => {
            if(error) {
                next(error)
            } else {
                res.redirect('/login')
            }
        })
    }
})

// POST pages

router.post('/login', async (req,res) => {
    let username = req.body.username
    let password = req.body.password

    let user = await models.User.findOne({
        where: {
            username: username
        }
    })
    if(user != null) {
        bcrypt.compare(password, user.password,(error, result) => {
            if(result) {
                // create a session
                if(req.session) {
                    req.session.user = {userId: user.id}
                    let session = req.session
                    if(user.accounttype == 'Personal' && user.status == 'user') {
                        res.redirect('/users/personal')
                    } else if (user.accounttype == 'Corporate' && user.status == 'user') {
                        res.redirect('/users/corporate')
                    } else if (user.accounttype == 'Staff' && user.status == 'principal') {
                        res.redirect('/users/controlpanel')
                    } else if (user.accounttype == 'Regulator') {
                        res.redirect('/users/regulator')
                    } else {
                        res.redirect('/users/dashboard')
                    }
                }
            } else {
                res.render('login',{message: 'Incorrect username or password'})
            }
        })
    } else { // if the user is null
        res.render('login',{message: 'Incorrect username or password'})
    }
})

router.post('/register', async (req,res) => {
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let prefphone = req.body.prefphone
    let phonenumber = req.body.phonenumber
    let email = req.body.email
    let accounttype = req.body.accounttype
    let username = req.body.username
    let password = req.body.password
    let status = req.body.status
    
    let persistedUser = await models.User.findOne({
        where: {
            username: username
        }
    })

    if(persistedUser == null) {

        bcrypt.hash(password, SALT_ROUNDS, async (error, hash) => {
            if(error) {
                res.render('register',{message: 'Error creating user!'})
            } else {
                let user = models.User.build({
                    username: username,
                    password: hash,
                    firstname: firstname,
                    lastname: lastname,
                    prefphone: prefphone,
                    phonenumber: phonenumber,
                    email: email,
                    accounttype: accounttype,
                    status: status
                })

                let savedUser = await user.save()
                if(savedUser != null) {
                    res.redirect('login')
                } else {
                    res.render('register',{message: 'User already exists!'})
                }
            }
        })
    } else {
        res.render('register',{message: 'User already exists!'})
    }
})

router.post('/register2', async (req,res) => {
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let prefphone = req.body.prefphone
    let phonenumber = req.body.phonenumber
    let email = req.body.email
    let accounttype = req.body.accounttype
    let username = req.body.username
    let password = req.body.password
    let status = req.body.status
    
    let persistedUser = await models.User.findOne({
        where: {
            username: username
        }
    })

    if(persistedUser == null) {

        bcrypt.hash(password, SALT_ROUNDS, async (error, hash) => {
            if(error) {
                res.render('register2',{message: 'Error creating user!'})
            } else {
                let user = models.User.build({
                    username: username,
                    password: hash,
                    firstname: firstname,
                    lastname: lastname,
                    prefphone: prefphone,
                    phonenumber: phonenumber,
                    email: email,
                    accounttype: accounttype,
                    status: status
                })

                let savedUser = await user.save()
                if(savedUser != null) {
                    res.redirect('login')
                } else {
                    res.render('register2',{message: 'User already exists!'})
                }
            }
        })
    } else {
        res.render('register2',{message: 'User already exists!'})
    }
})

router.post('/',(req,res) => {

})
module.exports = router;