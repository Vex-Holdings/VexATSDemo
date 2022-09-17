const express = require('express')
const { sequelize, Sequelize } = require('../models')
const router = express.Router()
// const {CanvasRenderService} = require('chartjs-node-canvas')
// const chart = require('../middlewares/chart')

const models = require('../models')

// GET Pages

router.get('/chart', async (req,res) => {
    let chartfill = [0,0,0,0,0,0,0,0,0,0,0]
    res.render('users/chart', {chartfill: chartfill})
})

router.get('/orders', async (req,res) => {
    let session = req.session
    let id = session.user.userId
    let user = await models.User.findOne({
        where: {
            id: id
        }
    })
    let stocks = await models.Stock.findAll({
        where: {
            status: "active"
        }
    })
    let name = user.firstname + " " + user.lastname
    res.render('users/orders', {name: name, stocks: stocks})
})

router.get('/regulator', async (req,res) => {
    let session = req.session
    let id = session.user.userId
    let user = await models.User.findOne({
        where: {
            id: id
        }
    })
    let name = user.firstname + " " + user.lastname
    res.render('users/regulator', {name: name})
})

router.get('/mshf-holding/:id', async (req,res) => {
    let mshfid = req.params.id
    let holding = await models.Mshf.findByPk(mshfid)
    let response = holding.dataValues
    let user = await models.User.findByPk(response.userid)
    let stock = await models.Stock.findByPk(response.stockid)
    res.render('users/mshf-holding', {response: response, user: user, stock: stock})
})

router.get('/stock-add',(req,res) => {
    res.render('users/stock-add')
})

router.get('/mshf-add', async (req,res) => {
    let session = req.session
    let id = session.user.userId
    let user = await models.User.findOne({
        where: {
            id: id
        }
    })
    let name = user.firstname
    let accounttype = user.accounttype
    let status = user.status
    if(accounttype == 'Staff' && status == 'principal') {
        res.render('users/mshf-add', {name: name})
    } else {
        res.send(`Sorry ${name}, you are not authorized for this page.`)
    }
})

router.get('/mshf-edit', async (req,res) => {
    const results = await sequelize.query('SELECT u.firstname, u.lastname, m.holding, m.status, s.name FROM "Mshfs" m JOIN "Users" u ON m.userid = u.id JOIN "Stocks" s ON m.stockid = s.id', {type: Sequelize.QueryTypes.SELECT})
    res.render('users/mshf-edit', {holders: results})
})

router.get('/controlpanel', async (req,res) => {
    let users = await models.User.findAll({
        where: {
            status: ['submitted', 'pending']
        }
    })
    res.render('users/controlpanel', {users: users})
})


router.get('/dashboard', async (req,res) => {
    
    let session = req.session
        
    let id = session.user.userId
    let user = await models.User.findOne({
        where: {
            id: id
        }
    })
    
    let holdings = await sequelize.query('SELECT m.holding, m.status, s.name FROM "Mshfs" m JOIN "Stocks" s ON m.stockid = s.id WHERE m.userid = ' + id, {type: Sequelize.QueryTypes.SELECT})
    
    let orders = await sequelize.query('SELECT o.type, o.size, o.price, s.name FROM "Orders" o JOIN "Stocks" s ON o.stockid = s.id WHERE o.userid = ' + id, {type: Sequelize.QueryTypes.SELECT})
    
    let bids = await models.Order.findAll({
        where: {
            stockid: 1,
            type: 'buy'
        },
        order: [
            ['price', 'DESC'],
        ]
    })
    let asks = await models.Order.findAll({
        where: {
            stockid: 1,
            type: 'sell'
        },
        order: [
            ['price', 'ASC'],
        ]
    })
    let trades = await models.Match.findAll({
        order: [
            ['id', 'DESC']
        ]
    })
    let name = user.firstname + " " + user.lastname
    let status = user.status
    let accounttype = user.accounttype
    if(status == 'user') {
        res.send(`Hi ${name}! The next step is to fill out the ${accounttype} <a href="/users/personal">new account form</a>.`)
    } else if(status == 'submitted') {
        res.send(`Hi ${name}! Your form has been submitted. You will receive notification of approval soon.`)
    } else if(status == 'pending') {
        res.send(`Hi ${name}, your application requires additional information. We will contact you shortly.`)
    } else if(status == 'approved') {
        res.render('users/dashboard',{holdings: holdings, orders: orders, bids: bids, asks: asks, trades: trades})
    } else {
        res.send(`Hi ${name}! You are ready for the <a href="/users/market">market page</a>`)
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
    res.render('users/personal',{user: user})
})

router.get('/accountdetails/:userId', async (req,res) => {
    let id = req.params.userId
    let contact = await models.User.findOne({
        where: {
            id: id
        }
    })
    let detail = await models.Personal.findOne({
        where: {
            userid: id
        }
    })
    res.render('users/accountdetails',{contact: contact, detail: detail})
})

// POST Pages

router.post('/place-sell-order', async (req,res) => {
    let session = req.session
    let id = session.user.userId
    let stockid = req.body.stockid
    let type = req.body.type
    let size = req.body.size
    let price = req.body.price
    let mshfid = req.body.mshfid
    let status = req.body.status
    
    let newSellOrder = await models.Order.build({
        userid: id,
        stockid: stockid,
        type: type,
        size: size,
        price: price,
        mshfid: mshfid
    })
    let newCodSell = await models.Codsell.build({
        mshfid: mshfid,
        amount: size,
        status: status
    })
    let persistedSellOrder = await newSellOrder.save()
    let persistedCodSell = await newCodSell.save()
    if(persistedSellOrder != null && persistedCodSell != null) {
        res.redirect('/users/dashboard')
    } else {
        res.render('user/sellcod',{message: 'We had a problem.'} )
    }
})

router.post('/place-buy-order', async (req,res) => {
    let session = req.session
    let id = session.user.userId
    let stockid = req.body.stockid
    let type = req.body.type
    let size = req.body.size
    let price = req.body.price
    let amount = req.body.amount
    let status = req.body.status
    
    let newBuyOrder = await models.Order.build({
        userid: id,
        stockid: stockid,
        type: type,
        size: size,
        price: price,
    })
    let newCodBuy = await models.Codbuy.build({
        userid: id,
        amount: amount,
        status: status
    })
    let persistedBuyOrder = await newBuyOrder.save()
    let persistedCodBuy = await newCodBuy.save()
    if(persistedBuyOrder != null && persistedCodBuy != null) {
        res.redirect('/users/dashboard')
    } else {
        res.render('user/buycod',{message: 'We had a problem.'} )
    }
})

router.post('/sellcod', async (req,res) => {
    let session = req.session
    let id = session.user.userId
    let stockid = req.body.stock
    let shares = req.body.shares
    let price = req.body.price
    let user = await models.User.findOne({
        where: {
            id: id
        }
    })
    let response = await models.Stock.findByPk(stockid)
    let stock = response.dataValues
    let mshf = await models.Mshf.findAll({
        where: {
            userid: id,
            stockid: stockid,
            status: 'unrestricted'
        }
    })
    
    res.render('users/sellcod',{id: id, stock: stock, shares: shares, price: price, user: user, mshf: mshf})
})

router.post('/buycod', async (req,res) => {
    let session = req.session
    let id = session.user.userId
    let stockid = req.body.stock
    let shares = req.body.shares
    let price = req.body.price
    let amount = (shares * price * 1.01).toFixed(2)
    let user = await models.User.findOne({
        where: {
            id: id
        }
    })
    let response = await models.Stock.findByPk(stockid)
    let stock = response.dataValues
    res.render('users/buycod',{id: id, stock: stock, shares: shares, price: price, amount: amount, user: user})
})

router.post('/mshf-holding/:id', async (req,res) => {
    let mshfid = req.body.id
    let holding = req.body.holding
    let status = req.body.status

    let result = await models.Mshf.update({
        holding: holding,
        status: status
    },{
        where: {
            id: mshfid
        }
    })
    res.redirect('/users/mshf-edit')
})

router.post('/stock-add', async (req,res) => {
    let name = req.body.name
    let status = req.body.status

    let newstock = models.Stock.build({
        name: name,
        status: status
    })
    let persistedNewStock = await newstock.save()
    if(persistedNewStock != null) {
        res.redirect('/users/mshf-add')
    } else {
        res.render('users/stock-add',{message: 'Unable to add stock'})
    }
})

router.post('/mshf-add', async (req,res) => {
    let userid = req.body.userid
    let stockid = req.body.stockid
    let holding = req.body.holding
    let status = req.body.status

    let entry = models.Mshf.build({
        userid: userid,
        stockid: stockid,
        holding: holding,
        status: status
    })
    let persistedEntry = await entry.save()
    if(persistedEntry != null) {
        res.redirect('/users/mshf-edit')
    } else {
        res.render('users/mshf-add',{message: 'Unable to add holding'})
    }
})

router.post('/personal', async (req,res) => {
    let userid = req.body.userid
    let addressline1 = req.body.addressline1
    let addressline2 = req.body.addressline2
    let addresscity = req.body.addresscity
    let addressstate = req.body.addressstate
    let addresszip = req.body.addresszip
    let maritalstatus = req.body.maritalstatus
    let dependants = req.body.dependants
    let employmentstatus = req.body.employmentstatus
    let jobtitle = req.body.jobtitle
    let occupation = req.body.occupation
    let employername = req.body.employername
    let employertime = req.body.employertime
    let employeraddress = req.body.employeraddress
    let employersuite = req.body.employersuite
    let employercity = req.body.employercity
    let employerstate = req.body.employerstate
    let employerzip = req.body.employerzip
    let dateofbirth = req.body.dateofbirth
    let citizenship = req.body.citizenship
    let taxidtype = req.body.taxidtype
    let taxidnumber = req.body.taxidnumber
    let identitydocument = req.body.identitydocument
    let identityissuer = req.body.identityissuer
    let identitynumber = req.body.identitynumber
    let identityissuedate = req.body.identityissuedate
    let identityexpiredate = req.body.identityexpiredate
    let accounttype = req.body.accounttype
    let customertype = req.body.customertype
    let associated = req.body.associated
    let associatedtype = req.body.associatedtype
    let associatedorganization = req.body.associatedorganization
    let pubco = req.body.pubco
    let pubconame = req.body.pubconame
    let pep = req.body.pep
    let pepcountry = req.body.pepcountry
    let investmentobjective = req.body.investmentobjective
    let investmentexperience = req.body.investmentexperience
    let risktolerance = req.body.risktolerance
    let timehorizon = req.body.timehorizon
    let liquidity = req.body.liquidity
    let income = req.body.income
    let networth = req.body.networth
    let taxstatus = req.body.taxstatus
    let status = 'submitted'

    let personal = models.Personal.build({
        userid: userid,
        addressline1: addressline1,
        addressline2: addressline2,
        addresscity: addresscity,
        addressstate: addressstate,
        addresszip: addresszip,
        maritalstatus: maritalstatus,
        dependants: dependants,
        employmentstatus: employmentstatus,
        jobtitle: jobtitle,
        occupation: occupation,
        employername: employername,
        employertime: employertime,
        employeraddress: employeraddress,
        employersuite: employersuite,
        employercity: employercity,
        employerstate: employerstate,
        employerzip: employerzip,
        dateofbirth: dateofbirth,
        citizenship: citizenship,
        taxidtype: taxidtype,
        taxidnumber: taxidnumber,
        identitydocument: identitydocument,
        identityissuer: identityissuer,
        identitynumber: identitynumber,
        identityissuedate: identityissuedate,
        identityexpiredate: identityexpiredate,
        accounttype: accounttype,
        customertype: customertype,
        associated: associated,
        associatedtype: associatedtype,
        associatedorganization: associatedorganization,
        pubco: pubco,
        pubconame: pubconame,
        pep: pep,
        pepcountry: pepcountry,
        investmentobjective: investmentobjective,
        investmentexperience: investmentexperience,
        risktolerance: risktolerance,
        timehorizon: timehorizon,
        liquidity: liquidity,
        income: income,
        networth: networth,
        taxstatus: taxstatus
    })
    let savedPersonal = await personal.save()
   
    const submitted = await models.User.update({
        status: status
    },{
        where: {
            id: userid
        }
    })

    if(savedPersonal != null) {
        res.redirect('/users/dashboard')
    } else {
        res.render('users/personal',{message: 'Unable to submit new account form'})
    }
})

router.post('/accountdetails/:userId', async (req,res) => {
    let id = req.params.userId
    let status = req.body.status
    const submitted = await models.User.update({
        status: status
    },{
        where: {
            id: id
        }
    })
    if(submitted !=null) {
        res.redirect('/users/controlpanel')
    }
})

module.exports = router;