<template>
  <div id="app">
    <ul class="pagination">
      <li><a href="javascript:void(0)" @click="next(current-1)" :class="{'disabled':page==1}">&laquo;</a></li>
      <li v-for="p in grouplist"  @click="next(p)"><a :class="{'active':current==p }" href="javascript:void(0)"> {{ p }}</a></li>
      <li><a href="javascript:void(0)" @click="next(current+1)" :class="{'disabled':page==1}">&raquo;</a></li>
    </ul>
  </div>
</template>

<script>

  export default {
    data(){
      return {
        current: this.currentPage
      }
    },
    props: {       //props 把数据传给子组件 以下属性是组件数据的一个字段，期望从父作用域传下来。子组件需要显式地用 props 选项 声明
      total: {// 数据总条数
        type: Number, //数据类型 验证
        default: 0  //默认值
      },
      showPage: {// 每页显示条数
        type: Number,
        default: 10
      },
      currentPage: {// 当前页码
        type: Number,
        default: 1
      },
      pagegroup: {// 分页条数
        type: Number,
        default: 5,
        coerce: function (v) {     //  验证 将数据处理在返回 如果是偶数则+1
          v = v > 0 ? v : 5;
          return v % 2 === 1 ? v : v + 1;
        }
      }
    },
    computed: {
      page: function () { // 总页数
        return Math.ceil(this.total / this.showPage);
      },
      grouplist: function () { // 获取分页页码
        var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2)+1, center =this.current; var pagegroup=this.pagegroup-1;
        if (len <= this.pagegroup) {
          while (len--) {
            temp.push(this.page - len);
          }
          ;
          return temp;
        }
        else {
          while (len--) {
            temp.push(this.page - len);
          }
          var index=temp.indexOf(center);
          if(index<=count){
              var deleIndex=this.page-this.pagegroup;
             temp.splice(pagegroup,deleIndex,"...");
          }
          else {
            if(index<=this.page-count){
                var deleIndex1=index-1-1;
                var deleIndex2=(this.page-count-index)>0?(this.page-count-index):0;
              if(deleIndex2>0){
                temp.splice(index+count-1 ,deleIndex2,"...");
              }
              temp.splice(1,deleIndex1,"...");


            }
            else {
                var deleIndex=this.page-this.pagegroup;
              temp.splice(-pagegroup,deleIndex,'...')
            }
          }
          return temp;
        }

      }
    },
    methods: {
      next: function (idx) {
       if(idx>0&&idx<=this.page){
         this.current=idx;
         this.$emit('pagechange', this.current);
       }
      }
    }

  }
</script>


<style>
  .pagination>li>.active{
    background: #dddddd!important;
  }
  .pagination>li>a:focus, .pagination>li>a:hover, .pagination>li>span:focus, .pagination>li>span:hover{
    background: none;
  }
  .disabled{
    cursor: not-allowed;
  }

</style>
