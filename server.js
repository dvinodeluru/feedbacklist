"use strict";

var express = require('express'),
app = module.exports = express(),
path = require('path');


/*
//Basics 
app.get('/',function(req,res){
    res.send('hello first servser');
});
*/   

//Site Assests and HTML files
app.use('/assets', express.static(__dirname + '/assets'));
app.use(express.static('public'));

/*app.use(express.static(path.join(__dirname,'static', 'public')))
app.use('/assets', express.static(__dirname + '/public'));*/
//End Site Assests and HTML files

//DataBase Starts


//End DataBase

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});