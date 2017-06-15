<template>
<div class="Addarticle">

  <Button type="primary" @click="modal6 = true;cateId='',fenLei='';">添加文章分类</Button>
  <Modal
    v-model="modal6"
    title="添加分类"
    @on-ok="addFenLei">
    <Input v-model="fenLei" placeholder="请输入..." style="width: 300px"></Input>
  </Modal>
  <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
</div>
</template>

<script>
  export default {
    name: 'Addarticle',
    data () {
      return {
        category:'',
        modal6: false,
        fenLei:'',
        cateId:'',
        tableData1:[],
        tableColumns1:[{
        title: '标题  ',
          key: 'title',
          align: 'center',
          render: (h, params) => {
            var index=[params.index];
           return h('div',index);
         }
      },

      {
        title: '分类',
          key: 'text',
        align: 'center',
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
                      var text=this.tableData1[params.index].text;
                      console.log(id);
                      this.edit(id,text)
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
      edit(id,text) {
          this.cateId=id;
       this.modal6=true;
       this.fenLei=text;
      },
      delet (id,index) {
        var that=this;
        this.$ajax.get('/api/deleteCategory',{
          params:{
            id:id,
          }
        })
          .then(function(response){
            that.fetData();
          })
          .catch(function(err){
            console.log(err);
          });
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      addFenLei(){
        var that=this;
            var url=this.cateId?'/api/updateCategory':'/api/addcategory';

        this.$ajax.get(url,{
          params:{
            text:this.fenLei,
            id:this.cateId
          }
        })
          .then(function(response){
            that.fetData();
            that.modal6=false
          })
          .catch(function(err){
            console.log(err);
          });
      },
      fetData(){
        var that=this;
        this.$ajax.post('/api/findCategory',{

        })
          .then(function(response){
            console.log(response.data);
            that.tableData1=response.data;
          })
          .catch(function(err){
            console.log(err);
          });
      },
      submit(){
        this.$ajax.post('/api/addArticle',{
          params:{
            title:this.title,
            cateId:this.category,
            text:this.content,
          }
        })
          .then(function(response){
            console.log(response.data);
//            that.categoryList=response.data;
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
</style>
