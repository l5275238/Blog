var mysql= require('mysql');
var pool =mysql.createPool({
  host :'106.14.153.16',
  user:'root',
  password:'123456',
  database:'blogs'

})
function Request() {
  //使用连接池
  this.sqlF=function(sql,callback) {
    pool.getConnection(function(err,connection){
      if(err){
        console.log('与mysql数据库建立连接失败');
        // callback(err,null)
      }else{
        console.log('与mysql数据库建立连接成功');
        connection.query(sql,function(err,rows){
          callback(err,rows);
          connection.end();
        })
      }
    })
  }

}
module.exports = new Request();

