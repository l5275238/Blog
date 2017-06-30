/**
 * Created by T-Mac on 2017/6/29.
 */
var api=require('../api')
function Api(connection,sqlF) {
  this.findUse=function (callback) {
    var sql='SELECT * FROM user';
    this.sqlF(sql,callback)
  }

  this.updateUse=function (callback,name,text,url) {
    url=url.replace(/\\/g,"\\\\");
    var sql="update user  set name= '"+name+"',text='"+text+"',url='"+url+"' where id = '1'"
    this.sqlF(sql,callback)
  }
}

module.exports =new Api();
