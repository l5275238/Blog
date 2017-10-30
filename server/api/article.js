/**
 * Created by T-Mac on 2017/6/29.
 */

function Api() {
  var api=require('../api');
  //添加文章
  this.addArticle=function (callback,text) {
    var sql="INSERT INTO Article (title,cateId, text ,date,html) VALUES ("+text+")";
    api.sqlF(sql,callback)
  }
  //分页获取文章列表
  this.findArticle=function (callback,page,row) {
    var sql='select a.*,b.text from Article a left join category b on a.cateId = b.id ORDER BY id limit '+(page-1)*row+','+row;
    api.sqlF(sql,callback);
  }
  //获取文章总数
  this.findArticleLenght=function (callback) {
    var sql='select count(1) from Article'
    api.sqlF(sql,callback);
  }
//查询文章
  this.findText=function (callback,id) {
    var sql='SELECT a.*,b.text FROM Article a left join category b on a.cateId = b.id where a.id ='+id;
    api.sqlF(sql,callback);
  }
  //查询分类下所用文章
    this.findFenLText=function (callback,id) {
        console.log(id);
        var sql='SELECT * FROM Article where cateId='+id;
        api.sqlF(sql,callback);
    }
  //搜索文章
    this.searchArticle=function (text,callback,page,row) {
        var sql="SELECT * FROM Article where title like '%"+text+"%'limit "+(page-1)*row+","+row;
        api.sqlF(sql,callback)
    }
  //更新文章
  this.updateArticle=function (callback,id,title,text,cateId,html) {
    var sql="update Article set cateId= "+cateId+", title= '"+title+"',text='"+text+"',html='"+html+"' where id ="+id;
    api.sqlF(sql,callback);
  }
  //删除文章
  this.deleteArticle=function (callback,id) {
    var  sql="DELETE FROM Article where id= "+id;
    api.sqlF(sql,callback);
  }
}

module.exports = new Api();
