<template>
<div class='all'>
<div id='left'>
  <div id='left-top'><div>回首页</div></div>
  <div id='new-book'><Icon type="plus-round"></Icon><a href="javascript:0"  @click="isAdd=!isAdd">新建文集</a>
    <transition name="isShow">
 <div class="addBook" v-show='isAdd'>
    <input v-model="fenLei">
    <div> <button @click="addFenLei">提交</button><a class='no-a'>取消</a></div>

  </div>
    </transition>
  </div>
  <div id='bookList'>
    <div v-for="item in tableData1" @click="findText(item.id)">
      <span>{{item.text}}</span><Icon type="gear-b"></Icon>
    </div>
</div>
</div>
<div id='center'>
  <div id='addText'><Icon type="plus-circled"></Icon>新建文章</div>
  <a href="javascript:0" id="textList"><span>标题</span><Icon type="gear-b"></Icon></a>

</div>

 <div id='editor'>
 <div class="title"><input></div>
 <div id="div1" class="toolbar">
    </div>
    <div id="div2" class="text"> <!--可使用 min-height 实现编辑区域自动增加高度-->
        <p>请输入内容</p>
    </div>
    </div>
</div>
</template>

<script>
 import E from 'wangeditor';
  export default {
    data(){
      return {
        current: this.currentPage,
        isAdd:false,
        fenLei:'',
        tableData1:[

        ],
        textList:[],
      }
    },
    props: {       //props 把数据传给子组件 以下属性是组件数据的一个字段，期望从父作用域传下来。子组件需要显式地用 props 选项 声明
      html: {// 数据总条数
        type: String, //数据类型 验证
        default: ''  //默认值
      },
      imgServer:{
        type: String,
         default: ''
      }
    },
    computed: {


    },
      mounted(){
        var that=this;
   var editor = new E('#div1','#div2');
   var editorDiv=document.getElementById('editor');
   var show=document.getElementById('show')
   editor.customConfig.menus = [
    'bold',  // 粗体
    'italic',  // 斜体
    'underline',  // 下划线
    'strikeThrough',  // 删除线
    'foreColor',  // 文字颜色
    'backColor',  // 背景颜色
    'link',  // 插入链接
    'list',  // 列表
    'justify',  // 对齐方式
    'quote',  // 引用
    'image',  // 插入图片
    'table',  // 表格
    'code',  // 插入代码
    ];
   editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
    editor.customConfig.uploadImgServer = '/api/profile';
    editor.customConfig.uploadImgMaxLength = 1;
  editor.customConfig.uploadFileName = 'img'
  editor.customConfig.uploadImgHooks={
      before: function (xhr, editor, files) {

        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
        // return {
        //     prevent: true,
        //     msg: '放弃上传'
        // }
    },
    success: function (xhr, editor, result) {

        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
    },
    fail: function (xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
    },
    error: function (xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
    },
    timeout: function (xhr, editor) {
        // 图片上传超时时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
    },

    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
    customInsert: function (insertImg, result, editor) {

        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        var url =that.url+ result.path
        insertImg(url)

        // result 必须是一个 JSON 格式字符串！！！否则报错
    }



  };
   editor.customConfig.customAlert = function (info) {
    console.log(info)
    // info 是需要提示的内容
    alert('自定义提示：' + info)
}
   editor.customConfig.onchange = function (html) {
        // html 即变化之后的内容

       // show.innerHTML=html;
    }
   editor.create();
        this.fetData()

    },
    methods: {
      next: function (idx) {
       if(idx>0&&idx<=this.page){
         this.current=idx;
         this.$emit('pagechange', this.current);
       }
      },
      fetData(){
        var that=this;
        this.$ajax.post('/findCategory',{

        })
          .then(function(response){
            console.log(response.data);
            that.tableData1=response.data;
          })
          .catch(function(err){
            console.log(err);
          });
      },
      addFenLei(){
        var that=this;
        this.$ajax.get('/addcategory',{
          params:{
            text:this.fenLei,
          }
        })
          .then(function(response){
            that.fetData();
          })
          .catch(function(err){
            console.log(err);
          });
      },
      findText(id){
        var that=this;
        this.$ajax.post('/findFenLText',{
          params:{
            id:id,
          }
        })
          .then(function(response){
              that.textList=response.data;
          })
          .catch(function(err){
            console.log(err);
          });
      },
    }

  }
</script>


<style>
input{
      background-color: white;
    border: 1px solid #cccccc;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
    -moz-box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
    -webkit-transition: border linear 0.2s, box-shadow linear 0.2s;
    -moz-transition: border linear 0.2s, box-shadow linear 0.2s;
    -o-transition: border linear 0.2s, box-shadow linear 0.2s;
    transition: border linear 0.2s, box-shadow linear 0.2;
        display: inline-block;
    height: 20px;
    padding: 4px 6px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 20px;
    color: #555555;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    vertical-align: middle;
  }
a:link {
text-decoration: none;
color: #fff;
}
a:visited {
text-decoration: none;
}
a:hover {
text-decoration: none;
}
a:active {
text-decoration: none;
font-size: 14px;
font-weight: bold;
}

button ,input{
outline:none;


}
 .all{
  width: 100%;
  height: 100%;
  display: flex;
 }
 .w-e-toolbar{

 }
 #left{
   width: 20%;
   background:#3f3f3f;
   color: #ffffff
 }
 #center{
  width: 20%;
 }
 #editor{
  width: 60%;
 }
 .w-e-text{
  overflow-y: auto;
 }
 #left-top{
  width: 100%;
  height: 100px;
  padding: 35px  20px ;
  padding-bottom: 20px

 }
 #left-top>div{
  border:1px solid #ec7259;
  border-radius: 20px;
  height:100%;
  width: 100%;
  color:#ec7259;
  justify-content:center;
  display: flex;
  align-items:center;
  font-size: 16px;
 }
 #show{
  width: 50%;
  height: 100%;
  float: left;
 padding-top:30px;
 }
 #new-book{
  padding: 0 15px;

    margin-bottom: 10px;
    font-size: 11px;
    line-height: 20px;
 }
 img{
  width: 100%;
 }
 .addBook{
  margin-top:10px;
  display: flex;
   flex-direction: column;
  justify-content: space-between;
  align-items: center;
   overflow: hidden;
 }
 .addBook>input{
    width: 100%;
    height: 35px;
    box-sizing: border-box;
    background-color: rgba(180,180,180,0.2);
    border-color: #2f2f2f;
    color: #c8c8c8;
 }
  .addBook button{
    background: none;
    border-color: #34ab20;
    border-radius: 20px;
    color: #34ab20;
    padding: 5px 20px;
    border:2px solid;
    cursor: pointer;
  }
  .no-a{
    padding-top: 10px;
    background: none;
    border: none;
    color: #969696;
    display: inline-block;
    padding-left: 10px
  }
  #bookList>div{
        height: 34px;

        font-size: 15px;
        display: flex;
         justify-content:space-between;
         align-items:center;
         padding: 0 15px

  }
  #center{
    border-right: 1px solid #cccccc
  }
  #addText{
     display: flex;
       justify-content:flex-start;
        align-items:center;
    padding: 20px 0 20px 25px;
    font-size: 15px;
    font-weight: normal;
  }
  .title {
    height: 50px
  }

  .title input{
        width: 100%;
        height: 100%;
    padding: 0 30px 10px 40px;
    margin-bottom: 0;
    border-bottom: 1px solid #d9d9d9;
    font-size: 30px;
    font-weight: normal;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 0;
    box-shadow: none;
    border: none;
  }
.isShow-enter-active, .isShow-leave-active {
  height: 100%;
  transition: all 0.5s
}
#textList{
  display: flex;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  font-weight: normal;
  line-height: 36px;
  padding: 15px 30px 15px 60px;
  margin: 0px;
  overflow: hidden;
  justify-content:space-between;
  align-items:center;
  color: #2f2f2f;
  width: 100%;
}
#textList >span{
  display: block;
}
#textList >i{
  color: #a0a0a0;
}
.isShow-enter, .isShow-leave-active {
    height: 0;
  transition: all 0.5s

}
</style>
