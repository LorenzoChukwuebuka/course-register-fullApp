const db = require('../../db')

const register = (req, res, next) => {
  let courses = req.body.courses
  let Id = req.body.Id
  let session = req.body.session
  let semester = req.body.semester
  let level = req.body.level
  let registerd = 1
  let error = 0

  if (
    courses == '' &&
    Id == '' &&
    session == ' ' &&
    semester == ' ' &&
    level == ''
  ) {
    error++
  }

  let today = new Date()
  let date =  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  let time = today.getHours() + '-' + today.getMinutes() + ':' + today.getSeconds()
  let dateTime = date + ' ' + time
  /*  for (var key in courses){
		 console.log(courses[key])
	 } */

  if (error === 0) {
    for (var key in courses) {
      db.query(
        `INSERT INTO registerd_courses(student_Id, course_Id, level_Id, semester_Id, registered, session, date_created)
	       VALUES (${Id},${courses[key]},${level},${semester},${registerd},${session},'${dateTime}')`,
        (err, rows) => {
          if (err) throw err
        }
      )
    }
  } else {
    res.send('500')
  }
}

exports.register = register
