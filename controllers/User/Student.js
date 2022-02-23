const db = require("../../db");

//all get requests...

const fetchStudent = (req, res, next) => {
  let Id = req.body.Id;

  db.query(`SELECT * FROM student WHERE Id = ${Id}`, (err, row) => {
    if (err) throw err;
    res.send(row);
  });
};

const fetchlevel = (req, res) => {
  db.query("SELECT * FROM level", (err, row) => {
    if (err) throw err;
    res.send(row);
  });
};

const fetchsession = (req, res) => {
  db.query("SELECT * FROM session ", (err, row) => {
    if (err) throw err;
    res.send(row);
  });
};

const fetchsemester = (req, res) => {
  db.query("SELECT * FROM semester ", (err, row) => {
    if (err) throw err;
    res.send(row);
  });
};

const fetchCourses = (req, res, next) => {
  let level = req.body.level;
  let semester = req.body.semester;

  let values = [level, semester];

  db.query(
    `SELECT  course.*, course.Id AS cid, semester.*, semester.Id AS sid, level.*,level.Id AS lid 
    FROM course JOIN semester ON course.semester_Id = semester.Id JOIN level ON course.levelId = level.Id
     WHERE course.levelId = ? AND course.semester_Id = ?`,
    values,
    (err, row) => {
      if (err) throw err;

      res.send(row);
      next();
    }
  );
};

exports.fetchStudent = fetchStudent;
exports.fetchlevel = fetchlevel;
exports.fetchsession = fetchsession;
exports.fetchsemester = fetchsemester;
exports.fetchCourses = fetchCourses;
