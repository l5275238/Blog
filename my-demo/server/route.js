/**
 * Created by T-Mac on 2017/6/30.
 */
var route=require('express').Router();
var bodyParser = require('body-parser');
route.use(bodyParser.json({limit: '50mb'}));
route.use(bodyParser.urlencoded({limit: '50mb', extended: true}));



module.exports = route;
