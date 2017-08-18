/**
 * Created by T-Mac on 2017/7/3.
 */
var api=require('../api/file');
var route=require('express').Router();
var callBack=require('../callback')
var bodyParser = require('body-parser');
route.use(bodyParser.json({limit: '50mb'}));
route.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  route.get('/findFile',function (req,res) {
    api.findFile(function (error,rows) {
      res.json(rows);
    })
  })
  route.get('/addFile',function (req,res) {
    var text=req.query.text;
    var index=req.query.index;
    var obj='"'+text+'",'+index;
    api.addFile(function (error,rows) {
      callBack(error,rows,req,res)
    },obj)


  })
  route.get('/deletFile',function (req,res) {
    var id=req.query.id;
    api.deletFile(function (error,rows) {
      callBack(error,rows,req,res)
    },id)
  })
  route.get('/updateFile',function (req,res) {
    var id =req.query.id
    var text =req.query.text
    var index =req.query.index
    api.updateFile(function (error,rows) {
      callBack(error,rows,req,res)

    },id,text,index)

  })

module.exports = route;
