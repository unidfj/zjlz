<template>
  <div class="page">
    <m-header title="共燚权益" :canback="Boolean(1)">
      <span class="rule" @click="rule_show = true">规则</span>
    </m-header>
    <section class="body">
      
      <swiper :options="swiperOption" class="swiper-wrap" ref="mySwiper">
        <swiper-slide>
          <div class="item_li">
            <div class="top">
              <p @click="$router.push({name:'Contribution'})">我的贡献值：{{fr_jackpot.my_gx_num}}</p>
              <p>今日分润：{{fr_jackpot.fr_reward}}</p>
            </div>
            <div class="center" @click="$router.push({name:'cDetail',query:{type:'frj'}})">
              <p class="title">共享分润</p>
              <p class="num">{{fr_jackpot.amount}}</p>
              <p class="bot">当前分润总额</p>
            </div>
            <div class="zy">注：分润领取以最新的分润数据为准</div>
            <button @click.stop="get_frj" :class="{'gray':!fr_jackpot.can_get}">领取</button>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="item_li img41">
            <div class="top">
              <p>当前中心节点：{{zx_jackpot.zx_num}}个</p>
              <!-- <p>今日分红：{{zx_jackpot.zx_reward}}</p> -->
            </div>
            <div class="center" @click="$router.push({name:'cDetail',query:{type:'zxj'}})">
              <p class="title">中心分润</p>
              <p class="num">{{zx_jackpot.amount}}</p>
              <p class="bot">当前分润总额</p>
            </div>
            <div class="zy">注：分润领取以最新的分润数据为准</div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="item_li img42">
            <div class="top">
              <p>当前参与总人数：{{gx_jackpot.gx_num}}</p>
              <p>今日分润：{{gx_jackpot.gx_reward}}</p>
            </div>
            <div class="center" @click="$router.push({name:'cDetail',query:{type:'gxj'}})">
              <p class="title">贡献分润</p>
              <p class="num">{{gx_jackpot.gx_amount}}</p>
              <p class="bot">当前分润总额</p>
            </div>
            <div class="zy">注：分润领取以最新的分润数据为准</div>
          </div>
        </swiper-slide>
        <!-- 常见的小圆点 -->
        <div
          class="swiper-pagination"
          v-for="(item,index) in [1,1,1]"
          :key="index"
          slot="pagination"
        ></div>
      </swiper>
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
import { swiper, swiperSlide } from "vue-awesome-swiper";
import {Trade} from '@/server/server.js';
import {Util,Load,Secret} from '@/assets/commonjs/utils.js';
import {mapGetters,mapMutations} from 'vuex';
require("swiper/dist/css/swiper.css"); //引入swiper.css
export default {
  components: {
    swiper,
    swiperSlide,
  },
  data(){
      return {
        img:require('@/assets/images/gzlz/banner.png'),
        img40:require('@/assets/images/lz/40.png'),
        list:[],
        fr_jackpot:{
          amount:null,
          fr_reward:null,
          my_gx_num:null,
          can_get:false,
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
        swiperOption: {
          // loop: true,
          // 分页器设置
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            type: "bullets"
          }
        },
        
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
      if(!this.fr_jackpot.can_get){
        return;
      }
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
  .item_li{
    text-align: center;
    .top{
      margin-top: 50px;
      p{
        font-size:32px;
        color: #fff;
        &:last-child{
          margin-top: 30px;
        }
      }
    }
    .center{
      // background-image: url(../../../assets/images/lz/40.png);
      background-image: url('../../assets/images/lz/40.png');
      background-size: 100% 100%;
      width: 576px;
      height: 576px;
      margin: 52px 86px 40px;
      border-radius: 50%;
      padding-top: 130px;
      .title{
        font-size:36px;
      }
      .num{
        font-size: 100px;
        font-weight: 600;
        margin-top: 60px;
        margin: 60px 0 50px;
      }
      .bot{
        font-size: 30px;
      }
    }
    .zy{
      font-size:24px;
      color:rgba(240,59,59,1);
      margin-bottom: 50px;
    }
    >button{
      width:333px;
      height:88px;
      background:rgba(60,252,172,1);
      border-radius:10px;
      margin-bottom: 140px;
      color: #000;
    }
  }
  .img41{
    .center{
      background-image: url('../../assets/images/lz/41.png') !important;
      background-size: 100% 100%;
    }
  }
  .img42{
    .center{
      background-image: url('../../assets/images/lz/42.png') !important;
      background-size: 100% 100%;
    }
  }
  .gray{
    background-color: #999 !important;
    color: #fff !important;
    
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
<style lang="less" scoped>
.swiper-pagination{
  // background-color: red !important;
  /deep/ .swiper-pagination-bullet{
    background-color:#999999;
    width: 20px;
    height: 20px;
    margin-right: 16px;
  }
  /deep/ .swiper-pagination-bullet-active{
    background-color: #3CFCAC !important;
  }
}
</style>

