<template>
  <div class="page">
    <m-header title="领地共燚" :icon="'iconfont iconqkk_icon_sy'"></m-header>
    <section class="body">
      <!-- <scroller 
            ref="my_scroller"
            :on-refresh="refresh"
            :on-infinite="infinite">
        </scroller> -->
      <swiper :options="swiperOption" class="swiper-wrap" ref="mySwiper" v-if="banner.length!=0">
        <swiper-slide v-for="(item, index) in banner" :key="index">
          <!-- <img :src="api+item" class="title-img" /> -->
          <img :src="item.image" class="title-img" />
        </swiper-slide>
        <!-- 常见的小圆点 -->
        <!-- <div
          class="swiper-pagination"
          v-for="(item,index) in banner"
          :key="index"
          slot="pagination"
        ></div> -->
      </swiper>
      
      <div class="notice" @click="notice()"> 
        <div class="notice-inner">
          <!-- <i class="iconfont icongonggao mark"></i><span style="margin:0 5px;">公告:</span> -->
            <i class="iconfont icongonggao mark"></i><span style="margin:0 5px;"></span>
            <ul v-if="noticeList && noticeList.length>0" class="notice-list">
                <li class="notice-item" v-for="(item,index) in noticeList" :key="index" >{{item.title}}</li>
            </ul>
            <span v-else>暂无</span>
        </div>
        <p class="notice_all">更多</p>
      </div>

      <ul class="nav">
        <li v-for="(v,i) in categoryList" :key="i" @click="$router.push({name:'List',query:{id:v.id,name:v.name}})">
          <img :src="v.image" alt="">
          <p>{{v.name}}</p>
        </li>
        <li  @click="$router.push({name:'Type'})">
          <img :src="defaultBanner" alt="">
          <p>全部分类</p>
        </li>
      </ul>
      <search></search>
      <div class="list_box">
        <p>推荐</p>
        <ul class="list">
          <li v-for="(v,i) in NewList" :key="i" @click="$router.push({name:'pDetail',query:{id:v.goods_id}})">
            <img :src="v.ImageFrist||empty" alt="">
            <p class="content">{{v.goods_name}}</p>
            <p class="price">￥{{v.spec[0].goods_price}}</p>
          </li>
        </ul>
      </div>
    </section>
    <div class="ale" v-show="show">
      <div class="box" @click="show = false">
        <p>分润累计</p>
        <p>{{data.user_total}}人</p>
        <p>奖金池累计</p>
        <p>{{data.amount_total}}</p>
        <!-- <img :src="img38" alt=""> -->
        <div class="bot">
          <div>
            <p>共享分润</p>
            <p>{{data.fr_jackpot.amount}}</p>
          </div>
          <div>
            <p>中心分润</p>
            <p>{{data.zx_jackpot.amount}}</p>
          </div>
          <div>
            <p>贡献分润</p>
            <p>{{data.gx_jackpot.gx_amount}}</p>
          </div>
        </div>
        <i class="iconfont iconclose cha"></i>
      </div>
    </div>
    <m-Footer></m-Footer>
    <m-load ref="load"></m-load>

  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import {Init,Index,Trade} from '@/server/server.js';
import {Util,Load,Secret} from '@/assets/commonjs/utils.js';
import {mapGetters,mapMutations} from 'vuex';
import search from '@/components/search.vue';
const CryptoJS = require("crypto-js");
require("swiper/dist/css/swiper.css"); //引入swiper.css
import html2canvas from 'html2canvas';
export default {
  components: {
    swiper,
    swiperSlide,
    search
  },
  data(){
      return {
        list:null,
        levelArr:[],
        timeInt:null,
        mineInt:null,
        mineFlag:true,
        bookFlag:true,
        orderFlag:true,
        msg:null,
        noticeList:[],
        //  move:0,
        //  moveTime:3,
        //  moveInter:null,
        defaultBanner:require('@/assets/images/lz/39.png'),
        empty:require('@/assets/images/empty.png'),
        img38:require('@/assets/images/lz/38.png'),
        img43:require('@/assets/images/lz/43.png'),
        img44:require('@/assets/images/lz/44.png'),
        img45:require('@/assets/images/lz/45.png'),
        img46:require('@/assets/images/lz/46.png'),
        swiperOption: {
          loop: true,
            autoplay: {
              delay: 2500,
              stopOnLastSlide: false,
              /* 触摸滑动后是否继续轮播 */
              disableOnInteraction: false
            },
            // 分页器设置
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
              type: "bullets"
            }
        },
        banner: [],
        categoryList:[],
        NewList:[],
        show:false,
        data:{
          fr_jackpot:{
            amount:null,
          },
          zx_jackpot:{
            amount:null,
          },
          gx_jackpot:{
            gx_amount:null,
          },
          amount:null,
          fr_user_count:null,
        }
      }
  },
  mounted() {
      this.initData();
      this.getTitle();
      this.getCategory();
      // this.best();
      this.getIndex();
      this.get_jackpot();
  },
  computed: {
    ...mapGetters(['uid','api','bannerSrc','coinTxt','proData'])
  },
  methods: {
    initData(){
      // this.banner = this.proData&&this.proData.home_top_banner ||[require('@/assets/images/gzlz/banner.png')]
    },
    ...mapMutations(['saveBanner','saveCoinTxt']),
    // errorImg(i){
    //   let img = document.querySelectorAll('.list_box ul li img')[i];
    //   console.log('img',img)
    //   // img.src = this.api + this.empty;
    //   img.src = 'http://fa_zjlz.hqshop.com:8102/uploads/20190313/d2baa888c5b5709d5d3ca579aa2f2e9a.jpg'
    // },
    // 商品
    best(){
      Trade.best().then(res=>{
        if(res.code==1){
          this.NewList = res.msg;
        }else{
          mui.toast(res.msg)
        }
      })
    },
    // 分类
    getCategory(){
      Trade.getCategory().then(res=>{
        if(res.code==1){
          this.categoryList = res.data.data.slice(0,3);
        }else{
          mui.toast(res.msg)
        }
      })
    },
    /**
     * 下拉刷新
     */
    refresh(){
        // this.getMine();
        setTimeout(() => {
            this.$refs.my_scroller.finishPullToRefresh();
            mui.toast('加载完毕！')
        }, 1000);
    },
    infinite(){},
    goTo(routeName) {
      this.$router.push({name:routeName});
    },
    /**
     * 获取公告
     */
    getTitle(){
        Index.getTitle({type:'mh'}).then(res=>{
            if(res.code == 1){
                this.noticeList = res.data;
            }else {
              mui.toast(res.msg);
            }
        })
    },
    /**
     * 公告入口
     */
    notice(){
        this.$router.push({name:'Notice',query:{type:'mh'}});
    },
    /**
     * 获取单张banner
     */
    getBanner(){
      Index.getBanner().then(res=>{
          if(res.code == 1){
            if(res.data && res.data.banner_img && res.data.banner_img!='')
            this.saveBanner(res.data.banner_img)
          }
      })
    },
    getIndex(){
      Trade.index().then(res=>{
        if(res.code==1){
            // if(res.data && res.data.bannerlist && res.data.bannerlist!='')
            // this.saveBanner(res.data.bannerlist)
            // this.show = res.data.show_ad;
            this.show = true;
            this.banner = res.data.bannerlist;
            this.NewList = res.data.NewList;
        }else{
          mui.toast(res.msg)
        }
      })
    },
    // 人数数据
    get_jackpot(){
      Trade.get_jackpot().then(res=>{
        if(res.code==1){
          // this.amount = res.data.amount_total
          // this.fr_user_count = res.data.user_total
          this.data = res.data;
        }else{
          mui.toast(res.msg)
        }
      })
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
  position: relative;
  @keyframes lunbo {
    from {
      right: -75%;
    }
    to {
      right: 75%;
    }
  }
  .swiper-wrap .title-img {
      height: 300px;width: 100%;
  }
  
  .notice {
        position: relative;
        height: 40PX;
        line-height: 40PX;
        font-size: 24px;
        overflow: hidden;
        padding-left:5%;
        background-color: #232323;
        margin-top: -7px;
        .notice_all{
          position: absolute;
          right: 0px;
          font-size:24px;
          color:#3CFCAC;
          background-color: #232323;
          // background-color: red;
          height: 100%;
          padding: 0 32px;
          z-index: 10;
          display: block;
        }
        i,span {
            vertical-align: top;
            font-size: 12PX;
            color: #3CFCAC;
        }
        .notice-inner {
            position: absolute;
            right: -75%;
            top: 0;
            background: #232323;
            width: 75%;
            animation-name:lunbo;
            animation-duration:12s;
            animation-iteration-count:infinite;
            z-index: 2;
        }
        .notice-list {
            width: 70%;
            display: inline-block;vertical-align: top;
        }
        .notice-item {
            // color: @bg-color;
            // color: white;
            background: #232323;
            font-size: 24px;
            text-overflow: ellipsis;overflow: hidden;white-space: nowrap;
            color: #fff;
        }
    }
  .banner {
    width: 100%;height: 300px;
  }
  .nav{
    width: 690px;
    padding: 37px 0 28px;
    margin: 30px 30px 32px;
    background-color: #232323;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    li{
      flex: 1;
      text-align: center;
      img{
        width: 80px;
        height: 80px;
        display: inline-block;
        background-color: #eee;
        border-radius: 50%;
      }
      p{
        color: #fff;
        font-size:24px;
        margin-top: 12px;
      }
    }
  }
  .list_box{
    width: 690px;
    margin: 30px;
    >p{
      font-size:36px;
      font-weight:600;
      color:rgba(60,252,172,1);
      margin-bottom: 28px;
    }
    .list{
      li{
        margin-bottom: 30px;
        border-radius: 10px;
        width: 330px;
        height: 503px;
        padding-bottom: 16px;
        background-color: #232323;
        display: inline-block;
        &:nth-child(n+1){
          margin-left: 14px;
        }
        img{
          width: 100%;
          display: block;
          // max-height: 336px;
          height: 336px;
          background-color: #eee;
          margin-bottom: 16px;;
        }
        p{
          font-size:30px;
          color:rgba(255,255,255,1);
          line-height:42px;
          padding: 0 16px;
          overflow:hidden; 
          text-overflow:ellipsis;
          display:-webkit-box; 
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2; 
          
          &:last-child{
            font-size:36px;
            font-weight:500;
            color:rgba(255,62,62,1);
            line-height:50px;
            margin-top: 6px;
          }
        }
      }
      .content{
        height: 88px;
      }
    }
  }
}
.ale{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .8);
  z-index: 99;
  .box{
    width:638px;
    height: 930px;
    border-radius:4px;
    // border:2px dashed rgba(60,252,172,1);
    position: relative;
    margin: 201px 56px 0;
    text-align: center;
    background-image: url(../../assets/images/lz/43.png);
    background-size: 100% 100%;
    padding-top: 430px;
    >i{
      font-size: 34px;
      color: #fff;
      position: absolute;
      top: 35px;
      right: 35px;
    }
    p{
      font-size:28px;
      color:#fff;
      &:nth-child(2),&:nth-child(4){
        font-size:40px;
        margin-top: 10px;
        // font-weight: 550;
      }
      &:first-child{
        margin-top: 60px;
      }
      &:nth-child(3){
        margin-top: 20px;
      }

    }
    img{
      width: 80%;
      margin-top: 50px;
      margin-bottom: 48px;
    }
    .bot{
      display: flex;
      justify-content: space-between;
      padding: 20px 20px 0;
      >div{
        padding-top: 90px;
        flex: 1;
        height: 180px;
        p{
          font-size: 24px;
          margin-top: 0px;

        }
        &:nth-child(1){
          background-image: url(../../assets/images/lz/44.png);
          background-size: 100% 100%;
        }
        &:nth-child(2){
          background-image: url(../../assets/images/lz/45.png);
          background-size: 100% 100%;
          margin: 0 30px;
        }
        &:nth-child(3){
          background-image: url(../../assets/images/lz/46.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
<style lang="less">
._v-container {
  height: 300px!important;
  margin-top: -40PX!important;
    z-index: 1;
}
._v-container>._v-content>.loading-layer .spinner-holder .spinner, ._v-container>._v-content>.pull-to-refresh-layer .spinner-holder .spinner{
    margin-top: 0!important;
    fill: white!important;
    stroke: white!important;
    z-index: 1;
}
</style>
