const express = require('express')
const { sequelize, Sequelize } = require('../models')
const router = express.Router()
// const {CanvasRenderService} = require('chartjs-node-canvas')
// const chart = require('../middlewares/chart')

const models = require('../models')

// GET Pages

router.get('/ta-clear', async (req,res) => {

    res.render('users/ta-clear')
})

router.get('/testdbquery', async (req,res) => {
    const matchedOrders = await sequelize.query('SELECT * FROM "Matches" WHERE status=\'matched\'', {type: Sequelize.QueryTypes.SELECT})
    const matchId = matchedOrders[0]["id"]
    const matchBuyId = matchedOrders[0]["buyid"]
    const matchSellId = matchedOrders[0]["sellid"]
    const matchSize = matchedOrders[0]["size"]
    const matchPrice = matchedOrders[0]["price"]
    const matchStatus = matchedOrders[0]["status"]
    const buyOrder = await sequelize.query('SELECT * FROM "Orders" WHERE id= ' + matchBuyId, {type: Sequelize.QueryTypes.SELECT})
    const sellOrder = await sequelize.query('SELECT * FROM "Orders" WHERE id= ' + matchSellId, {type: Sequelize.QueryTypes.SELECT})

    console.log('id: ' + matchId)
    console.log('buyid: ' + matchBuyId)
    console.log('sellid: ' + matchSellId)
    console.log('size: ' + matchSize)
    console.log('price: $' + matchPrice)
    console.log('status: ' + matchStatus)
    console.log(buyOrder)
    console.log(sellOrder)
    // res.render('users/testdbquery', {})
})

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
    let matches = await models.Match.findAll()
    let orders = await sequelize.query('SELECT o.id, u.firstname, u.lastname, s.name, o.type, o.size, o.price, o.mshfid FROM "Orders" o JOIN "Users" u ON o.userid = u.id JOIN "Stocks" s ON o.stockid = s.id', {type: Sequelize.QueryTypes.SELECT})
    let codlogs = await models.Codlog.findAll()
    let codbuys = await sequelize.query('SELECT c.id, u.firstname, u.lastname, c.amount, c.status FROM "Codbuys" c JOIN "Users" u ON c.userid = u.id', {type: Sequelize.QueryTypes.SELECT})
    let codsells = await models.Codsell.findAll()
    res.render('users/controlpanel', {users: users, matches: matches, orders: orders, codlogs: codlogs, codbuys: codbuys, codsells: codsells})
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
    let orders = await sequelize.query('SELECT o.id, o.type, o.size, o.price, s.name FROM "Orders" o JOIN "Stocks" s ON o.stockid = s.id WHERE o.userid = ' + id + 'AND (o.type = \'buy\' OR o.type = \'sell\')', {type: Sequelize.QueryTypes.SELECT})
    
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
            ['price', 'DESC'],
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

router.post('/delete-order',async (req,res) => {
    let orderId = parseInt(req.body.orderId)
    let orderType = req.body.orderType
    let result = await models.Order.update({
        type: orderType + '- user cancelled'
    },{
        where: {
            id: orderId
        }
    })
    // Need to add a models.Mshf.update to change the status of the certificate attached to the sell order back to "unrestricted" as soon as I change the place sell order to ensure that it is changed to "COD Initiated"
    res.redirect('/users/dashboard')
})

router.post('/place-sell-order', async (req,res) => {
    let session = req.session
    let id = session.user.userId
    let stockid = req.body.stockid
    let type = req.body.type
    let size = req.body.size
    let price = req.body.price
    let mshfid = req.body.mshfid
    let status = req.body.status
    // find out the best bid (ie. the highest bid in the Order Book)
    let bestBid = await sequelize.query('SELECT * FROM "Orders" WHERE type=\'buy\' ORDER BY price DESC LIMIT 1' , {type: Sequelize.QueryTypes.SELECT})
    let bidId = bestBid[0]["id"]
    let bidUserId = bestBid[0]["userid"]
    let bidSize = bestBid[0]["size"]
    let bidPrice = bestBid[0]["price"]

    if(price < bidPrice) {
        // don't want to cross the market
        res.render('user/crossedsell',{price: price, bidPrice: bidPrice})
    } else if(price == bidPrice && id == bidUserId) {
        // dont want to trade with ourselves
        res.render('user/sellpaint',{price: price})
    } else if(price == bidPrice && size > bidSize) {
        // find out how much remains so that we can place a limit order for the balance at the end
        let remainingSize = size - bidSize
        // Start by creating the order so we can use the sellid to match the trade
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
            status: status // will need to change this to "COD Initiated"
        })
        let startingSellOrder = await newSellOrder.save()
        let startingCodSell = await newCodSell.save()
        if(startingSellOrder != null && startingCodSell != null) {
            // Create a match of the newly created order and the bestBid
            let result = await sequelize.query('SELECT id FROM "Orders" ORDER BY ID DESC LIMIT 1', {type: Sequelize.QueryTypes.SELECT})
            let sellid = result[0]["id"]
            let buyid = bidId
            let newMatch = await models.Match.build({
                buyid: buyid,
                sellid: sellid,
                size: bidSize,
                price: price,
                status: 'matched'
            })
            let persistedMatch = await newMatch.save()
            // change the status of the bestBid
            let spendBuy = models.Order.update({
                type: 'buy-filled'
            },{
                where: {
                    id: buyid
                }
            })
            // let persistedSpendBuy = spendBuy.save()
            // change the status of the startingSellOrder
            let spendSell = models.Order.update({
                type: 'sell-partial'
            },{
                where: {
                    id: sellid
                }
            })
            // let persistedSpendSell = spendSell.save()
            // create new sell order with unsold portion
            let remainingSellOrder = await models.Order.build({
                userid: id,
                stockid: stockid,
                type: type,
                size: remainingSize,
                price: price,
                mshfid: mshfid //mshfid will update with TA ops
            })
            let persistedRemainingSellOrder = await remainingSellOrder.save()
            if(persistedMatch != null && spendBuy != null && spendSell != null && persistedRemainingSellOrder != null) {
                res.redirect('/users/dashboard')
            }
        }
    } else if(price == bidPrice && size < bidSize) {
        // find out how much remains so that we can update the buy order for the balance at the end
        let remainingSize = bidSize - size
        // Start by creating the order so we can use the sellid to match the trade
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
        let startingSellOrder = await newSellOrder.save()
        let startingCodSell = await newCodSell.save()
        if(startingSellOrder != null && startingCodSell != null) {
            // Create a match of the newly created order and the bestBid
            let result = await sequelize.query('SELECT id FROM "Orders" ORDER BY ID DESC LIMIT 1', {type: Sequelize.QueryTypes.SELECT})
            let sellid = result[0]["id"]
            let buyid = bidId
            let newMatch = await models.Match.build({
                buyid: buyid,
                sellid: sellid,
                size: size,
                price: price,
                status: 'matched'
            })
            let persistedMatch = await newMatch.save()
            // change the status of the bestBid
            let spendBuy = models.Order.update({
                type: 'buy-partial'
            },{
                where: {
                    id: buyid
                }
            })
            // let persistedSpendBuy = spendBuy.save()
            // change the status of the startingSellOrder
            let spendSell = models.Order.update({
                type: 'sell-filled'
            },{
                where: {
                    id: sellid
                }
            })
            // let persistedSpendSell = spendSell.save()
            // create new buy order with unbought portion
            let remainingBuyOrder = await models.Order.build({
                userid: bidUserId,
                stockid: stockid,
                type: 'buy',
                size: remainingSize,
                price: price
            })
            let persistedRemainingBuyOrder = await remainingBuyOrder.save()
            if(persistedMatch != null && spendBuy != null && spendSell != null && persistedRemainingBuyOrder != null) {
                res.redirect('/users/dashboard')
            }
        }
    } else if(price == bidPrice && size == bidSize) {
        // Start by creating the order so we can use the sellid to match the trade
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
        let startingSellOrder = await newSellOrder.save()
        let startingCodSell = await newCodSell.save()
        if(startingSellOrder != null && startingCodSell != null) {
            // Create a match of the newly created order and the bestBid
            let result = await sequelize.query('SELECT id FROM "Orders" ORDER BY ID DESC LIMIT 1', {type: Sequelize.QueryTypes.SELECT})
            let sellid = result[0]["id"]
            let buyid = bidId
            let newMatch = await models.Match.build({
                buyid: buyid,
                sellid: sellid,
                size: size,
                price: price,
                status: 'matched'
            })
            let persistedMatch = await newMatch.save()
            // change the status of the bestBid
            let spendBuy = models.Order.update({
                type: 'buy-filled'
            },{
                where: {
                    id: buyid
                }
            })
            // let persistedSpendBuy = spendBuy.save()
            // change the status of the startingSellOrder
            let spendSell = models.Order.update({
                type: 'sell-filled'
            },{
                where: {
                    id: sellid
                }
            })
            // let persistedSpendSell = spendSell.save()
            if(persistedMatch != null && spendBuy != null && spendSell != null) {
                res.redirect('/users/dashboard')
            }
        }
    } else if(price > bidPrice) {
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
        }
    } else {
        res.render('user/buycod',{message: 'We had a problem.'} )
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
    // find out the best ask (ie. the lowest offer in the Order Book)
    let bestAsk = await sequelize.query('SELECT * FROM "Orders" WHERE type=\'sell\' ORDER BY price ASC LIMIT 1' , {type: Sequelize.QueryTypes.SELECT})
    let askId = bestAsk[0]["id"]
    let askUserId = bestAsk[0]["userid"]
    let askSize = bestAsk[0]["size"]
    let askPrice = bestAsk[0]["price"]
    let askMshfid = bestAsk[0]["mshfid"]
    
    if(price > askPrice) {
        // don't want to cross the market
        res.render('users/crossedbuy',{price: price, askPrice: askPrice})
    } else if(price == askPrice && id == askUserId) {
        // dont want to trade with ourselves
        res.render('users/buypaint',{price: price})
    } else if(price == askPrice && size > askSize) {
        // find out how much remains so that we can place a limit order for the balance at the end
        let remainingSize = size - askSize
        // Start by creating the order so we can use the buyid to match the trade
        let newBuyOrder = await models.Order.build({
            userid: id,
            stockid: stockid,
            type: type,
            size: size,
            price: price
        })
        let newCodBuy = await models.Codbuy.build({
            userid: id,
            amount: amount,
            status: status
        })
        let startingBuyOrder = await newBuyOrder.save()
        let startingCodBuy = await newCodBuy.save()
        if(startingBuyOrder != null && startingCodBuy != null) {
            // Create a match of the newly created order and the bestBid
            let result = await sequelize.query('SELECT id FROM "Orders" ORDER BY ID DESC LIMIT 1', {type: Sequelize.QueryTypes.SELECT})
            let buyid = result[0]["id"]
            let sellid = askId
            let newMatch = await models.Match.build({
                buyid: buyid,
                sellid: sellid,
                size: askSize,
                price: price,
                status: 'matched'
            })
            let persistedMatch = await newMatch.save()
            // change the status of the bestAsk
            let spendSell = models.Order.update({
                type: 'sell-filled'
            },{
                where: {
                    id: sellid
                }
            })
            // let persistedSpendSell = spendSell.save()
            // change the status of the startingBuyOrder
            let spendBuy = models.Order.update({
                type: 'buy-partial'
            },{
                where: {
                    id: buyid
                }
            })
            // let persistedSpendBuy = spendBuy.save()
            // create new buy order for the left over bid
            let remainingBuyOrder = await models.Order.build({
                userid: id,
                stockid: stockid,
                type: type,
                size: remainingSize,
                price: price
            })
            let persistedRemainingBuyOrder = await remainingBuyOrder.save()
            if(persistedMatch != null && spendBuy != null && spendSell != null && persistedRemainingBuyOrder != null) {
                res.redirect('/users/dashboard')
            }
        }
    } else if(price == askPrice && size < askSize) {
        // find out how much remains so that we can update the buy order for the balance at the end
        let remainingSize = askSize - size
        // Start by creating the order so we can use the sellid to match the trade
        let newBuyOrder = await models.Order.build({
            userid: id,
            stockid: stockid,
            type: type,
            size: size,
            price: price
        })
        let newCodBuy = await models.Codbuy.build({
            userid: id,
            amount: amount,
            status: status
        })
        let startingBuyOrder = await newBuyOrder.save()
        let startingCodBuy = await newCodBuy.save()
        if(startingBuyOrder != null && startingCodBuy != null) {
            // Create a match of the newly created order and the bestAsk
            let result = await sequelize.query('SELECT id FROM "Orders" ORDER BY ID DESC LIMIT 1', {type: Sequelize.QueryTypes.SELECT})
            let buyid = result[0]["id"]
            let sellid = askId
            let newMatch = await models.Match.build({
                buyid: buyid,
                sellid: sellid,
                size: size,
                price: price,
                status: 'matched'
            })
            let persistedMatch = await newMatch.save()
            // change the status of the startingBuyOrder
            let spendBuy = models.Order.update({
                type: 'buy-filled'
            },{
                where: {
                    id: buyid
                }
            })
            // let persistedSpendBuy = spendBuy.save()
            // change the status of the bestAsk
            let spendSell = models.Order.update({
                type: 'sell-partial'
            },{
                where: {
                    id: sellid
                }
            })
            // let persistedSpendSell = spendSell.save()
            // create new sell order with unbought portion
            let remainingSellOrder = await models.Order.build({
                userid: askUserId,
                stockid: stockid,
                type: 'sell',
                size: remainingSize,
                price: price,
                mshfid: askMshfid
            })
            let persistedRemainingSellOrder = await remainingSellOrder.save()
            if(persistedMatch != null && spendBuy != null && spendSell != null && persistedRemainingSellOrder != null) {
                res.redirect('/users/dashboard')
            }
        }
    } else if(price == askPrice && size == askSize) {
        // Start by creating the order so we can use the buyid to match the trade
        let newBuyOrder = await models.Order.build({
            userid: id,
            stockid: stockid,
            type: type,
            size: size,
            price: price
        })
        let newCodBuy = await models.Codbuy.build({
            userid: id,
            amount: amount,
            status: status
        })
        let startingBuyOrder = await newBuyOrder.save()
        let startingCodBuy = await newCodBuy.save()
        if(startingBuyOrder != null && startingCodBuy != null) {
            // Create a match of the newly created order and the bestAsk
            let result = await sequelize.query('SELECT id FROM "Orders" ORDER BY ID DESC LIMIT 1', {type: Sequelize.QueryTypes.SELECT})
            let buyid = result[0]["id"]
            let sellid = askId
            let newMatch = await models.Match.build({
                buyid: buyid,
                sellid: sellid,
                size: size,
                price: price,
                status: 'matched'
            })
            let persistedMatch = await newMatch.save()
            // change the status of the bestBid
            let spendBuy = models.Order.update({
                type: 'buy-filled'
            },{
                where: {
                    id: buyid
                }
            })
            // let persistedSpendBuy = spendBuy.save()
            // change the status of the startingSellOrder
            let spendSell = models.Order.update({
                type: 'sell-filled'
            },{
                where: {
                    id: sellid
                }
            })
            // let persistedSpendSell = spendSell.save()
            if(persistedMatch != null && spendBuy != null && spendSell != null) {
                res.redirect('/users/dashboard')
            }
        }
    } else if(price < askPrice) {
        let newBuyOrder = await models.Order.build({
            userid: id,
            stockid: stockid,
            type: type,
            size: size,
            price: price
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
        }
    } else {
        res.render('users/buycod',{message: 'We had a problem.'} )
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
    let amount = (shares * price * 1.005).toFixed(2)
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