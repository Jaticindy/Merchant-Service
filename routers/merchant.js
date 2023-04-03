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
                   respons(500,error,"Server Error",res)
                   }else
                   //data hasil dari mysql
                   respons(200,result,"Get in merchant",res)
                })
            return
        }
    }
    res.status(401)
    res.send("Unauthorized")
})
  


router.post('/upload',(req,res)=>{
    const {password,name,join_date,phone_number}=req.body
    const sql = `INSERT INTO merchant (password, name, join_date, phone_number) 
    VALUES ('${password}', '${name}', '${join_date}', '${phone_number}')`

    db.query(sql,(error,result)=>{
      //error
        if(error){
          console.error("Error executing query:",error)
         return respons(501 ,error,"Not Implemented",res)
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
    const sql = `UPDATE merchant SET password='${password}', name='${name}', join_date='${join_date}', phone_number='${phone_number}' WHERE id = ${id}`;
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


router.delete('/upload/delete/:id',(req,res)=>{
    const {id} = req.body
   const sql= `DELETE FROM merchant WHERE id = ${id}`;


   db.query(sql,(error,result)=>{
    if(error) respons(500,"Invalid","Server Error",res)
        console.log(`Deleted Success`)

    if(result?.affectedRows){ 
        const data = {
            isSuccess:result.affectedRows,
        }
        respons(200,data,"Deleted Success",res)
    }
})   
   })

module.exports = router