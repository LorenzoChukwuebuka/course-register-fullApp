const db = require('../../db');


const login = (req,res,next)=>{
    let user = req.body.username;
    let password = req.body.password;

     //backend validation 

  if(user && password){
       db.query("SELECT * FROM user WHERE username = ? AND password = ?",[user,password],(err,rows)=>{
         if(err) throw err

           if(rows.length == 0){
               res.send('500')
               next()

           }else{
               res.send(rows)
           }

        

       
       }) 
   } 
           
};


exports.login = login;