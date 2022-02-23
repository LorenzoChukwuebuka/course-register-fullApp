const express = require('express');
const router = express.Router();
const student = require('../../controllers/Admin/student')


router.get('/',student.showStudent)
router.post('/',student.addStudent)
router.put('/:Id',student.updateStudent)
router.delete('/:Id',student.deleteStudent)



module.exports = router