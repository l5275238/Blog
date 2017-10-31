/**
 * Created by T-Mac on 2017/6/29.
 */

function Api() {
  var api=require('../api')
  //添加分类;
  this.addCategory=function (callback,text) {
    var sql="INSERT INTO category (text) VALUES('"+text+"')";
    api.sqlF(sql,callback)
  }
  //获取分类列表
  this.findCategory=function (callback) {
    var sql="SELECT * FROM category order by id desc"
    api.sqlF(sql,callback)

  }
  //更新分类列表
  this.updateCategory=function (callback,text,id) {
    var sql="update category set text='"+text+"' where id="+id;
    api.sqlF(sql,callback);
  }
  //删除分类
  this.deleteCategory=function (callback,id) {
    var sql="DELETE FROM category where id= "+id;
    api.sqlF(sql,callback);
  }
    //获取分类
    this.findCategoryLenght=function (callback) {
        var sql='select count(1) from category'
        api.sqlF(sql,callback);
    }
}
module.exports =  new Api();
