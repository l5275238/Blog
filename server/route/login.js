/**
 * Created by T-Mac on 2017/7/3.
 */
var api=require('../api/login')
var token=require('../token');
var route=require('express').Router();
var bodyParser = require('body-parser');
route.use(bodyParser.json({limit: '50mb'}));
route.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  route.post('/login',function (req,res) {
    var loginName=req.body.params.loginName;
    var password=req.body.params.password;
    api.login(function (error,rows) {
      if(rows[0].password==password){
        var toke=token.create(loginName);
        res.json(toke)
      }
      else {
        res.json('shibai')
      }

    },loginName)

  })
  route.use('/',function (req,res,next){
    console.log(req.url);
    if(req.url=='/login'||req.url=='/profile'){
      next()
    }
    else {
      var name=req.headers.authorization;
      console.log(name);
      token.verify(name,req,res,next);
    }


  })

module.exports = route;
