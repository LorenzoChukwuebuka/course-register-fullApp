const express = require('express');
const router = express.Router();
const level = require('../../controllers/Admin/levels')

router.get('/level',level.level)

module.exports = router