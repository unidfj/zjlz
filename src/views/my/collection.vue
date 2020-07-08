<template>
  <div class="page">
    <m-header title="商品收藏" :canback="Boolean(1)">
      <span class="rule" @click="Administration = !Administration">{{Administration?'管理':'取消'}}</span>
    </m-header>
    <section class="body">
      <ul class="list" v-show="Administration">
        <li v-for="(v,i) in list" :key="i" @click="$router.push({name:'pDetail',query:{id:v.goods_id}})">
          <img :src="v.images" alt="">
          <div>
            <p class="title">{{v.goods_name}}</p>
            <p>{{v.sku_name||'默认规格'}}</p>
            <!-- <p>运费：免运费</p> -->
            <p class="price">¥{{v.goods_price}}/{{v.line_price}} CBD</p>
          </div>
        </li>
      </ul>
      
      <ul class="list2" v-show="!Administration">
        <li v-for="(v,i) in list" :key="i" @click="changeArr(v.goods_id)">
          <i :class="{'iconfont':true,'iconyk_yuanquan_fill':arr.indexOf(v.goods_id)==-1,'icon2xuanzhong se':arr.indexOf(v.goods_id)!=-1}"></i>
          <div>
            <img :src="v.images" alt="">
            <div>
              <p class="title">{{v.goods_name}}</p>
              <p>{{v.sku_name||'默认规格'}}</p>
              <!-- <p>运费：免运费</p> -->
              <p class="price">¥{{v.goods_price}}/{{v.line_price}} CBD</p>
            </div>
          </div>
        </li>
        <div class="bot">
          <button @click="collectionBonus">取消收藏</button>
        </div>
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
        Administration:true,
        arr:[],
      }
  },
  mounted() {
      this.initData();
      this.collection();
  },
  computed: {
    ...mapGetters(['uid','api','bannerSrc','coinTxt','proData'])
  },
  methods: {
    initData(){

    },
    changeArr(v){
      let i = this.arr.indexOf(v);
      if(i==-1){
        this.arr.push(v)
      }else{
        this.arr.splice(i,1)
      }
    },
    // 取消收藏
    collectionBonus(){
      if(!this.arr){
        this.Administration = true;
        return;
      }
      // Array(...this.arr).forEach((v,i)=>{
      this.arr.forEach((v,i)=>{
        Trade.collectionBonus({goodsid:v,type:2}).then(res=>{
          if(res.code==1){
            if(i==this.arr.length-1) this.collection();
            this.Administration = true;
          }
        })
      })
      
    },
    // 收藏列表
    collection(){
      Trade.collection().then(res=>{
        if(res.code==1){
          this.list = res.data;
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
      >img{
        width: 200px;
        height: 200px;
      }
      >div{
        flex: 1;
        margin-left: 25px;
        P{
          text-align: left;
          font-size:24px;
          font-weight:400;
          color:rgba(154,154,154,1);
          margin-top: 10px;
        }
        .title{
          font-size: 26px;
          color: #fff;
          // margin-top: 0;
        }
        .price{
          font-size:40px;
          font-weight:500;
          color:rgba(60,252,172,1);
          margin-top: 24px;
        }
      }
    }
  }
  
  .list2{
    margin: 30px;
    li{
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      >i{
        color: #fff;
        line-height: 260px;
        font-size: 40px;
        margin: 0 30px 0 10px;
      }
      .se{
        color: #3CFCAC;
      }
      >div{
        flex: 1;
        border:2px dashed rgba(60,252,172,1);
        display: flex;
        justify-content: space-between;
        border-radius: 10px;
        padding: 30px 30px 30px 40px;
        >img{
          width: 200px;
          height: 200px;
        }
        >div{
          flex: 1;
          margin-left: 25px;
          P{
            text-align: left;
            font-size:24px;
            font-weight:400;
            color:rgba(154,154,154,1);
            margin-top: 10px;
          }
          .title{
            font-size: 26px;
            color: #fff;
            // margin-top: 0;
          }
          .price{
            font-size:40px;
            font-weight:500;
            color:rgba(60,252,172,1);
            margin-top: 24px;
          }
        }
      }
    }
    .bot{
      width: 100%;
      display: flex;
      justify-content: space-between;
      button{
        flex: 1;
        height: 88px;
        background-color: #3CFCAC;
        color: #333;
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

