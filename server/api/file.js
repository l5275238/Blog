/**
 * Created by T-Mac on 2017/6/29.
 */
function Api() {
//获取归档列表
  var api=require('../api')
  this.findFile=function (callback) {
    var sql="select * from Label";
    api.sqlF(sql,callback);
  }
  //添加归档
  this.addFile=function (callback,text) {
    var sql="INSERT INTO Label (text,zindex) VALUES ("+text+")";
    api.sqlF(sql,callback);
  }
  //删除归档
  this.deletFile=function (callback,id) {
    var sql="DELETE FROM Label where id= "+id;
    api.sqlF(sql,callback)
  }
  //更新归档
  this.updateFile=function (callback,id,text,index) {
    var sql="update Label set text='"+text+"',zindex="+index+" where id ="+id;
    api.sqlF(sql,callback)
  }
}
module.exports = new Api();
