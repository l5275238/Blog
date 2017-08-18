/**
 * Created by T-Mac on 2017/7/3.
 */

var callBack=function (error,rows,req,res) {
  var obj={}
  if(error){
    obj={
      message:error,
      code:500,
    }
  }
  else {
    obj={
      code:'sucsse',
      data:rows,
      message:error,
    }
  }
  res.json(obj)

}




module.exports=callBack;
