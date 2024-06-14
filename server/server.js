const express = require('express')
const app = express()
require('dotenv').config()
const port = 4000
const router = require('./router')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(router)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

