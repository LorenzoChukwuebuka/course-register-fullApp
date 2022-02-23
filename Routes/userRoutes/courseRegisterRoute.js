const express = require('express');
const router = express.Router();
const courseRegister = require('../../controllers/User/courseRegister')

router.post('/',courseRegister.register)



module.exports = router