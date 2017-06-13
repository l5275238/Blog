<template>
<div class="article">
  <Button type="info" id="goToFaBu" @click="goToFaBu">发布博客</Button>
  <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
  <div style="margin: 10px;overflow: hidden">
    <div style="float: right;">
      <Page :total="length" :current="1" @on-change="changePage"></Page>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'article',
  data () {
    return {
      tableData1:[],
      length:'',
      tableColumns1: [
        {
          title: '标题  ',
          key: 'title',
          align: 'center',
        },


        {
          title: '分类',
          key: 'text',
          align: 'center',
        },

        {
          title: '发布时间',
          key: 'data',
          align: 'center',
          render: (h, params) => {
            return h('div', this.formatDate(this.tableData1[params.index].date));
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',

          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ]);
          }

        }
      ]
    }
  },
  created(){
    this.fetData();
  },

  methods: {
    show (index) {
      this.$Modal.info({
        title: '用户信息',
        content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1);
    },
    goToFaBu(){
      this.$router.push('/addArticle')
    },
    fetData () {
        var that=this;
      this.$ajax.get('/api/findArticle',{
        params:{
         page:1,
          row:10
        }
      })
        .then(function(response){
         that.tableData1=response.data;
         that.lenght=response.data.length
        })
        .catch(function(err){
          console.log(err);
        });
    },

    formatDate (date) {

      return date;
    },
    changePage (index) {
      // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
//
      console.log(index);
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
