'use strict'
const db = require('../../db')

const addStudent = (req, res, next) => {
  let fname
  let lname
  let oname
  let regNumber
  let error = 0

  if (req.body && req.body.fname) {
    fname = req.body.fname
  } else {
    error++
  }

  if (req.body && req.body.lname) {
    lname = req.body.lname
  } else {
    error++
  }

  if (req.body && req.body.oname) {
    oname = req.body.oname
  } else {
    error++
  }

  if (req.body && req.body.regNumber) {
    regNumber = req.body.regNumber
  } else {
    error++
  }

  //if there are no errors run the next operations

  if (error === 0) {
    //check if student regNumber already exists

    let sql_checkRegNumb = `SELECT * FROM student WHERE regNum = ${regNumber}`

    db.query(sql_checkRegNumb, (err, rows) => {
      if (err) throw err

      if (rows.length > 0) {
        res.send('501')
      } else {
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

        let sql = 'INSERT INTO student SET ?'
        let data = {
          Fname: fname,
          Lname: lname,
          Oname: oname,
          regNum: regNumber,
          date_created: dateTime
        }
        db.query(sql, data, (err, rows) => {
          if (err) throw err
          res.send('200')
        })
      }
    })
  } else {
    res.send('501')
  }
}

const showStudent = (req, res, next) => {
  let sql = 'SELECT * FROM student'
  db.query(sql, (err, rows) => {
    if (err) throw err
    if (!err) {
      res.send(rows)
    }
  })
}

const deleteStudent = (req, res) => {
  let Id = req.params.Id
  let sql = ` DELETE FROM student WHERE Id = ${Id} `

  db.query(sql, (err, result) => {
    if (err) throw err

    res.send(result)
  })
}

const updateStudent = (req, res, next) => {
  let Id = req.params.Id
  let fname = req.body.fname
  let lname = req.body.lname
  let oname = req.body.oname
  let regNumber = req.body.regNumber

  let sql = `UPDATE student SET Fname = "${fname}", Lname = "${lname}", Oname = '${oname}' , regNum = ${regNumber} WHERE Id = ${Id} `

  db.query(sql, (err, rows) => {
    if (err) throw err

    res.send('200')
  })
}

exports.addStudent = addStudent
exports.showStudent = showStudent
exports.deleteStudent = deleteStudent
exports.updateStudent = updateStudent
