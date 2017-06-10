var express = require('express');
var api=require('./api');
var upload=require('./upload')
var bodyParser = require('body-parser')
var app=express();
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/user',function (req,res) {
    api.findUse(function (rows) {

        res.json(rows)
    })
});
app.get('/updateUsers',function (req,res) {
    var name=req.query.name;
    var text=req.query.text;
    api.updateUse(function (rows) {
        rows.code='sucusec';

        res.json(rows);
    },name,text)
});
//添加文章
app.post('/addArticle',function (req,res) {
  var d=new Date();
    var data= d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();;
    var title=req.body.params.title;
    var cateId=req.body.params.cateId;
    var text=req.body.params.text;
  obj='"'+title+'",'+'"'+cateId+'",'+'"'+text+'",'+'"'+data+'"'
  api.addArticle(function () {
    res.json('succes');
  },obj)
})
app.post('/findText',function (req,res) {
  api.findText(function (rows) {
    res.json(rows);
  })
})
app.post('/profile', upload.single('img'), function (req, res, next) {

  // req.file 是 `avatar` 文件的信息
  res.json(req.file);
  // req.body 将具有文本域数据, 如果存在的话
})
app.get('/addcategory',function (req,res) {
  var text=req.query.text;

  api.addCategory(function () {
    res.json('succese')
  },text)
})

app.post('/findCategory',function (req,res) {
  api.findCategory(function (rows) {
    res.json(rows)
  })
})

var server=app.listen(3000,function () {
    console.log('成功');
    console.log(api);

})
