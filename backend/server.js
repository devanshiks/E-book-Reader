const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var cors = require('cors');

const PORT = 3000
const api = require('./routes/api.js')
const app = express()



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())



app.use(cors());
const url = 'mongodb://localhost/ebookDB'
mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection
con.on('open', () => {
    console.log("database connected");
})

 

app.use('/api', api)
app.get('/', function(req,res){
    res.send('hello form server')
})

app.listen(PORT, function(){
    console.log('server running on:'+ PORT)
})
