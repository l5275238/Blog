var mysql= require('mysql');
var connection =mysql.createConnection({
  host :'106.14.153.16',
  user:'root',
  password:'123456',
  database:'blogs'

})
function Request() {
  connection.connect();
  this.updateUse=function (callback) {
    connection.query('SELECT * FROM user', function (error,rows,fields) {
      if (error) throw error;
      callback(rows);
    });
  }

}
module.exports = new Request();

