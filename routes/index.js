const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const SALT_ROUNDS = 10;

router.get('/',(req,res) => {
    res.render('start')
});

module.exports = router;