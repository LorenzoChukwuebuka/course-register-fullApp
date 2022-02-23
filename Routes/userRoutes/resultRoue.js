const express = require('express');
const router = express.Router();

let students = require('../../controllers/User/result')

router.post('/',students.Result)
router.post('/courseregister',students.showcourseregister)

module.exports = router