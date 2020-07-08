<template>
  <div class="page">
    <m-header :title='$route.query.type == 1?"买入中心":"卖出中心"' :canback="Boolean(1)"></m-header>
    <section class="body">
      <ul class="list" :style="'height:'+(screenHeight-100)+'px;overflow:auto;'" v-lazy-load="lazyLoad">
        <li v-for="v in list" :key="v.id">
          <div class="left">
            <p>卖家：{{v.mobile}}</p>
            <p>单价：{{v.uprice}}</p>
            <!-- <p>数量：{{v.amount2}}</p> -->
            <p>可交易数量：{{v.waitamount}}</p>
            
            <p>总额：{{Number(v.uprice*v.amount2).toFixed(2)}}</p>
          </div>
          <div class="right">
            <p>{{formatDate(v.createtime)}}</p>
            <button @click="$router.push({name:'tDetail',query:{type,orderid:v.id}})">{{type==1?'立即卖出':'立即买入'}}</button>
            <p>近30天成交量：{{v.volume}}</p>
          </div>
        </li>
      </ul>
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
      list:[],
      page:1,
      screenHeight:null,
      noMore:false,
    };
  },
  mounted() { 
    this.initData();
    this.otcOrder();
  },
  methods: {
    initData(){
      // this.title = this.$route.query.type == 1?"买入中心":"卖出中心";
      this.type = this.$route.query.type;
      this.screenHeight = window.screen.height || window.screen.availHeight;
    },
    formatDate(v){
      return Util.formatDate(v)
    },
    lazyLoad(){
        this.page = this.page+1;
        if(!this.noMore){
            this.otcOrder(); 
        }
    },
    // 交易订单列表
    otcOrder(){
      Init.otcOrder({type:this.type,page:this.page}).then(res=>{
        if(res.code==1){
          // this.list = res.data
          
          this.list = this.list.concat(res.data||[]);
          if(!res.data||res.data.length<10)
          this.noMore = true;
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
    width: 690px;
    margin: 30px;
    li{
      display: flex;
      justify-content: space-between;
      border:2px dashed rgba(60,252,172,1);
      border-radius: 12px;
      padding: 20px 30px;
      margin-bottom: 30px;
      .left{
        p{
          margin-top: 8px;
        }
      }
      .right{
        text-align: right;
        p{
          margin-top: 8px;
          &:last-child{
            margin-top: 0;
          }
        }
        button{
          background-color: #3CFCAC;
          width: 150px;
          height: 68px;
          color: #000;
          margin: 20px 0;
          font-size: 20px;
        }
      }
    } 
  }
}
</style>
 
