/**
 * Created by T-Mac on 2017/7/3.
 */
var api=require('../api/user');
var route=require('express').Router();
var callBack=require('../callback')
var bodyParser = require('body-parser');
route.use(bodyParser.json({limit: '50mb'}));
route.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  route.get('/user',function (req,res) {
    api.findUse(function (error,rows) {
      callBack(error,rows,req,res)
    })
  });
  route.get('/updateUsers',function (req,res) {
    var name=req.query.name;
    var text=req.query.text;
    var url=req.query.url;
    api.updateUse(function (error,rows) {
      callBack(error,rows,req,res)
    },name,text,url)
  });

module.exports = route;
