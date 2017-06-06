var mysql= require('mysql');
var connection =mysql.createConnection({
  host :'106.14.153.16',
  user:'root',
  password:'123456',
  database:'blogs'

})
function Request() {
  connection.connect();
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

}

module.exports = new Request();

