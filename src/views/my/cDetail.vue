<template>
  <div class="page">
    <m-header :title="getTitle()" :canback="Boolean(1)"></m-header>
    <section class="body">
      <ul class="list" :style="'height:'+(screenHeight-100)+'px;overflow:auto;'" v-lazy-load="lazyLoad">
        <li v-for="v in list" :key="v.id">
          <div>
            <p>{{String(v.source).substring(0,3)}}</p>
            <p>{{v.granttime}}</p>
          </div>
          <p>{{v.money>=0?'+':'-'}}{{v.money}}</p>
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
        list:[],
        bkey:null,
        page:1,
        screenHeight:null,
        noMore:false,
      }
  },
  mounted() {
      this.initData();
      this.jackpot_list();
  },
  computed: {
    ...mapGetters(['uid','api','bannerSrc','coinTxt','proData'])
  },
  methods: {
    initData(){
      this.screenHeight = window.screen.height || window.screen.availHeight;
      this.bkey = this.$route.query.type;
    },
    
    lazyLoad(){
        this.page = this.page+1;
        if(!this.noMore){
            this.jackpot_list(); 
        }
    },
    // 共燚池列表
    jackpot_list(){
      Trade.jackpot_list({bkey:this.bkey,page:this.page}).then(res=>{
        if(res.code==1){
          // this.list = res.data;
          
          this.list = this.list.concat(res.data||[]);
          if(!res.data||res.data.length<10)
          this.noMore = true;
          // this.fr_jackpot = res.data.fr_jackpot;
          // this.gx_jackpot = res.data.gx_jackpot;
          // this.zx_jackpot = res.data.zx_jackpot;
        }else{
          mui.toast(res.msg)
        }
      })
    },
    change(i){
      this.zf_se = i
    },
    getTitle(){
      switch(this.bkey){
        case 'zxj':
          return '中心奖池明细';
        case 'gxj':
          return '贡献奖池明细';
        case 'frj':
          return '分红明细';
      }
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
      padding: 25px 30px;
      border-radius: 10px;
      border:2px dashed rgba(60,252,172,1);
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      >div{
        flex: 10;
        p{
          font-size:30px;
          color:rgba(153,153,153,1);
          &:first-child{
            font-size:36px;
            font-weight:500;
            color:rgba(60,252,172,1);
            margin-bottom: 16px;
            margin-top: 8px;
          }
        }
      }
      >p{
        flex: 4;
        text-align: right;
        font-size:36px;
        font-weight:500;
        color:rgba(60,252,172,1);
        margin-top: 25px;
      }
    }
  }
}
.page{
  .rule{
    color: #3CFCAC;
  }
}
</style>

