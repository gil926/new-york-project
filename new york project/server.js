const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(__dirname + '/public'))
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))
app.set("view engine" , "ejs");

app.listen(3000 , () => {
    console.log('server is listening on port 3000');
});
app.get('/' , (req , res) => {
    res.render('index');
})
app.get('/class2' , (req , res) => {
    res.render('index2');
})
app.get('/class2' , (req , res) => {
    res.render('index2');
})