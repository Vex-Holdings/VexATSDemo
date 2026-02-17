const models = require('../models')

async function getAllUsers(req,res,next) {

    let allusers = await models.User.findAll()
    res.locals.allusers = allusers
    next()
}

module.exports = getAllUsers