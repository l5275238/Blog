/**
 * Created by T-Mac on 2017/6/29.
 */
var api=require('../api')
function Api(connection,sqlF) {
  this.login=function (callback,loginName) {
    var sql="SELECT * FROM member where loginName='"+loginName+"'";
    this.sqlF(sql,callback)
  }
}
module.exports =new Api();
