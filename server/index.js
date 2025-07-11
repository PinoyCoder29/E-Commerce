const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.APP_PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
//Customer routes
const CustomerRoutes = require('./routes/CustomerRoute')
app.use('/api/customer',CustomerRoutes)

//admin routes
const adminRoutes = require('./routes/adminRoutes')
app.use('/api/admin',adminRoutes)

app.listen(port,() =>{
    console.log('listening on the port',port)
})