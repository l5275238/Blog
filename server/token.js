/**
 * Created by T-Mac on 2017/6/20.
 */
var jwt = require('jsonwebtoken');

function Token() {
  var secretOrPrivateKey="123456" // 这是加密的key（密钥）
   this.create=function (name) {

     var content ={loginName:name}
      var token= jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60*60*24 // 24小时过期
      });
      return token;
   }
   this.verify=function (name,req,res,next) {
     jwt.verify(name, secretOrPrivateKey, function (err, decode) {
       if (err) {  //  时间失效的时候/ 伪造的token
          res.json({code:401,data:'你没有权限'})
       } else {
         next();
       }
     })
   }

}
module.exports = new Token();
