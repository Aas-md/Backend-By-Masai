let express = require('express');
let router = express.Router();
let User = require('./userSchema');

router.get('/', async (req, res) => {
    res.send("Welcome to User API");
})

module.exports = router;