<template>
  <div class="page">
    <m-header title="贡献值明细" :canback="Boolean(1)"></m-header>
    <section class="body">
      <ul class="list"  :style="'height:'+(screenHeight-100)+'px;overflow:auto;'" v-lazy-load="lazyLoad">
        <li v-for="v in list" :key="v.id">
          <div>
            <!-- <p>{{String(v.remark).substring(0,4)}}</p> -->
            <p>{{String(v.remark)}}</p>
            <p>{{v.createtime}}</p>
          </div>
          <p>{{v.num>=0?'+':''}}{{v.num}}</p>
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
        page:1,
        screenHeight:null,
        noMore:false,
        
      }
  },
  mounted() {
      this.initData();
      this.gx_num_list();
  },
  computed: {
    ...mapGetters(['uid','api','bannerSrc','coinTxt','proData'])
  },
  methods: {
    initData(){
      this.screenHeight = window.screen.height || window.screen.availHeight;
    },
    lazyLoad(){
        this.page = this.page+1;
        if(!this.noMore){
            this.gx_num_list(); 
        }
    },
    // 明细
    gx_num_list(){
      Trade.gx_num_list({page:this.page,limit:10}).then(res=>{
        if(res.code==1){

          this.list = this.list.concat(res.data||[]);
          if(!res.data||res.data.length<10)
          this.noMore = true;
        }else{
          mui.toast(res.msg)
        }
      })
    },
    formatTime(time){
      return Util.formatTime(time);
    },
  },
  beforeRouteLeave (to, from, next) {
    
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
    margin: 0 30px 30px;
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
        text-align: right;
        flex: 3;
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

