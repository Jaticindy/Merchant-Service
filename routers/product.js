const express = require('express')
const router = express.Router()

// const bodyParser = require('body-Parser')
const db = require('../config')
const respons = require ('../respons')
const auth = require ('basic-auth')


router.get('/', (req, res) => {
    var user = auth(req)
    if (user != undefined) {
        if (user.name == 'dibimbing' && user.pass == 'pass') {
            // flow kode yang udah authorized
            const sql = "SELECT * FROM product"
            console.log('Get is Running..')

               db.query(sql, (error,result)=>{
                   if(error) {
                    console.log(error)
                   respons(500,error,"Server Error",res)
                   }else
                   //data hasil dari mysql
                   respons(200,result,"Get in Product",res)
                })
            return
        }
    }
    res.status(401)
    res.send("Unauthorized")
})


  router.post('/upload',(req,res)=>{
    const {name,quantity,Price } = req.body;
    const sql = `INSERT INTO product (name,quantity,Price) VALUES ('${name}', '${quantity}', '${Price}')`

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
    const {name,quantity,Price}=req.body
    const sql = `UPDATE product SET name='${name}', quantity='${quantity}', Price='${Price}' WHERE id = ${id}`;
   db.query(sql,(error,result)=>{
    if(error) respons(404,"Invalid","Not Found",res)
        console.log(result)

    if(result.affectedRows){ 
        const data = {
            isSuccess:result.affectedRows,
        }
        respons(200,data,"Edit Success",res)
    }
  })   
})

router.delete('/upload/delete/:id',(req,res)=>{
  const {id} = req.body
 const sql= `DELETE FROM product WHERE id = ${id}`;


 db.query(sql,(error,result)=>{
  if(error) respons(500,"Invalid","Server Error",res)
      console.log(`Deleted Success`)

  if(result.affectedRows){ 
      const data = {
          isSuccess:result.affectedRows,
      }
      respons(200,data,"Deleted Success",res)
  }
})   
 })

module.exports = router