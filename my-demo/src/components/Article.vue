<template>
<div class="article">
  <div class="botton" style="padding-right: 200px">
  <Button  type="info" id="goToFaBu" @click="goToFaBu">发布博客</Button>
  </div>
  <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
  <div style="margin: 10px;overflow: hidden;padding-right: 200px">
    <div style="float: right;">
      <Page :total="lengh" :current="page" :page-size="row" @on-change="changePage" ></Page>
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
      lengh:1,
      page:1,
      row:10,
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
          key: 'date',
          align: 'center',
//          render: (h, params) => {
//            return h('div', this.formatDate(this.tableData1[params.index].date));
//          }
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
                      var id=this.tableData1[params.index].id
                    console.log(id);
                      this.edit(id)
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
                    var id=this.tableData1[params.index].id
                      this.delet(id,params.index);
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
    edit(id) {
  this.$router.push({name:'ArticleAdd',query:{id:id}})
    },
    delet (id,index) {
      var that=this;
      this.$ajax.get('/api/deleteArticle',{
        params:{
          id:id,
          page:this.page,
          row:this.row
        }
      })
        .then(function(response){
        that.tableData1=response.data;
        })
        .catch(function(err){
          console.log(err);
        });
    },
    goToFaBu(){
      this.$router.push({name:'ArticleAdd',query:{id:''}})
    },
    fetData () {
        var that=this;
      this.$ajax.get('/api/findArticle',{
        params:{
         page:this.page,
          row:this.row
        }
      })
        .then(function(response){
          console.log(response.data);
          that.tableData1=response.data;

        })
        .catch(function(err){
          console.log(err);
        });
      this.$ajax.get('/api/findArticleLenght')
        .then(function(response){
var data=response.data[0]
        that.lengh=data['count(1)']

        })
        .catch(function(err){
          console.log(err);
        });

    },

    formatDate (date) {

      return date;
    },
    changePage (index) {
      var that=this;
      this.$ajax.get('/api/findArticle',{
        params:{
          page:index,
          row:this.row
        }
      })
        .then(function(response){
          console.log(response.data);
          that.tableData1=response.data;

        })
        .catch(function(err){
          console.log(err);
        });
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
  .botton{
    height: 40px;
  }
  #goToFaBu{
    float: right;
  }
.ivu-table td{
  background: red;
}
</style>
