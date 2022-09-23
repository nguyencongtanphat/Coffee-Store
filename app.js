const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const database = require('./src/utils/databaseConn/connection')

// CONFIG LIBRARY
app.use(cors())
require('dotenv').config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//CONNECT TO DATABASE
database.isConnected()

//REQUIRE ROUTES
const userRoute = require('./src/routes/user')

//ROUTES DEFINE
app.use('user', userRoute)


app.listen(3000)