/**
 * Created by T-Mac on 2017/6/29.
 */
var mysql=require('../api')
function Api() {;
  //添加文章
  this.addArticle=function (callback,text) {
    var sql="INSERT INTO Article (title,cateId, text ,date,html) VALUES ("+text+")";
    mysql.sqlF(sql,callback)
  }
  //分页获取文章列表
  this.findArticle=function (callback,page,row) {
    var sql='select a.title,a.date,a.id,b.text from Article a left join category b on a.cateId = b.id ORDER BY id limit '+(page-1)*row+','+row;
    mysql.sqlF(sql,callback);
  }
  //获取文章总数
  this.findArticleLenght=function (callback) {
    var sql='select count(1) from Article'
    mysql.sqlF(sql,callback);
  }
//查询文章
  this.findText=function (callback,id) {
    var sql='SELECT * FROM Article where id ='+id;
    mysql.sqlF(sql,callback);
  }
  //更新文章
  this.updateArticle=function (callback,id,title,text,cateId,html) {
    var sql="update Article set cateId= "+cateId+", title= '"+title+"',text='"+text+"',html='"+html+"' where id ="+id;
    mysql.sqlF(sql,callback);
  }
  //删除文章
  this.deleteArticle=function (callback,id) {
    var  sql="DELETE FROM Article where id= "+id;
    mysql.sqlF(sql,callback);
  }
}
module.exports = new Api();
