/**
 * Created by T-Mac on 2017/6/29.
 */
function Api(connection,sqlF) {
//获取归档列表
  this.findFile=function (callback) {
    var sql="select * from Label";
    this.sqlF(sql,callback);
  }
  //添加归档
  this.addFile=function (callback,text) {
    var sql="INSERT INTO Label (text,zindex) VALUES ("+text+")";
    this.sqlF(sql,callback);
  }
  //删除归档
  this.deletFile=function (callback,id) {
    var sql="DELETE FROM Label where id= "+id;
    this.sqlF(sql,callback)
  }
  //更新归档
  this.updateFile=function (callback,id,text,index) {
    var sql="update Label set text='"+text+"',zindex="+index+" where id ="+id;
    this.sqlF(sql,callback)
  }
}
module.exports =  Api;
