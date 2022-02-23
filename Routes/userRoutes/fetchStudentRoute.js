const express = require('express');
const router = express.Router();
const getStudent = require('../../controllers/User/Student')

router.post('/',getStudent.fetchStudent)
router.get('/level',getStudent.fetchlevel)
router.get('/semester',getStudent.fetchsemester)
router.get('/session',getStudent.fetchsession)
router.post('/course',getStudent.fetchCourses)



module.exports = router