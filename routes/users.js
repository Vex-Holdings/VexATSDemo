const express = require('express')
const router = express.Router()

const models = require('../models')

// GET Pages

router.get('/dashboard', async (req,res) => {
    
    let session = req.session
        
    let id = session.user.userId
    let user = await models.User.findOne({
        where: {
            id: id
        }
    })

    let name = user.firstname
    let status = user.status
    let accounttype = user.accounttype
    // console.log(user)
    if(status == null) {
        res.send(`Hi ${name}! The next step is to fill out the ${accounttype} <a href="/users/personal">new account form</a>.`)
    } else {
        res.send(`Hi ${name}! You have reached the dashboard page. You are ready for the order or <a href="/users/market">market page</a>`)
    }
    
})

router.get('/market', async (req,res) => {
    let session = req.session
    let id = session.user.userId
    let user = await models.User.findOne({
        where: {
            id: id
        }
    })
    let name = user.firstname
    res.send(`Hi, ${name}, welcome to the market page`)
})

router.get('/personal', async (req,res) => {
    let session = req.session
    let id = session.user.userId
    let user = await models.User.findOne({
        where: {
            id: id
        }
    })
    let name = user.firstname + " " + user.lastname
    res.send(`Hi, ${name}, this is where we will put the new account form`)
})

// POST Pages

module.exports = router;