const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const SALT_ROUNDS = 10;

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

module.exports = router;