<template>
  <div class="page">
    <m-header :title="name" :canback="Boolean(1)"></m-header>
    <section class="body">
      <ul class="list" :style="'height:'+(screenHeight-100)+'px;overflow:auto;'" v-lazy-load="lazyLoad">
          <li v-for="(v,i) in listdata" :key="i" @click="$router.push({name:'pDetail',query:{id:v.id}})">
            <img :src="v.image" alt="">
            <p class="content">{{v.goods_name}}</p>
            <p class="price">￥{{v.goods_min_price}}</p>
          </li>
      </ul>
    </section>
    <!-- <m-Footer></m-Footer> -->
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
        page:1,
        id:null,
        name:null,
        types:null,
        listdata:[],
        page:1,
        screenHeight:null,
        noMore:false,
      }
  },
  mounted() {
      this.initData();
      this.category_list();
      
  },
  computed: {
    ...mapGetters(['uid','api','bannerSrc','coinTxt','proData'])
  },
  methods: {
    initData(){
      this.id = this.$route.query.id;
      this.name = this.$route.query.name;
      this.screenHeight = window.screen.height || window.screen.availHeight;
    },
    
    lazyLoad(){
        this.page = this.page+1;
        if(!this.noMore){
            this.category_list(); 
        }
    },

    // 商品列表
    category_list(){
      Trade.category_list({id:this.id,name:this.name,page:this.page,types:'normal'}).then(res=>{
        if(res.code==1){
          // this.listdata = res.data.listdata;

          this.listdata = this.listdata.concat(res.data.listdata||[]);
          if(!res.data||res.data.listdata.length<10)
          this.noMore = true;
        }else{
          mui.toast(res.msg)
        }
      })
    },
    ...mapMutations(['saveBanner','saveCoinTxt']),
    
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
      width: 100%;
      margin: 30px 30px;
      li{
        margin-bottom: 30px;
        border-radius: 10px;
        width: 330px;
        height: 503px;
        padding-bottom: 16px;
        background-color: #232323;
        display: inline-block;
        &:nth-child(2n){
          margin-left: 35px;
        }
        img{
          width: 100%;
          // max-height: 336px;
          display: block;
          height: 336px;
          background-color: #eee;
          margin-bottom: 16px;;
        }
        p{
          font-size:30px;
          color:rgba(255,255,255,1);
          line-height:42px;
          height: 84px;
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
    }
  
}
.page{
  .cart{
    color: #3CFCAC;
    font-size: 48px !important;
    // color: red;
  }
}
</style>

