const express = require('express')
const router = express.Router()


//const bodyParser = require('body-Parser')
const db = require('../config')
const respons = require ('../respons')
const auth = require ('basic-auth')



router.get('/', (req, res) => {
    var user = auth(req)
    if (user != undefined) {
        if (user.name == 'dibimbing' && user.pass == 'pass') {
            // flow kode yang udah authorized
            const sql = "SELECT * FROM merchant"
            console.log('Get is Running..')

               db.query(sql, (error,result)=>{
                   if(error) {
                    console.log(error)
                   respons(404,error,"Server Not Found",res)
                   }else
                   //data hasil dari mysql
                   respons(200,result,"Get in merchant",res)
                })
            return
        }
    }
    console.log('Unauthorized')
    res.status(401).send('Unauthorized');
    
})
  


router.post('/upload',(req,res)=>{
    const {password,name,join_date,phone_number}=req.body
    const sql = `INSERT INTO merchant (password, name, join_date, phone_number) 
    VALUES ('${password}', '${name}', '${join_date}', '${phone_number}')`

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




router.put('/upload/edit/:id',(req,res)=>{
    const id = req.params.id;
    const {password,name,join_date,phone_number}=req.body
    const sql = `UPDATE merchant SET password='${password}', name='${name}', join_date='${join_date}',
                 phone_number='${phone_number}' WHERE id = ${id}`;
   
                 if (Object.entries (req.body).length !==4 ||
                 !("password" in req.body) ||
                 !("name" in req.body) ||
                 !("join_date" in req.body) ||
                 !("phone_number" in req.body)
                 ){

   respons(404,"Invalid","Not Found",res)
    return  
    }
   
    db.query(sql,(error,result)=>{
    if(error) 
    respons(404,"Invalid","Not Found",res)
        console.log(result)

    if(result.affectedRows){ 
        const data = {
            isSuccess:result.affectedRows,
        }
        respons(200,data,"Edit Success",res)
        console.log(data)
    }
  })   
})


router.delete('/upload/delete/:id', (req, res) => {
    const id = req.params.id
  

    if (!id || !("password" in req.body)) {
      return res.status(404).json({ error: "ID or password not found" });
    }  
    
    const sql = `DELETE FROM merchant WHERE id = ${id}`;

    
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
        respons(404, (`Error id: ${id}`), "Data not found", res);
        console.log(result)
      }
    })   
  });
  

module.exports = router