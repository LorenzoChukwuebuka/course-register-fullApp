const mysql =  require('mysql2');

 const db = mysql.createConnection({
    host     :   'localhost', 
    user     :    'root',
    password :    '',
    database :    'course_registeration'
});


module.exports = db;