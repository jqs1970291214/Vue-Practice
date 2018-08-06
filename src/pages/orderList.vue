<template>
  <div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <v-selection :selections="products" @on-change="productChange"></v-selection>
      </div>
      <div class="order-list-option">
        开始日期：
        <v-date-picker @change="changeStartDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        结束日期：
        <v-date-picker @change="changeEndDate"></v-date-picker>

      </div>

      <div class="order-list-option">
        关键词：
        <input type="text" class="order-query" v-model.lazy="query"> 
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="head in tableHeads" 
          @click="changeOrder(head)"
          :class="{active:head.active}">{{ head.label }}</th>
        </tr>
        <tr v-for="item in tableData">
          <td v-for="head in tableHeads">{{ item[head.key] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import VSelection from '@/components/selection'
import VDatePicker from '@/components/datepicker'
import _ from 'lodash'

export default {
  components: {
   VSelection,
   VDatePicker
  },
  data () {
    return {  
      currentOrder: 'asc',
      tableData:[], // 如果使用vuex，写作this.$store.getTableData
      startDate: '',
      endDate: '',  
      query: '',
      productId: 0,
      products: [
        {
          label: '数据统计',
          value: 0
        },
        {
          label: '数据预测',
          value: 1
        },
        {
          label: '流量分析',
          value: 2
        },
        {
          label: '广告发布',
          value: 3
        }
      ],
      tableHeads: [
        {
          label: '订单号',
          key: 'orderId',
          active: false
        },
        {
          label: '购买产品',
          key: 'product',
          active: false

        },
        {
          label: '版本类型',
          key: 'version',
          active: false

        },
        {
          label: '有效时间',
          key: 'period',
          active: false

        },
        {
          label: '数量',
          key: 'buyNum',
          active: false

        },
        {
          label: '购买日期',
          key: 'date',
          active: false

        },
        {
          label: '总价',
          key: 'amount',
          active: false

        }
      ]
    }
  },
  watch: {
      query() {
        this.getTableData();
      }
  },
  methods: {
    getTableData() {
        let reqParam = {
            productId: this.productId,
            query: this.query,
            startDate: this.startDate,
            endDate: this.endDate
        };
        this.$http.get("/api/getOrderList", reqParam)
            .then((res) => {
                this.tableData = res.data.list;
                console.log(this.tableData);
            }).catch((err) => {
                console.log(err)
            });
    },
    changeOrder(head){
        //每次都现将所有的表头设为false
        this.tableHeads.map((item) => {
            item.active = false;
            return item;
        });
        head.active = true;
        if (this.currentOrder === 'asc') {
            this.currentOrder = 'desc';
        } else {
            this.currentOrder = 'asc';
        }

        this.tableData = _.orderBy(this.tableData,head.key,this.currentOrder);
    },
    productChange(obj) {
        this.productId = obj.value;
        this.getTableData();
        // 使用vuex的话
        // this.$store.commit('updateParams',{  //提交mutations
        //     key: 'productId',
        //     val: obj.value
        // });
        // this.$store.dispatch('fetchOrderList') 调度actions
    },
    changeStartDate(date) {
        this.startDate = date;
        this.getTableData();

    },
    changeEndDate(date) {
        this.endDate = date;
        this.getTableData();

    }
  },
  mounted () {
      this.getTableData();
  }
}
</script>

<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}
</style>
