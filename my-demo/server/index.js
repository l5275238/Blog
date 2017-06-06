var express = require('express');
var api=require('./api')
var app=express();
app.get('/user',function (req,res) {
    api.updateUse(function (rows) {
        console.log(rows);
        res.json(rows)
    })
});
var server=app.listen(3000,function () {
    console.log('成功');
    console.log(api);

})
