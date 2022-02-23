const express = require('express');
const router = express.Router();
const result = require('../../controllers/Admin/result')

router.get('/',result.result)
router.get('/showRegistered',result.showRegisteredStudents)
router.get('/level',result.showLevel)
router.get('/semester',result.showSemester)
router.post('/getStudents',result.getregisteredStudents)
router.post('/inputResult',result.inputResult)
router.get('/getResults',result.showStudentResult)

module.exports = router