var express = require('express');
var login=require('./route/login');
var article=require('./route/article');
var category=require('./route/category');
var file=require('./route/file');
var user=require('./route/user');
var imgload=require('./route/imgload')
var app=express();
app.use(login)
app.use(article)
app.use(category)
app.use(imgload)
app.use(file)
app.use(user)
app.use(express.static('./'));
app.use('/', express.static(__dirname + '/public'))
var server=app.listen(3030,function () {
    console.log('成功');

})
