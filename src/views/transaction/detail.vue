<template>
  <div class="page">
    <m-header :title='$route.query.type == 1?"立即卖出":"立即买入"' :canback="Boolean(1)"></m-header>
    <section class="body">
      <ul class="list">
        <li>
          <p class="title">{{$route.query.type == 1?"买家":"卖家"}}：</p>
          <input type="text" :value="data.mobile">
        </li>
        
        <li>
          <p class="title">可交易数量（CBD）：</p>
          <input type="text" placeholder="请输入出售币数" v-model="data.waitamount">
        </li>
        <li>
          <p class="title">{{$route.query.type != 1?"购买":"出售"}}数量（CBD）：</p>
          <input type="text" placeholder="请输入数量`" v-model="amount">
        </li>
        <li>
          <p class="title">单价(￥)：</p>
          <input type="text" placeholder="请输入单价" :value="data.uprice">
        </li>
        <li>
          <p class="title">总金额(￥)：</p>
          <input type="text" placeholder="自动生成" :value="Number(data.uprice*amount).toFixed(2)">
        </li>
        <li>
          <p class="title">支付密码：</p>
          <input type="password" placeholder="请输入支付密码" v-model="pwd">
        </li>
      </ul>
      <p class="bot">注：创建订单后请于两小时内付款</p>
      <button @click="py">{{$route.query.type == 1?"立即卖出":"立即买入"}}</button>
    </section>
  </div>
</template>
<script>
import { Init, Index, Base } from "@/server/server.js";
import { Util, Load, Secret } from "@/assets/commonjs/utils.js";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      title: null,
      type:null,
      orderid:null,
      data:{
        mobile:null,
        uprice:null,
        waitamount:null,
      },
      amount:null,
      pwd:null,
    };
  },
  mounted() { 
    this.initData();
    this.otcOrderdetail();
  },
  methods: {
    initData(){
      // this.title = this.$route.query.type == 1?"买入中心":"卖出中心";
      this.type = this.$route.query.type;
      this.orderid = this.$route.query.orderid;
    },
    formatDate(v){
      return Util.formatDate(v)
    },
    // 交易
    py(){
      let params = {
        orderid:this.orderid,
        amount:this.amount,
        pwd:this.pwd
      }
      Init[this.$route.query.type==1?'orderBuyOrder':'orderSellOrder'](params).then(res=>{
        mui.toast(res.msg)
        if(res.code==1){  
          setTimeout(()=>{
            this.$router.push({name:'myOrder'})
          },500)
        }
      })
    },
    // 交易订单列表
    otcOrderdetail(){
      Init.otcOrderdetail({orderid:this.orderid}).then(res=>{
        if(res.code==1){
          this.data = res.data
        }else{
          mui.toast(res.msg)
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  background-color: @bg-color;
  .list{
    width: 650px;
    margin: 44px 50px 0;
    li{
      width: 100%;
      margin-bottom: 16px;
      .title{
        font-size:34px;
        color: #fff;
        margin-bottom: 10px;
      }
      input{
        height: 94px;
        color: #000;
        border-radius: 10px;
      }
    }
  }
  .bot{
    color: red;
    margin-left: 60px;
    margin-bottom: 20px;
    margin-top: -20px;
  }
  button{
    width:650px;
    height:88px;
    background:rgba(60,252,172,1);
    border-radius:8px;
    margin-left: 50px;
    color: #000;
    margin-bottom: 30px;
  }
}
</style>
 
