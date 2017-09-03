/**
 * Created by T-Mac on 2017/7/3.
 */
// var route=require('../route');
var api=require('../api/category');
var route=require('express').Router();
var bodyParser = require('body-parser');
var callBack=require('../callback')
route.use(bodyParser.json({limit: '50mb'}));
route.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  //添加分类;
  route.get('/addcategory',function (req,res) {
    var text=req.query.text;

    api.addCategory(function (error,rows) {
      callBack(error,rows,req,res)
    },text)
  })
//获取分类列表
  route.post('/findCategory',function (req,res) {
    api.findCategory(function (error,rows) {
      callBack(error,rows,req,res)
    })
  })
  route.get('/updateCategory',function (req,res) {
    var id=req.query.id;
    var text=req.query.text;
    api.updateCategory(function (error,rows) {
      callBack(error,rows,req,res)
    },text,id)

  })
//获取文章总数
route.get('/findCategoryLenght',function (req,res) {
    api.findCategoryLenght(function (error,rows) {
        callBack(error,rows,req,res)
    })
})
  route.get('/deleteCategory',function (req,res) {
    var id=req.query.id;
    api.deleteCategory(function (error,rows) {
      callBack(error,rows,req,res)
    },id)
  })


module.exports = route;
