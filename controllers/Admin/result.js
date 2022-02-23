'use strict'

const db = require('../../db')

const showRegisteredStudents = (req, res) => {
  let sql =
    ' SELECT student.*,student.Id AS studentId, course.*,course.Id AS courseId, registerd_courses.*,semester.*,session.* FROM registerd_courses JOIN student ON student.Id = registerd_courses.student_Id JOIN course ON course.Id = registerd_courses.course_Id JOIN session ON session.Id = registerd_courses.session_Id JOIN semester ON semester.Id = registerd_courses.semester_Id'

  db.query(sql, (err, rows) => {
    res.send(rows)
  })
}

const result = (req, res) => {
  let sql = `SELECT * FROM course `
  db.query(sql, (err, rows) => {
    if (err) throw err
    res.send(rows)
  })
}

const getregisteredStudents = (req, res, next) => {
  let Id = req.body.Id
  let sql = ` SELECT registerd_courses.*, registerd_courses.Id AS Rid, course.*, course.Id AS cid, session.*,session.Id as sessId,
              student.*,student.Id AS sid FROM registerd_courses JOIN course ON course.Id = registerd_courses.course_Id JOIN student
              ON student.Id = registerd_courses.student_Id JOIN session ON session.Id = registerd_courses.session_Id
              WHERE registerd_courses.course_Id = ${Id}`
  db.query(sql, (err, rows) => {
    if (err) throw err
    res.send(rows)
  })
}

const inputResult = (req, res, next) => {
  let test = req.body.test
  let exam = req.body.exam
  let practical = req.body.practical
  let studentId = req.body.studentId
  let courseId = req.body.courseId
  let err = 0
  let Grade
  let total

  // adds up the total
  function Add (a, b, c) {
    return Number(a) + Number(b) + Number(c)
  }
  total = Add(test, exam, practical)

  if (total > 100) {
    err++
  }

  // assign grades
  switch (true) {
    case total >= 90 && total <= 100:
      Grade = 'A'
      break
    case total >= 70 && total <= 89:
      Grade = 'B'
      break
    case total >= 59 && total <= 69:
      Grade = 'C'
      break
    case total >= 45 && total <= 49:
      Grade = 'D'
      break
    case total >= 0 && total <= 44:
      Grade = 'F'
      break
    default:
      Grade = 'F'
      break
  }

  if (err === 0) {
    //create the dateNow function
    let today = new Date()
    let date =
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    let time =
      today.getHours() + '-' + today.getMinutes() + ':' + today.getSeconds()
    let dateTime = date + ' ' + time

    //create an object to hold the values

    let values = {
      student_Id: studentId,
      course_Id: courseId,
      test_score: test,
      practical_score: practical,
      exam_score: exam,
      Total_mark: total,
      Grade: Grade,
      date_created: dateTime
    }
    //check if result has been uploaded...

    let checkIfResultExist = `SELECT * FROM result_input WHERE student_Id = ${studentId} AND course_Id = ${courseId}`

    db.query(checkIfResultExist, (err, row) => {
      if (row.length === 0) {
        let sql = 'INSERT INTO result_input SET ?'

        db.query(sql, values, (err, rows) => {
          if (err) throw err
          res.send('200')
        })
      } else {
        res.send('500')
      }
    })
  } else {
    res.send('501')
  }
}

const showSemester = (req, res, next) => {
  db.query('SELECT * FROM semester', (err, rows) => {
    if (err) throw err
    res.send(rows)
    return next()
  })
}

const showLevel = (req, res, next) => {
  db.query('SELECT * FROM level', (err, rows) => {
    if (err) throw err
    res.send(rows)
    return next()
  })
}

const showStudentResult = (req, res, next) => {
  let sql =
    'SELECT student.*,course.*,result_input.* FROM result_input JOIN student ON student.Id = result_input.student_Id JOIN course ON course.Id = result_input.course_Id'
  db.query(sql, (err, rows) => {
    if (err) throw err
    res.send(rows)
  })
}

exports.result = result
exports.getregisteredStudents = getregisteredStudents
exports.inputResult = inputResult
exports.showRegisteredStudents = showRegisteredStudents
exports.showLevel = showLevel
exports.showSemester = showSemester
exports.showStudentResult = showStudentResult
