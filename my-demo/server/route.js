/**
 * Created by T-Mac on 2017/6/30.
 */
var route=require('express').Router();
var article=require('./route/article')
var category=require('./route/category')
var file=require('./route/file')
var login=require('./route/login')
var user=require('./route/user')
var bodyParser = require('body-parser');
route.use(bodyParser.json({limit: '50mb'}));
route.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

function run(fun) {
  fun(route,callBack);
}

run.apply(null,[article,category,file,user])

module.exports = route;
