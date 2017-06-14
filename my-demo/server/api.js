var mysql= require('mysql');
var connection =mysql.createConnection({
  host :'106.14.153.16',
  user:'root',
  password:'123456',
  database:'blogs'

})
function Request() {
  connection.connect();
  var sqlF=function (sql,callback) {
    connection.query(sql, function (error,rows,fields) {
      if (error) throw error;
      callback(rows);
    });
  }
  this.findUse=function (callback) {
    connection.query('SELECT * FROM user', function (error,rows,fields) {
      if (error) throw error;
      callback(rows);
    });
  }
  this.updateUse=function (callback,name,text) {
    var sql="update user  set name= '"+name+"',text='"+text+"' where id = '1'"
    console.log(sql);
    connection.query(sql,function (error,rows,fields) {
      if (error) throw error;
      callback(rows);
    })
  }
  //添加文章
  this.addArticle=function (callback,text) {
    var sql="INSERT INTO Article (title,cateId, text ,date) VALUES ("+text+")";
    sqlF(sql,callback)
  }
  //分页获取文章列表
  this.findArticle=function (callback,page,row) {
    var sql='select a.title,a.date,a.id,b.text from Article a left join category b on a.cateId = b.id ORDER BY id limit '+(page-1)*row+','+row;
    console.log(sql);
    sqlF(sql,callback);
  }
  //获取文章总数
  this.findArticleLenght=function (callback) {
      var sql='select count(1) from Article'
    sqlF(sql,callback);
  }
//查询文章
  this.findText=function (callback,id) {
    var sql='SELECT * FROM Article where id ='+id;
    sqlF(sql,callback);
  }
  //更新文章
  this.updateArticle=function (callback,id,title,text,cateId) {
    var sql="update Article set cateId= "+cateId+", title= '"+title+"',text='"+text+"' where id ="+id;
    sqlF(sql,callback);
  }
  //删除文章
  this.deleteArticle=function (callback,id) {
    var  sql="DELETE FROM Article where id= "+id;
    sqlF(sql,callback);
  }
  //添加分类;
  this.addCategory=function (callback,text) {
    var sql="INSERT INTO category (text) VALUES('"+text+"')";
    sqlF(sql,callback)
  }
    //获取分类列表
  this.findCategory=function (callback) {
    var sql="SELECT * FROM category"
    sqlF(sql,callback)

  }

}

module.exports = new Request();

