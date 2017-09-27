/**
 * Created by T-Mac on 2017/7/3.
 */
var upload=require('../upload');
var route=require('express').Router();
var bodyParser = require('body-parser');
route.use(bodyParser.json({limit: '50mb'}));
route.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  route.post('/profile', upload.single('img'), function (req, res, next) {
    req.file.ourPath=req.file.path;
      // req.file.path='../uploads/'+req.file.filename;
    // req.file 是 `avatar` 文件的信息
    res.json(req.file);
    // req.body 将具有文本域数据, 如果存在的话
  })

module.exports = route;

