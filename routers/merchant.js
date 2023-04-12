const express = require('express')
const router = express.Router()
const db = require('../config')
const respons = require ('../respons')
const basicAuth = require('basic-auth')
const saltRounds = 10
const auth = require ('../middelware/logs')


router.get('/', (req, res) => {
 
            const sql = `SELECT * FROM merchant`
            console.log('Get is Running..')

               db.query(sql,(error,result)=>{
                if (error) {
                  console.log(error);
                  respons(404, error, 'Server Not Found', res);
                  return;
                }
                if (result.length === 0) {
                  respons(401, 'No Data Found', 'Unauthorized', res);
                  return;
                }
                respons(200, result, 'Get in merchant', res);
              });
            });

  

// Registrasi
router.post('/registrasi',(req,res)=>{
    const {password,name,join_date,phone_number}=req.body

    const sql = `INSERT INTO merchant (password, name, join_date, phone_number) 
    VALUES ('${password}', '${name}', '${join_date}', '${phone_number}')`;


    if (Object.entries (req.body).length !==4 ||
    !("password" in req.body) ||
    !("name" in req.body) ||
    !("join_date" in req.body) ||
    !("phone_number" in req.body)
    ){
   respons(400 ,"Bad Request ","Unauthorized",res)
    return  
    }
    

    db.query(sql,(error,result)=>{
      //error
        if(error){
          console.error("Error executing query:",error)
         return respons(401 ,error,"Unauthorized",res)
        }
        
        //Success
        if(result.affectedRows){ 
            const data = {
                isSuccess:result.affectedRows,
                id:result.insertId
                
            }
            console.log(result)
            respons(201,data,"Data Successfully Added",res)
        }
    })
})


router.put('/edit/:id', auth, (req, res) => {
  const user = basicAuth(req)
  const id = req.params.id
  const { password, name, join_date, phone_number } = req.body

  // Periksa apakah semua field pada body request tersedia
  if (!password || !name || !join_date || !phone_number) {
    return res.status(400).json({ error: "Bad Request" });
  }

  const sql = `UPDATE merchant SET password = ?, name = ?, join_date = ?, phone_number = ? WHERE id = ?`
  const values = [password,name, join_date, phone_number, id]
  

  db.query(sql, values, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
      };
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  });
});



router.delete('/upload/delete/:id',auth,(req,res)=>{
  const {id} = req.body
 const sql= `DELETE FROM merchant WHERE id = ${id}`


 db.query(sql, (error, result) => {
    if (error) {
        return respons(500, "Invalid", "Server Error", res);
    } 

  if (result.affectedRows) { 
    const data = {
      isSuccess: result.affectedRows,
    }
    respons(200, data, "Successfully Deleted", res);
  } else {
    respons(404, {}, "Data not found", res);
    console.log(result)
  }
})   
})



module.exports = router