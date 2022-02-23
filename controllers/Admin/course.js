//const { reset } = require('nodemon')
'use strict'

const db = require('../../db')

//get course_load

const courseUnit = (req, res) => {
  let sql = 'SELECT * FROM course_unit'

  db.query(sql, (err, rows) => {
    if (err) throw err

    res.send(rows)
  })
}

//insert

const addCourse = (req, res) => {
  let courseCode
  let CourseTitle
  let level
  let courseLoad
  let semester
  let error = 0

  if (req.body && req.body.courseCode) {
    courseCode = req.body.courseCode
  } else {
    error++
  }

  if (req.body && req.body.CourseTitle) {
    CourseTitle = req.body.CourseTitle
  } else {
    error++
  }
  if (req.body && req.body.level) {
    level = req.body.level
  } else {
    error++
  }

  if (req.body && req.body.courseLoad) {
    courseLoad = req.body.courseLoad
  } else {
    error++
  }

  semester = req.body.semester

  if (error === 0) {
    //check if course already exists

    let checkIfcourseExists = `SELECT * FROM course WHERE course_code = "${courseCode}" AND course_title = "${CourseTitle}" `

    db.query(checkIfcourseExists, (err, row) => {
      if (err) throw err

      if (row.length === 0) {
        //date function

        let today = new Date()
        let date =
          today.getFullYear() +
          '-' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate()
        let time =
          today.getHours() + '-' + today.getMinutes() + ':' + today.getSeconds()
        let dateTime = date + ' ' + time

        let sql = 'INSERT INTO course SET ?'
        let data = {
          course_code: courseCode,
          course_title: CourseTitle,
          course_load: courseLoad,
          levelId: level,
          semester_Id: semester,
          created: dateTime
        }

        db.query(sql, data, (err, rows) => {
          if (err) throw err
          res.send('200')
        })
      } else {
        res.send('501')
      }
    })
  } else {
    res.send('501')
  }
}

//show course

const showCourse = (req, res, next) => {
  let sql =
    'SELECT course.*,level.*,course.Id as cid, level.Id as lid FROM course JOIN level ON level.Id = course.levelId '
  db.query(sql, (err, rows) => {
    if (err) throw err
    if (!err) {
      res.send(rows)
    }
  })
}

const deleteCourse = (req, res) => {
  let Id = req.params.Id
  let sql = ` DELETE FROM course WHERE Id = ${Id} `

  db.query(sql, (err, result) => {
    if (err) throw err

    res.send(result)
  })
}

const updateCourse = (req, res, next) => {
  let Id = req.params.Id
  let courseCode = req.body.courseCode
  let CourseTitle = req.body.CourseTitle
  let level = req.body.level
  let courseLoad = req.body.courseLoad

  let sql = `UPDATE course SET course_code = "${courseCode}", course_title = "${CourseTitle}",course_load = ${courseLoad} , levelId = ${level} WHERE Id = ${Id} `

  db.query(sql, (err, rows) => {
    if (err) throw err

    res.send('200')
  })
}

exports.addCourse = addCourse
exports.showCourse = showCourse
exports.updateCourse = updateCourse
exports.deleteCourse = deleteCourse
exports.courseUnit = courseUnit
