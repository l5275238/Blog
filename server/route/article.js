/**
 * Created by T-Mac on 2017/6/29.
 */
var api=require('../api/article');
var bodyParser = require('body-parser');
var route=require('express').Router();
var callBack=require('../callback')
route.use(bodyParser.json({limit: '50mb'}));
route.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//更新文章
route.post('/updateArticle',function (req,res) {
    var title=req.body.params.title;
    var cateId=req.body.params.cateId;
    var text=req.body.params.text;
    var id=req.body.params.id;
    var html=req.body.params.html;
    api.updateArticle(function (error,rows) {
      callback(error,rows,req,res)
    },id,title,text,cateId,html)
  })
//删除文章
  route.get('/deleteArticle',function (req,res) {
    var id =req.query.id;
    var page=req.query.page;
    var row=req.query.row;
    api.deleteArticle(function (rows) {
      api.findArticle(function (error,rows) {
        callBack(error,rows,req,res)
      },page,row)
    },id)
  })
//分页获取文章列表
  route.get('/findArticle',function (req,res) {
    var page=req.query.page;
    var row=req.query.row;
    api.findArticle(function (error,rows) {
      callBack(error,rows,req,res)
    },page,row)
  })
//获取文章总数
  route.get('/findArticleLenght',function (req,res) {

    api.findArticleLenght(function (error,rows) {
      callBack(error,rows,req,res)
    })
  })
//添加文章
  route.post('/addArticle',function (req,res) {
    var d=new Date();
    var data= d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    var title=req.body.params.title;
    var cateId=req.body.params.cateId;
    var text=req.body.params.text.replace(/'/g,'\\\'');
    var html=req.body.params.html.replace(/'/g,'\\\'');


      var obj="'"+title+"',"+"'"+cateId+"',"+"'"+text+"',"+"'"+data+"','"+html+"'";


      api.addArticle(function (error,rows) {
      callBack(error,rows,req,res)
    },obj)
  })
//查询文章
  route.post('/findText',function (req,res) {
    var id=req.body.params.id;
    api.findText(function (error,rows) {
      callBack(error,rows,req,res)
    },id)
  })
//查询分类下的所用文章
route.post('/findFenLText',function (req,res) {
    var id=req.body.params.id;
    api.findFenLText(function (error,rows) {
        callBack(error,rows,req,res)
    },id)
})
//搜索文章
route.post('/searchArticle',function (req,res) {
    var text=req.body.params.text;
    console.log(text);
    var row=req.body.params.row;
    var page=req.body.params.page;
    api.searchArticle(text,function (error,rows) {
        callBack(error,rows,req,res)
    },page,row)
})


module.exports = route;
