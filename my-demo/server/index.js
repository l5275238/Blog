var express = require('express');
var api=require('./api');
var upload=require('./upload')
var app=express();
app.get('/user',function (req,res) {
    api.findUse(function (rows) {
        console.log(rows);
        res.json(rows)
    })
});
app.get('/updateUsers',function (req,res) {
    var name=req.query.name;
    var text=req.query.text;
    console.log(name);
    console.log(text);
    api.updateUse(function (rows) {
        rows.code='sucusec';
        res.json(rows);
    },name,text)
});
app.post('/profile', upload.single('img'), function (req, res, next) {
  console.log(req.file);
  // req.file 是 `avatar` 文件的信息
  // req.body 将具有文本域数据, 如果存在的话
})
var server=app.listen(3000,function () {
    console.log('成功');
    console.log(api);

})
