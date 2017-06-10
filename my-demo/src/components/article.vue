<template>
<div class="article">
  <Button type="info" id="goToFaBu" @click="goToFaBu">发布博客</Button>
  <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
  <div style="margin: 10px;overflow: hidden">
    <div style="float: right;">
      <Page :total="100" :current="1" @on-change="changePage"></Page>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'article',
  data () {
    return {
      tableData1: this.mockTableData1(),
      tableColumns1: [
        {
          title: '标题  ',
          key: 'name',
          align: 'center',
        },


        {
          title: '分类',
          key: 'time',
          align: 'center',
          render: (h, params) => {
            return h('div', '近' + params.row.time + '天');
          }
        },

        {
          title: '发布时间',
          key: 'update',
          align: 'center',
          render: (h, params) => {
            return h('div', this.formatDate(this.tableData1[params.index].update));
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
              }, '查看'),
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

    mockTableData1 () {
      let data = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          name: '商圈' + Math.floor(Math.random () * 100 + 1),
          status: Math.floor(Math.random () * 3 + 1),
          portrayal: ['城市渗透', '人群迁移', '消费指数', '生活指数', '娱乐指数'],
          people: [
            {
              n: '客群' + Math.floor(Math.random () * 100 + 1),
              c: Math.floor(Math.random () * 1000000 + 100000)
            },
            {
              n: '客群' + Math.floor(Math.random () * 100 + 1),
              c: Math.floor(Math.random () * 1000000 + 100000)
            },
            {
              n: '客群' + Math.floor(Math.random () * 100 + 1),
              c: Math.floor(Math.random () * 1000000 + 100000)
            }
          ],
          time: Math.floor(Math.random () * 7 + 1),
          update: new Date()
        })
      }
      return data;
    },
    formatDate (date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
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
