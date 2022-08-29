const express = require('express')
const router = express.Router()

const models = require('../models')

// GET Pages

router.get('/controlpanel', async (req,res) => {
    let users = await models.User.findAll({
        where: {
            status: 'submitted'
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

    let name = user.firstname
    let status = user.status
    let accounttype = user.accounttype
    // console.log(user)
    if(status == 'user') {
        res.send(`Hi ${name}! The next step is to fill out the ${accounttype} <a href="/users/personal">new account form</a>.`)
    } else if(status == 'submitted') {
        res.send(`Hi ${name}! Your form has been submitted. You will receive notification of approval soon.`)
    } else {
        res.send(`Hi ${name}! You are ready for the order or <a href="/users/market">market page</a>`)
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

module.exports = router;