<template>
  <div class="page">
    <m-header title="共燚池" :canback="Boolean(1)">
      <span class="rule" @click="rule_show = true">规则</span>
    </m-header>
    <section class="body">
      <ul class="list">
        <li @click="$router.push({name:'cDetail',query:{type:'frj'}})">
          <div class="left">
            <p>我的贡献值总额：{{fr_jackpot.my_gx_num}}</p>
            <p>今日分红：<span>{{fr_jackpot.fr_reward}}</span></p>
            <p class="c_r">*注：分红领取以最新的分红数据为准</p>
            <p>当前奖池总额：{{fr_jackpot.amount}}</p>
          </div>
          <div class="right">
            <p>分润总池</p>
            <button @click.stop="get_frj">领取</button>
          </div>
        </li>

        <li @click="$router.push({name:'cDetail',query:{type:'zxj'}})">
          <div class="left">
            <p>当前中心节点：{{zx_jackpot.zx_num}}个</p>
            <p>预计分红：<span>{{zx_jackpot.zx_reward}}</span></p>
            <p class="c_r">*注：分红领取以最新的分红数据为准</p>
            <p>当前奖池总额：{{zx_jackpot.amount}}</p>
          </div>
          <div class="right">
            <p>中心奖池</p>
          </div>
        </li>

        <li @click="$router.push({name:'cDetail',query:{type:'gxj'}})">
          <div class="left">
            <p>当前同级人数：{{gx_jackpot.gx_num}}</p>
            <p>预计分红：<span>{{gx_jackpot.gx_reward}}</span></p>
            <p class="c_r">*注：分红领取以最新的分红数据为准</p>
            <p>当前奖池总额：{{gx_jackpot.gx_amount}}</p>
          </div>
          <div class="right">
            <p>贡献奖池</p>
          </div>
        </li>
      </ul>
    </section>
    <!-- <m-Footer></m-Footer> -->
    
    <div class="ale" v-show="rule_show">
      <div class="box">
        <div class="content" v-html="rule"></div>
        <button @click="rule_show = false">确认</button>
      </div>
    </div>
    <m-load ref="load"></m-load>
  </div>
</template>
<script>
import {Trade} from '@/server/server.js';
import {Util,Load,Secret} from '@/assets/commonjs/utils.js';
import {mapGetters,mapMutations} from 'vuex';
export default {
  data(){
      return {
        img:require('@/assets/images/gzlz/banner.png'),
        list:[],
        fr_jackpot:{
          amount:null,
          fr_reward:null,
          my_gx_num:null,
        },
        gx_jackpot:{
          gx_amount:null,
        },
        zx_jackpot:{
          amount:null,
          zx_num:null,
          zx_reward:null,
        },
        rule:null,
        rule_show:false,
      }
  },
  mounted() {
      this.initData();
      this.get_jackpot();
      this.poolrule()
  },
  computed: {
    ...mapGetters(['uid','api','bannerSrc','coinTxt','proData'])
  },
  methods: {
    initData(){
      
    },
    // 共燚池规则
    poolrule(){
      Trade.poolrule().then(res=>{
        if(res.code==1){
          this.rule = res.data;
        }else{
          mui.toast(res.msg)
        }
      })
    },
    // 领取分润奖
    get_frj(){
      Trade.get_frj().then(res=>{
        mui.toast(res.msg)
        if(res.code==1){
          this.get_jackpot()
        }
      })
    },
    // 共燚池列表
    get_jackpot(){
      Trade.get_jackpot().then(res=>{
        if(res.code==1){
          // this.list = res.data;
          this.fr_jackpot = res.data.fr_jackpot;
          this.gx_jackpot = res.data.gx_jackpot;
          this.zx_jackpot = res.data.zx_jackpot;
        }else{
          mui.toast(res.msg)
        }
      })
    },
    change(i){
      this.zf_se = i
    },
    formatTime(time){
      return Util.formatTime(time).substr(0,5);
    },
  },
  beforeRouteLeave (to, from, next) {
      clearInterval(this.mineInt);
      next();
    }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  line-height: 36px;
  background-color: @bg-color;
  .list{
    margin: 30px;
    li{
      width: 100%;
      padding: 30px 30px 30px 40px;
      border-radius: 10px;
      border:2px dashed rgba(60,252,172,1);
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      >div{
        p{
          text-align: left;
          font-size:28px;
          color: #fff;
          margin-top: 10px;
          &:first-child{
            margin-top: 0;
          }
          span{
            font-size:60px;
            font-weight:600;
            color:rgba(255,195,109,1);
          }
        }
        .c_r{
            font-size:24px;
            color:rgba(255,62,62,1);
        }
      }
      .left{
        flex: 10;
        p{
          &:nth-child(2){
            margin-top: 30px;
          }
        }
      }
      .right{
        flex: 3;
        text-align: right;
        p{
          text-align: right;
        }
        button{
          width:150px;
          height:68px;
          background:rgba(60,252,172,1);
          border-radius:10px;
          color: #333;
          margin-top: 36px;
        }
      }
    }
  }
}
.page{
  .rule{
    color: #3CFCAC;
  }
}

.ale{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .8);
  // background-color: red;
  z-index: 99;
  .box{
    border-radius: 10px;
    background-color: #fff;
    width: 690px;
    padding: 20px 30px;
    margin: 200px 30px 0;
    max-height: 800px;
    // height: 800px;
    position: absolute;
    .content{
      overflow-y: scroll;
      max-height: 680px;
      /deep/ p{
        color: #333;
      }
    }
    button{
      width: 100%;
      height: 88px;
      background-color: #3cfcac;
      color: #333;
      // margin-top: 30px;
      bottom: 0;
    }
  }
}
</style>

