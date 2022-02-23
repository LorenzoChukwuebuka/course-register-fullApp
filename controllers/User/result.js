const db = require('../../db')


const Result = (req,res)=>{
   
let sql = `SELECT result_input.*,student.*,CONCAT(student.Fname," ",student.Lname) AS names, course.*,CONCAT(course.course_code," ",course.course_title) AS cos FROM result_input JOIN student ON student.Id = result_input.student_Id JOIN course ON course.Id = result_input.course_Id WHERE result_input.student_Id = ${req.body.Id} `

    db.query(sql,(err,rows)=>{
        if(err)throw err
        res.send(rows)
    }) 
}

const showcourseregister = (req,res)=>{
    let sql = `SELECT registerd_courses.*,student.*,CONCAT(student.Fname," ",student.Lname) AS names, course.*,CONCAT(course.course_code," ",course.course_title) AS cos,level.*,semester.* FROM registerd_courses JOIN student ON student.Id = registerd_courses.student_Id JOIN course ON course.Id = registerd_courses.course_Id JOIN level on level.Id = registerd_courses.level_Id JOIN semester ON semester.Id = registerd_courses.semester_Id WHERE registerd_courses.student_Id = ${req.body.Id}`
    db.query(sql,(err,rows)=>{
        if(err) throw err
        res.send(rows)
    })
}

exports.Result = Result
exports.showcourseregister = showcourseregister