/**
 * Created by T-Mac on 2017/6/29.
 */
function Api() {
  var api=require('../api')
  this.login=function (callback,loginName) {
    var sql="SELECT * FROM member where loginName='"+loginName+"'";
    api.sqlF(sql,callback)
  }
}
module.exports =new Api();
