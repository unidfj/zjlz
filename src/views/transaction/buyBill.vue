<template>
  <div class="page">
    <m-header :title="title" :canback="Boolean(1)"></m-header>
    <section class="body">
      <div>
        <ul class="bill">
          <li class="item_li">
            <div class="title">{{title=='发布买单'?'购买':'出售'}}数量(CBD)</div>
            <input
              v-model="number"
              type="number"
              :placeholder="title=='发布买单'?'请输入购买数量':'请输入出售数量'">
          </li>
          <li class="item_li">
            <div class="title">单价(￥)</div>
            <input
              type="text"
              v-model="uprice"
              placeholder="请输入单价">
          </li>
          <li class="item_li">
            <div class="title">总金额数(￥)</div>
            <input
              type="number"
              readonly
              :value="Number(number*uprice).toFixed(2)">
          </li>
          <li class="item_li">
            <div class="title">手续费(CBD)</div>
            <input
              type="number"
              readonly
              :value="Number(number*poundage/100).toFixed(2)">
          </li>
          <li class="item_li">
            <div class="title">单价区间</div>
            <input
              class="placeholder_color"
              type="number"
              readonly
              :placeholder="`￥（${section})`">
          </li>
          <li class="item_li">
            <div class="title">支付密码</div>
            <input
              v-model="pwd"
              type="password"
              placeholder="请输入支付密码">
          </li>

          <div class="explain">注意：求购单一经发布不可撤销</div>
        </ul>
        <button @click="createBuyOrder" v-if="title=='发布买单'" class="btn">创建买单</button>
        <button @click="createSellOrder" v-else class="btn">创建卖单</button>
      </div>
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
      number: null,
      uprice: null,
      pwd: null,
      section:null,
      poundage:null,
      // pwd2: null
    };
  },
  mounted() { 
    this.initData();
    this.getCcParam();
  },
  methods: {
    initData(){
      this.title = this.$route.query.type === "buy"?"发布买单":"发布卖单";
    },
    // 交易基数
    getCcParam(){
      Init.getCcParam().then(res=>{
        if(res.code==1){
          this.poundage = res.data.poundage
          this.section = res.data.section
        }else{
          mui.toast(res.msg)
        }
      })
    },
    // 创建卖单
    createSellOrder() {
      let params = {
        amount: this.number,
        uprice: this.uprice,
        pwd: this.pwd
      }
      Init.createSellOrder(params).then(res => { 
        mui.toast(res.msg);
        if (res.code == 1) {
          setTimeout(()=>{
            this.$router.go(-1)
            // this.$router.push({name:'transaction'})
          },500)
        }
      });
    },
    // 创建买单
    createBuyOrder(){
      let params = {
        amount: this.number,
        uprice: this.uprice,
        pwd: this.pwd
      }
      Init.createBuyOrder(params).then(res => { 
        mui.toast(res.msg);
        if (res.code == 1) {
          setTimeout(()=>{
            // this.$router.push({name:'transaction'})
            this.$router.go(-1)
          },500)
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  line-height: 36px;
  background-color: @bg-color;
  padding: 30px;
  .bill {
    .item_li {
      .title {
        height: 48px;
        font-size: 34px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 48px;
        margin-bottom: 8px;
      }
      input {
        height: 94px;
        line-height: 94px;
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
        font-size: 34px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(154, 154, 154, 1);
      }
      .placeholder_color {
        &::-webkit-input-placeholder {
          color: rgba(255, 62, 62, 1);
        }
      }
    }
    .explain {
      height: 40px;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 62, 62, 1);
      line-height: 40px;
    }
  }
  .btn {
    width: 100%;
    height: 88px;
    line-height: 88px;
    background: rgba(60, 252, 172, 1);
    border-radius: 8px;
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-top: 37px;
  }
}
</style>
 
