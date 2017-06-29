/**
 * Created by T-Mac on 2017/6/29.
 */
function Api() {
  //添加分类;
  this.addCategory=function (callback,text) {
    var sql="INSERT INTO category (text) VALUES('"+text+"')";
    this.sqlF(sql,callback)
  }
  //获取分类列表
  this.findCategory=function (callback) {
    var sql="SELECT * FROM category"
    this.sqlF(sql,callback)

  }
  //更新分类列表
  this.updateCategory=function (callback,text,id) {
    var sql="update category set text='"+text+"' where id="+id;
    this.sqlF(sql,callback);
  }
  //删除分类
  this.deleteCategory=function (callback,id) {
    var sql="DELETE FROM category where id= "+id;
    this.sqlF(sql,callback);
  }
}
module.exports =  Api;
