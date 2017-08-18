/**
 * Created by T-Mac on 2017/6/29.
 */
function Api() {
  var api=require('../api')
  this.findUse=function (callback) {
    var sql='SELECT * FROM user';
    console.log(api);
    api.sqlF(sql,callback)
  }

  this.updateUse=function (callback,name,text,url) {
    url=url.replace(/\\/g,"\\\\");
    var sql="update user  set name= '"+name+"',text='"+text+"',url='"+url+"' where id = '1'"
    api.sqlF(sql,callback)
  }
}

module.exports =new Api();
