require('dotenv').config();
const express = require('express');
const app = express();
const router= require('./routes')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
app.use(cookieParser());


const corsOption = {
    credentials:true,
    origin: ['http://localhost:3000'],
}



app.use(cors(corsOption))

//db
require('./database')

app.use('/img', express.static(path.join(__dirname,'img')));

//build
app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

app.use(express.json({limit: '15mb'}));
app.use(router)

app.get('/', (req, res) => {
    res.send('Hello from express Js');
})

app.listen(4000,() => {
    console.log('server run')
})