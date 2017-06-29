var express = require('express');
var api=require('./api');
var upload=require('./upload');
var token=require('./token');
var bodyParser = require('body-parser');
var app=express();
app.use(express.static('./'));
app.use('/', express.static(__dirname + '/public'))
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/',function (req,res,next){
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



callBack=function (error,rows,req,res) {
  var obj={}
  if(error){
    obj={
      message:error,
      code:500,
    }
  }
  else {
    obj={
      code:'sucsse',
      data:rows,
      message:error,
    }
  }
  res.json(obj)

}
app.get('/user',function (req,res) {
    api.findUse(function (error,rows) {
      callBack(error,rows,req,res)
    })
});
app.get('/updateUsers',function (req,res) {
    var name=req.query.name;
    var text=req.query.text;
    var url=req.query.url;
    api.updateUse(function (error,rows) {
      callBack(error,rows,req,res)
    },name,text,url)
});
//添加文章
app.post('/addArticle',function (req,res) {
  var d=new Date();
    var data= d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();;
    var title=req.body.params.title;
    var cateId=req.body.params.cateId;
    var text=req.body.params.text;
    var html=req.body.params.html;

  var obj="'"+title+"',"+"'"+cateId+"',"+"'"+text+"',"+"'"+data+"','"+html+"'"
  api.addArticle(function (error,rows) {
    callBack(error,rows,req,res)
  },obj)
})
//查询文章
app.post('/findText',function (req,res) {
  var id=req.body.params.id;
  api.findText(function (error,rows) {
    callBack(error,rows,req,res)
  },id)
})
app.post('/profile', upload.single('img'), function (req, res, next) {

  // req.file.path='../uploads/'+req.file.filename;
  // req.file 是 `avatar` 文件的信息
  res.json(req.file);
  // req.body 将具有文本域数据, 如果存在的话
})
//添加分类;
app.get('/addcategory',function (req,res) {
  var text=req.query.text;

  api.addCategory(function (error,rows) {
    callBack(error,rows,req,res)
  },text)
})
//获取分类列表
app.post('/findCategory',function (req,res) {
  api.findCategory(function (error,rows) {
    callBack(error,rows,req,res)
  })
})
//更新文章
app.post('/updateArticle',function (req,res) {
  var title=req.body.params.title;
  var cateId=req.body.params.cateId;
  var text=req.body.params.text;
  var id=req.body.params.id;
  var html=req.body.params.html;
  api.updateArticle(function (error,rows) {
    callBack(error,rows,req,res)
  },id,title,text,cateId,html)
})
//删除文章
app.get('/deleteArticle',function (req,res) {
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
app.get('/findArticle',function (req,res) {
  var page=req.query.page;
  var row=req.query.row;
  api.findArticle(function (error,rows) {
    callBack(error,rows,req,res)
  },page,row)
})
//获取文章总数
app.get('/findArticleLenght',function (req,res) {

  api.findArticleLenght(function (error,rows) {
    callBack(error,rows,req,res)
  })
})
app.get('/updateCategory',function (req,res) {
  var id=req.query.id;
  var text=req.query.text;
  api.updateCategory(function (error,rows) {
    callBack(error,rows,req,res)
  },text,id)

})
app.get('/deleteCategory',function (req,res) {
  var id=req.query.id;
  api.deleteCategory(function (error,rows) {
    callBack(error,rows,req,res)
  },id)
})
app.get('/findFile',function (req,res) {
  api.findFile(function (error,rows) {
    res.json(rows);
  })
})
app.get('/addFile',function (req,res) {
  var text=req.query.text;
  var index=req.query.index;
  var obj='"'+text+'",'+index;
  api.addFile(function (error,rows) {
    callBack(error,rows,req,res)
  },obj)


})
app.get('/deletFile',function (req,res) {
  var id=req.query.id;
api.deletFile(function (error,rows) {
  callBack(error,rows,req,res)
},id)
})
app.get('/updateFile',function (req,res) {
  var id =req.query.id
  var text =req.query.text
  var index =req.query.index
  api.updateFile(function (error,rows) {
    callBack(error,rows,req,res)

  },id,text,index)

})
app.post('/login',function (req,res) {
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

var server=app.listen(3030,function () {
    console.log('成功');

})
