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
    console.log(user)
    res.send(`Hi ${name}! You have reached the dashboard page.`)
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

// POST Pages

module.exports = router;