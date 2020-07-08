<template>
  <div class="page">
    <m-header title='交易订单' :canback="Boolean(1)"></m-header>
    <section class="body">
      <div class="top">
        <p :class="{'se':type==1}" @click="changeSe(1)">我的买单</p>
        <p :class="{'se':type==2}" @click="changeSe(2)">我的卖单</p>
      </div>
      <ul class="select">
        <li :class="{'se':status==1}" @click="changeSe(type,1)">已创建</li>
        <li :class="{'se':status==2}" @click="changeSe(type,2)">待付款</li>
        <li :class="{'se':status==3}" @click="changeSe(type,3)">待确认</li>
        <li :class="{'se':status==4}" @click="changeSe(type,4)">已完成</li>
        <li :class="{'se':status==10}" @click="changeSe(type,10)">申诉中</li>
        <li :class="{'se':status==20}" @click="changeSe(type,20)">已取消</li>
      </ul>
      <ul class="list" :style="'height:'+(screenHeight-100)+'px;overflow:auto;'" v-lazy-load="lazyLoad">
        <li v-for="v in list" :key="v.id" @click="$router.push({name:'myDetail',query:{table:v.table,id:v.id,type}})">
          <div>
            <p v-if="status!=1">{{type==1?'卖家':'买家'}}：{{userInfo.username==v.pairname?v.uuname:v.pairname}}</p>
            <p>
              <span>单价：{{v.price||v.uprice}}</span>
              <span>数量：{{v.amount||v.waitamount}} CBD</span>
            </p>
            <p>总额：<span>￥{{v.totalprice}}</span></p>
          </div>
          <button>{{getBtn(v.status)}}</button>
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
      status:1,
      page:1,
      screenHeight:null,
      noMore:false,
    };
  },
  mounted() { 
    this.initData();
    this.myorder();
    console.log('userInfo',this.userInfo.username)
  },
  computed: {
    ...mapGetters([,'api','userInfo'])
  },
  methods: {
    initData(){
      // this.title = this.$route.query.type == 1?"买入中心":"卖出中心";
      this.type = this.$route.query.type||1;
      this.status = this.$route.query.status||1;
      this.screenHeight = window.screen.height || window.screen.availHeight;
    },
    
    lazyLoad(){
        this.page = this.page+1;
        if(!this.noMore){
            this.myorder(); 
        }
    },
    formatDate(v){
      return Util.formatDate(v)
    },
    // 交易订单列表
    myorder(){
      Init.myorder({type:this.type,status:this.status,page:this.page}).then(res=>{
        if(res.code==1){
          // this.list = res.data
          
          this.list = this.list.concat(res.data||[]);
          if(!res.data||res.data.length<10)
          this.noMore = true;
        }else{
          mui.toast(res.msg)
        }
      })
    },
    // 切换买卖
    changeSe(type,status){
      if((type==this.type&&!status)||(this.type==type&&this.status==status)) return;
      if(!status) this.status = 1;
      this.type = type;
      this.status = status||1;
      this.list = [];
      this.page = 1;
      this.noMore = false;
      this.myorder();
    },
    getBtn(v){
      switch(+v){
        case 1:
          return '已创建';
        case 2:
          return '待付款';
        case 3:
          return '待确认';
        case 4:
          return '已完成';
        case 10:
          return '申诉中';
        case 20:
          return '已关闭';
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  background-color: @bg-color;
  .top{
    display: flex;
    justify-content: space-between;
    background-color: #232323;
    margin-bottom: 1px;
    margin-top: 1px;
    p{
      height: 88px;
      line-height: 88px;
      text-align: center;
      font-size:32px;
      flex: 1;
    }
    .se{
      background-color: #3CFCAC;
      color: #111;
    }
  }
  .select{
    white-space: nowrap;
    height: 88px;
    background-color: #232323;
    overflow-x: scroll;
    li{
      display: inline-block;
      text-align: center;
      width: 140px;
      font-size: 32px;
      line-height: 88px;
      color: #fff;
    }
    .se{
      color: #3CFCAC;
      box-sizing: border-box;
      border-bottom: 4px solid #3CFCAC;
    }
  }
  .list{
    width: 690px;
    margin: 30px 30px 0;
    li{
      border:2px dashed rgba(60,252,172,1);
      padding: 20px 30px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      border-radius: 10px;
      position: relative;
      >div{
        p{
          font-size: 24px;
          color: #fff;
          margin-bottom: 10px;
          &:nth-child(2){
            span{
              margin-right: 30px;
            }
          }
          &:last-child{
            margin-bottom: 0;
          }
        }
      }
      >button{
        position: absolute;
        width: 150px;
        height: 68px;
        border-radius: 10px;
        color: #000;
        background-color: #3CFCAC;
        // margin-top: 44px;
        top: calc(50% - 24px);
        // top: 50%;
        right: 30px;
      }
    }
  }
}
</style>
 
