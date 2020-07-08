<template>
  <div class="page">
    <m-header title="商品分类" :canback="Boolean(1)"> </m-header>
    <section class="body">
      <search></search>
      <div class="box">
        <ul class="left">
          <li v-for="(v,i) in list" :key="i" :class="{'se':se==i}"  @click="change(i)">{{v.name}}</li>
        </ul>
        <div class="right">
          <li v-for="(v,i) in list2" :key="i" @click="$router.push({name:'List',query:{id:v.id,name:v.name}})">
            <img :src="v.ImageFrist" alt="">
            <p>{{v.name}}</p>
          </li>
        </div>
      </div>
    </section>
    <!-- <m-Footer></m-Footer> -->
    <m-load ref="load"></m-load>
  </div>
</template>
<script>
import {Trade} from '@/server/server.js';
import {Util,Load,Secret} from '@/assets/commonjs/utils.js';
import {mapGetters,mapMutations} from 'vuex';
import search from '@/components/search.vue';
export default {
  components: {
    search
  },
  data(){
      return {
        img:require('@/assets/images/gzlz/banner.png'),
        se:0,
        list:[],
        list2:[],
      }
  },
  mounted() {
      this.initData();
      this.Showlist();
  },
  computed: {
    ...mapGetters(['uid','api','bannerSrc','coinTxt','proData'])
  },
  methods: {
    initData(){
      
    },
    Showlist(){
      Trade.Showlist().then(res=>{
        if(res.code==1){
          this.list = res.data.categorydata;
          this.list2 = this.list[0].childlist;
        }else{
          mui.toast(res.msg)
        }
      })
    },
    change(i){
      this.se = i;
      this.list2 = this.list[i].childlist;
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
  height: calc(100% - 88px);
  .box{
    height: 100%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    .left{
      background-color: #232323;
      width: 166px;
      height: 100%;
      overflow-y: scroll;
      li{
        height: 112px;
        line-height: 112px;
        padding-left: 30px;
        // font-size:28px;
        font-size:24px;
        color: #fff;
        position: relative;
      }
      .se{
        color: #3CFCAC;
        font-weight: 600;
        background-color: #06041B;
        &::before{
          content: '';
          position: absolute;
          width: 6px;
          height: 112px;
          background-color: #3CFCAC;
          left: 0;
          top: 0;
        }
      }
    }
    .right{
      background-color: #06041B;
      padding-top: 60px;
      flex: 1;
      height: 100%;
      overflow-y: scroll;
      li{
        margin-left: 76px;
        margin-bottom: 50px;
        display: inline-block;
        img{
          width: 94px;
          height: 94px;
          border-radius: 50%;
          margin-bottom: 10px;
          background-color: #fff;
        }
        p{
          font-size:24px;
          color:rgba(243,243,243,1);
          text-align: center;
        }
      }
    }
  }
  
}

</style>

