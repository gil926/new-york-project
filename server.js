const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const mongodb = 'mongodb+srv://gil:3H0yT4pSvoQDUJmg@cluster0.sz2q1bf.mongodb.net/school?retryWrites=true&w=majority'
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require('body-parser');
const User = require('./models/usermodel')


app.use(express.static(__dirname + '/public'))
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))
app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

mongoose.connect(mongodb,{ useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{
    console.log('mongo connected')
 
   }).catch(err => console.log(err))
   
   app.get('/school', (req,res) => {
    res.render('index');
   })

app.get('/' , (req , res) => {
    res.render('login');
})

app.get('/sign_up',(req,res)=>{
    res.render('sign_up')
 })

 app.post('/',async(req,res)=>{
    console.log(req.body)
  await User.collection.insertOne(req.body);
  res.render('login')
 })


 app.post('/school',async(req,res) =>{
    if(await User.find(req.body) == false){
     console.log(req.body)
     res.render('login')
  }
  else{
    let username = req.body.username;
     console.log(req.body)
     res.render('index',{username});
  }
  })

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  
        //emiting the massage 
         socket.on('chat message',(msg) => {
              io.emit('chat message', msg);
              });
  
            socket.on('chat message', (msg) => {
              console.log('message: '+ msg+"-");
            });      
          });

server.listen(3000, () => {
    console.log('listening on *:3000');
  })