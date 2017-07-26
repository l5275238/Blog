<template>
  <div class="hello">
    <div class="File">
    <Button id="add" type="primary" @click="modal6 = true;id='',fenLei='';">添加归档</Button>
    </div>
    <Modal
      v-model="modal6"
      title="添加分类"
      @on-ok="addFenLei">
      <Input v-model="text" placeholder="请输入..." style="width: 300px"></Input>
      <Slider v-model="index" :step="10"></Slider>
    </Modal>
    <Table :row-class-name="rowClassName" :data="tableData1" :columns="tableColumns1" style="background: none" stripe></Table>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      modal6:false,
      index:30,
      text:'',
      id:'',
      tableData1:[],
      tableColumns1:[
        {
          title: '序号  ',
          key: 'title',
          align: 'center',
          render: (h, params) => {
            var index=[params.index];
            return h('div',index);
          }
        },

        {
          title: '内容',
          key: 'text',
          align: 'center',
        },
        {
          title: '重要度',
          key: 'zindex',
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
      edit(id){
        this.id=id;
        this.modal6=true;
      },
    rowClassName (row, index) {

        return 'demo-table-info-row';

    },
    addFenLei(){
          var that=this;
      var url=this.id?'/api/updateFile':'/api/addFile';
      this.$ajax.get(url,{
        params:{
          id:this.id,
          text:this.text,
          index:this.index
        }
      })
        .then(function(response){
//          that.tableData1=response.data;
          that.fetData();
        })
        .catch(function(err){
          console.log(err);
        });
    },
    delet(id){
      var that=this;
      this.$ajax.get('/api/deletFile',{
        params:{
           id:id
        }
      })
        .then(function(response){
          that.fetData();

        })
        .catch(function(err){
          console.log(err);
        });
    },
    fetData(){
        var that=this;
      this.$ajax.get('/api/findFile',{

      })
        .then(function(response){

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
<style>
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
.File{
  height: 40px;
}
a {
  color: #42b983;
}
#add{
  float: right;
  margin-right: 50px;
}
/*.ivu-table .demo-table-info-row td{*/
  /*background-color: #2db7f5;*/
  /*color: #fff;*/
/*}*/


</style>
