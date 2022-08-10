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

    let status = user.lastname
    console.log(user)
    res.send(`Reached dashboard page, status: ${status}`)
})

// POST Pages

module.exports = router;