const express = require('express');
const router = express.Router();
const course = require('../../controllers/Admin/course')


router.get('/',course.showCourse)
router.get('/courseLoad',course.courseUnit)
router.post('/course',course.addCourse)
router.delete('/course/:Id',course.deleteCourse)
router.put('/course/:Id',course.updateCourse)
 

module.exports = router