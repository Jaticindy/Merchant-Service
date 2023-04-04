const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-Parser')
const db = require('./config')
const respons = require ('./respons')
const auth = require ('basic-auth')
const productRouters = require('./routers/product.js')
const merchantRouters = require('./routers/merchant.js')

app.use(bodyParser.json())
app.use('/product',productRouters)
app.use('/merchant',merchantRouters)




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
