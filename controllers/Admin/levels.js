const db = require('../../db')

const level = (req,res,next)=>{
    db.query("SELECT * FROM level",(err,rows)=>{
         if(err) throw err
         res.send(rows)
         return next()
    })
}

exports.level = level