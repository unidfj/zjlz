<template>
  <div class="page">
    <m-header title="购物车" :canback="Boolean(1)">
      <span class="rule" @click="Administration = !Administration">{{Administration?'管理':'取消'}}</span>
    </m-header>
    <section class="body">
      <ul class="list" v-show="Administration">
          <li v-for="(v,i) in list" :key="i">
            <img :src="v.image" alt="">
            <div>
              <p>{{v.goods_name}}</p>
              <p>{{v.goods_sku.goods_attr||'默认规格'}}</p>
              <p>￥{{v.goods_price}}</p>
            </div>
            
            <p class="bot">
              <i class="iconfont iconjianhao" @click="sub(v.goods_id,v.goods_sku_id,i,v.goods_price)"></i>
              <span>{{v.total_num}}</span>
              <i class="iconfont iconjiahao" @click="add(v.goods_id,v.goods_sku_id,i,v.goods_price)"></i>
            </p>
          </li>
      </ul>
      
      <ul class="list2" v-show="!Administration">
        <li v-for="(v,i) in list" :key="i" @click="changeArr(v.goods_id,v.goods_sku_id)">
          <i :class="{'iconfont':true,'iconyk_yuanquan_fill':arr.indexOf(v.goods_id)==-1,'icon2xuanzhong se':arr.indexOf(v.goods_id)!=-1}"></i>
          <div>
            <img :src="v.image" alt="">
            <div>
              <p>{{v.goods_name}}</p>
              <p>{{v.goods_sku.goods_attr||'默认规格'}}</p>
              <p>￥{{v.goods_price}}</p>
            </div>
            
            <p class="bot">
              <i class="iconfont iconjianhao" @click="sub(v.goods_id,v.goods_sku_id,i,v.goods_price)"></i>
              <span>{{v.total_num}}</span>
              <i class="iconfont iconjiahao" @click="add(v.goods_id,v.goods_sku_id,i,v.goods_price)"></i>
            </p>
          </div>
        </li>
        <div class="bot">
          <button @click="deleteCart">取消收藏</button>
        </div>
      </ul>

      <div class="bot">
        <p>
          合计：
          {{order_pay_price||0}}
        </p>
        <button @click="$router.push({name:'pOrder',query:{type:'cart'}})">开始结算</button>
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
export default {
  data(){
      return {
        img:require('@/assets/images/gzlz/banner.png'),
        page:1,
        id:null,
        list:[],
        order_pay_price:null,
        bl:true,
        Administration:true,
        arr:[],
        arr2:[],
      }
  },
  mounted() {
      this.initData();
      this.getlists();
      
  },
  computed: {
    ...mapGetters(['uid','api','bannerSrc','coinTxt','proData'])
  },
  methods: {
    initData(){
      
    },
    // 选中与取消
    changeArr(v,goods_sku_id){
      let i = this.arr.indexOf(v);
      if(i==-1){
        this.arr.push(v)
        this.arr2.push(goods_sku_id)
      }else{
        this.arr.splice(i,1)
        this.arr2.splice(i,1)
      }
    },
    // 删除购物车
    deleteCart(){
      if(!this.arr){
        this.Administration = true;
        return;
      }
      // Array(...this.arr).forEach((v,i)=>{
      this.arr.forEach((v,i)=>{
        Trade.deleteCart({goods_id:v,goods_sku_id:this.arr2[i]}).then(res=>{
          mui.toast(res.msg)
          if(res.code==1){
            if(i==this.arr.length-1) this.getlists();
            this.Administration = true;
          }
        })
      })
      
    },
    // 加入购物车
    add(goods_id,goods_sku_id,i,v){
      console.log('11111',this.bl)
      if(!this.bl) return;
      this.bl = false;
      Trade.add({goods_num:1,goods_id,goods_sku_id}).then(res=>{
        this.bl = true;
        if(res.code==1){
          this.list[i].total_num++;
          this.order_pay_price = Number(+this.order_pay_price + +v).toFixed(2);
        }
      })
    },
    // 购物车数量-1
    sub(goods_id,goods_sku_id,i,v){
      if(!this.bl||this.list[i].total_num<2) return;
      this.bl = false;
      // this.goods_num<2?'':this.goods_num--
      Trade.sub({goods_id,goods_sku_id}).then(res=>{
        this.bl = true;
        if(res.code==1){
          this.list[i].total_num--;
          this.order_pay_price = Number(+this.order_pay_price - +v).toFixed(2);
        }else{
          mui.toast(res.msg)
        }
      })
    },
    
    // 购物车列表
    getlists(){
      Trade.getlists().then(res=>{
        if(res.code==1){
          this.list = res.data.goods_list;
          this.order_pay_price = res.data.order_total_price;
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
      width: 690px;
      margin: 30px 30px;
      li{
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        position: relative;
        background-color: #232323;
        // padding-right: 30px;
        padding: 20px 30px;
        img{
          width: 140px;
          height: 140px;
          margin-right: 30px;
        }
        >div{
          flex: 1;
          p{
            font-size: 24px;
            &:nth-child(2){
              font-size: 20px;
              color: #ddd;
            }
            &:nth-child(3){
              color: red;
            }
          }
        }
        .bot{
          position: absolute;
          right: 30px;
          bottom: 20px;
          i{
            font-size: 28px;
          }
          span{
            display: inline-block;
            border: 1px solid rgb(120, 197, 228);
            padding: 2px 18px;
            border-radius: 8px;
          }
        }
      }
    }
    .list2{
      width: 690px;
      margin: 30px 30px;
      li{
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        height: 180px;
        >i{
          color: #fff;
          line-height: 180px;
          font-size: 40px;
          margin: 0 30px 0 10px;
        }
        .se{
          color: #3CFCAC;
        }
        >div{
          flex: 1;
          height: 180px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          position: relative;
          background-color: #232323;
          // padding-right: 30px;
          padding: 20px 30px;
          border-radius: 10px;
          img{
            width: 140px;
            height: 140px;
            margin-right: 30px;
          }
          >div{
            flex: 1;
            p{
              font-size: 24px;
              &:nth-child(2){
                font-size: 20px;
                color: #ddd;
              }
              &:nth-child(3){
                color: red;
              }
            }
          }
          .bot{
            position: absolute;
            right: 30px;
            bottom: 20px;
            i{
              font-size: 28px;
            }
            span{
              display: inline-block;
              border: 1px solid rgb(120, 197, 228);
              padding: 2px 18px;
              border-radius: 8px;
            }
          }
        }
      }
      >.bot{
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
    >.bot{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 120px;
      line-height: 120px;
      background-color: #232323;
      button{
        padding:  0 40px;
        background-color: red;
        border-radius: 0;
        font-size: 32px;
      }
      >p{
        flex: 1;
        text-align: right;
        margin-right: 30px;
        font-size: 32px;
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

