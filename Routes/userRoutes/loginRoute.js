const express = require('express');
const router = express.Router();
const login = require('../../controllers/User/login')


router.post('/',login.logUser)



module.exports = router