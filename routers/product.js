const express = require('express')
const router = express.Router()
const db = require('../config')
const respons = require ('../respons')
const basicAuth = require('basic-auth')
const auth = require ('../middelware/logs')


  router.get('/', auth, (req, res) => {
    const user = basicAuth(req)
    
     // Mendapatkan id_merchant dari pengguna yang terautentikasi
    
  
    // Periksa apakah pengguna memiliki hak akses sebagai merchant
    if (user.name == 'merchant' && user.pass == 'password') {
      console.log('Invalid credentials')
      // Jika tidak, kirim respons error
      return respons(401, 'Invalid Credentials', 'Unauthorized', res);
    }
  
    // Jika berhasil melewati pengecekan otorisasi, ambil data product
    const sql = `SELECT * FROM product`;
    db.query(sql, (error, result) => {
      if (error) {
        console.log(error)
        return respons(500, "Invalid", "Server Error", res);
      } else {
        return respons(200, result, "Get in Product", res);
      }
    });
  });
  

       

//Post
  router.post('/upload',(req,res)=>{
    const {name,quantity,Price } = req.body;
    const sql = `INSERT INTO product (name,quantity,Price) VALUES ('${name}', '${quantity}', '${Price}')`

    if (Object.entries (req.body).length !==3 ||
    !("name" in req.body) ||
    !("quantity" in req.body) ||
    !("Price" in req.body)
    ){
   res.status(400)
   res.send("Invalid Request")
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


//Put 
router.put('/upload/edit/:id',auth,(req,res)=>{
  const user = basicAuth(req)
  console.log(user)

  const { id } = req.params;
  const {name, quantity, Price } = req.body;
  const sql = `UPDATE product SET name = ?, quantity = ?, Price = ? WHERE id = ?`;

    if (Object.entries (req.body).length !==3 ||
    !("name" in req.body) ||
    !("quantity" in req.body) ||
    !("Price" in req.body)
    ){
   respons(404,"Invalid","Not Found",res)
    return  
    }

  db.query(sql, [name, quantity, Price, id], (error, result) =>{
    if(error) {
    respons(404,"Invalid","Not Found",res)
        console.log(error)
return
   }
    else{            
        respons(200,result,"Edit Success",res)
        return
    }
  })   
})


//Delete
router.delete('/upload/delete/:id',auth, (req, res) => {
  const user = basicAuth(req)
 
  const {id} = req.params
  const sql= `DELETE FROM product WHERE id = ?`

  db.query(sql,[id],(error, result) => {
    if (error) {
      console.log(error)
      return respons(500, "Invalid", "Server Error", res);
    } else {
      return respons(200, result, 'Get in Product', res);
    }
  });
});


module.exports = router