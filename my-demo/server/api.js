var mysql= require('mysql');
var article=require('./api/article')
var category=require('./api/category')
var user=require('./api/user')
var login=require('./api/login')
var connection =mysql.createConnection({
  host :'106.14.153.16',
  user:'root',
  password:'123456',
  database:'blogs'

})
function Request() {
  this.sqlF=function sqlF(sql,callback) {
    connection.query(sql, function (error,rows,fields) {
      callback(error,rows);
    });
  }

}
module.exports = new Request();

