const db = require('../../db')

 const logUser = (req,res,next)=>{
     let regNum = req.body.regNum

         db.query("SELECT * FROM student WHERE regNum = ? ",[regNum],(err,rows)=>{
         if(err) throw err

           if(rows.length == 0){
               res.send('500')
               next()

           }else{
               res.send(rows)
           }

        

       
       }) 

      
 }


 exports.logUser = logUser