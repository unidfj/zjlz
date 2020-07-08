<template>
  <div class="page">
    <m-header title="确认订单" :canback="Boolean(1)"></m-header>
    <section class="body">
      <!-- 收货地址 -->
      <div class="top" v-if="!address">
        <p  @click="$router.push({name:'Address'})">
          <i class="iconfont icongou1 mark"></i>
          <span>暂无收货地址，点击添加</span>
        </p>
      </div>
      <div class="top" v-else>
        <p>
          <span>联系人：{{address?address.name:''}}</span>
        </p>
        <p>
          <span>联系电话：{{address?address.phone:''}}</span>
        </p>
        <!-- <p>
          <span>身份证：{{address?address.creditid:''}}</span>
        </p> -->
        <p>
          <span>收货地址：{{address?Object.values(address&&address.Area).join('')+address.detail:''}}</span>
          <!-- <span>收货地址：{{address?address.Area.province+address.Area.city+address.Area.region+address.detail:''}}</span> -->
        </p>
        <p  @click="$router.push({name:'Address'})">
          <i class="iconfont icongou1 mark"></i>
          <span>更换收货地址</span>
        </p>
      </div>

      <!-- 订单内容 -->
      <div class="content" v-if="type!='cart'">
        <div class="title">
          <i class="iconfont iconqkk_icon_sy"></i>
          <!-- <p>纪梵希旗舰店</p> -->
          <p> </p>
        </div>
        <div class="bot">
          <ul>
            <li v-for="(v,i) in data.goods_list" :key="i">
              <img :src="v.image" alt="">
              <div>
                <p class="top">{{v.goods_name}}</p>
                <p class="type">{{v.goods_sku.goods_attr||'默认规格'}}</p>
                <p class="type">运费：{{data.express_price==0 ? '免邮费' : '＋ ￥' + data.express_price}}</p>
                <div>
                  <span>购买数量：</span>
                  <span class="left"  @click="goods_num<2?'':(goods_num--,buyNow())"> － </span>
                  <input type="number" v-model="goods_num" @input="buyNow()">
                  <span class="right" @click="goods_num++;buyNow()">+</span>
                </div>
                <!-- <span class="bot">共{{v.total_num}}件 合计：<span>¥{{data.order_pay_price}} CBD</span></p> -->
                <p class="bot">共{{v.total_num}}件 合计：<span>¥{{data.order_pay_price}} CBD</span></p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      
      <!-- 订单内容-cart -->
      <div class="content" v-else>
        <div class="title">
          <i class="iconfont iconqkk_icon_sy"></i>
          <p>纪梵希旗舰店</p>
        </div>
        <div class="bot">
          <ul>
            <li v-for="(v,i) in data.goods_list" :key="i">
              <img :src="v.image" alt="">
              <div>
                <p class="top">{{v.goods_name}}</p>
                <p class="type">{{v.goods_sku.goods_attr||'默认规格'}}</p>
                <p class="type">运费：{{data.express_price==0 ? '免邮费' : '＋ ￥' + data.express_price}}</p>
              </div>
            </li>
          </ul>
        </div>
        <p>商品数总计：{{data.order_total_num}}</p>
        <p>商品价格总计：{{data.order_pay_price}}</p>
        <p>快递费用总计：{{data.express_price==0?'免邮费':data.express_price}}</p>
      </div>

      <div class="bot">
        <p class="title">支付方式</p>
        <ul>
          <li v-for="(v,i) in zf_list" :key="i" @click="change(i)">
            <i :class="v.icon"></i>
            <p>{{v.name}}</p>
            <div>
              <!-- <i class="iconfont icongou1 right" v-show="zf_se==i"></i> -->
              <i :class="{'iconfont right':true,'icongou1':zf_se==i,'iconyk_yuanquan_fill b_w':zf_se!=i}"></i>
            </div>
          </li>
        </ul>
      </div>

      <div class="btn_box">
        <button>取消订单</button>
        <button @click="confirm">立即支付<span>¥{{data.order_pay_price}}</span></button>
      </div>
    </section>

    <m-pwd ref="pwd" @pay="pay"></m-pwd>
    <m-load ref="load"></m-load>
  </div>
</template>
<script>
import {Trade} from '@/server/server.js';
import {Util,Load,Secret,AppPay} from '@/assets/commonjs/utils.js';
import {mapGetters,mapMutations} from 'vuex';
import mPwd from '@/components/pwd-alert.vue';
export default {
  components:{
      mPwd
  },
  data(){
      return {
        img:require('@/assets/images/gzlz/banner.png'),
        zf_list:[
          {
            name:'支付宝支付',
            icon:'iconzhifubao iconfont left',
          },
          {
            name:'微信支付',
            icon:'iconweixin iconfont left',
          },
          {
            name:'CBD余额支付',
            icon:'iconqianggou iconfont left',
          },
        ],
        zf_se:0,
        goods_num:null,
        goods_id:null,
        type:null,
        data:{
          goods_list:[],
          order_total_num:null,
          order_pay_price:null,
          express_price:null,
        },
        address:{
          name:null,
          phone:null,
          Area:{
            city:'',
            province:'',
            region:'',
          }
        },
        order_no:null,
      }
  },
  created(){
    try{
      if(plus){
        AppPay.init();
        console.log('has plus')
      }
    }catch(e){
      console.log('no plus')
    }
  },
  mounted() {
      this.initData();
  },
  computed: {
    ...mapGetters(['uid','api','bannerSrc','coinTxt','proData'])
  },
  methods: {
    initData(){
      this.goods_num = this.$route.query.goods_num;
      this.type = this.$route.query.type;
      this.goods_id = this.$route.query.goods_id;
      this.goods_sku_id = this.$route.query.goods_sku_id;
      if(this.type == 'cart'){
        this.getlists()
      }else{
        this.buyNow();
      }
    },
    // 现金支付回调测试
    notifyx(pay_type,out_trade_no){
      Trade.notifyx({out_trade_no,pay_type}).then(res=>{
        mui.toast(res.msg)
        if(res.code==1){
          this.goOrder();
        }else{
        }
      })
    },
    // 微信/支付宝支付
    experience(pay_type){
      // Trade.experience({order_no:this.order_no,order_type:10,pay_type,is_test:1}).then(res=>{
      Trade.experience({order_no:this.order_no,order_type:10,pay_type}).then(res=>{
        if(res.code==1){
          // this.notifyx(pay_type,res.data)
          this.order_no = res.data;
          // this.appPay('alipay')
        }else{
          mui.toast(res.msg)
        }
      })
    },
    // 确认支付
    confirm(){
      if(this.type == 'cart'){
        this.cart_pay()
      }else{
        this.buyNow_pay();
      }
    },
    
    /**
     * app支付
     */
    appPay(id){
      let that = this;
      try{
        if(plus) AppPay.pay(id,that.order_no,10,()=> {
          this.goOrder();
        })
      }catch(e){}
    },
    // 生成订单
    buyNow_pay(){
      let params = {
        goods_sku_id:this.goods_sku_id,
        goods_num:this.goods_num,
        goods_id:this.goods_id,
        type:'gzh'
      }
      
      Trade.buyNow_pay(params).then(res=>{
        if(res.code==1){
          this.order_no = res.data.order_no;
          if(this.zf_se==0){
            this.appPay('alipay')
            // this.experience('alipay')
          }else if(this.zf_se==1){
            this.appPay('wechat');
            // this.experience('wechat')
          }else{
            this.$refs['pwd'].open()
          }
        }else{
          mui.toast(res.msg)
        }
      })
    },
    // 购物车商品
    cart_pay(){
      Trade.cart_pay({type:null}).then(res=>{
        if(res.code==1){
          this.order_no = res.data.order_no;
          if(this.zf_se==0){
            this.appPay('alipay')
          }else if(this.zf_se==1){
            this.appPay('wechat');
          }else{
            this.$refs['pwd'].open()
          }
        }else{
          mui.toast(res.msg)
        }
      })
    },
    pay(paypwd){
      if(this.zf_se == 2){
        this.cbdpay(paypwd)
      }
    },
    // 余额支付
    cbdpay(paypwd){
      Trade.cbdpay({paypwd,order_no:this.order_no}).then(res=>{
        mui.toast(res.msg)
        if(res.code==1){
          this.goOrder();
        }
      })
    },
    // 购物车列表
    getlists(){
      Trade.getlists().then(res=>{
        if(res.code==1){
          this.data = res.data;
          this.address = res.data.address;
        }else{
          mui.toast(res.msg)
        }
      })
    },
    // 详细信息
    buyNow(){
      if(this.goods_num<1){
        this.data.order_pay_price = 0
        if(this.goods_num<0) this.goods_num = 0;
        return
      }
      Trade.buyNow({goods_num:this.goods_num||0,goods_id:this.goods_id,goods_sku_id:this.goods_sku_id}).then(res=>{
        if(res.code==1){
          this.data = res.data;
          this.address = res.data.address;
        }else{
          mui.toast(res.msg)
        }
      })
    },
    goOrder(){  
        let that = this;
        this.orderUrl = this.api+'/addons/litestore#/my/myorder?showType=2&cookie='+localStorage.getItem('cookie');
        try {
            if(plus){
                var nwating = plus.nativeUI.showWaiting(); //显示原生等待框
                var webview_sub = plus.webview.open(that.orderUrl); //后台创建webview并打开页面
                webview_sub.addEventListener('loaded', function() {
                    nwating.close(); //关闭等待框
                }, false); 
            }
        }catch(e){
            location.href = this.orderUrl;
        }
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
  >.top{
    background-color: #232323;
    margin-bottom: 26px;
    border-top: 1px solid #000;
    box-sizing: border-box;
    p{
      font-size:28px;
      color:rgba(60,252,172,1);
      height: 90px;
      line-height: 90px;
      border-bottom: 1px solid #333;
      padding: 0 30px;
      &:last-child{
        border-bottom: none;
      }
      i{
        font-size: 30px;
        margin-right: 20px;
      }
    }
  }
  >.content{
    width: 730px;
    margin-left: 20px;
    background-color: #232323;
    border-radius: 10px 0 0 0;
    padding: 0 30px 0 10px;
    >.title{
      font-size:24px;
      font-weight:500;
      color:#3CFCAC;
      height: 64px;
      line-height: 64px;
      border-bottom: 1px solid #492D98;
      padding: 0 30px 0 12px;
      display: flex;
      justify-content: space-between;
      >i{
        font-size: 20px;
        margin: 0 12px;
      }
      p{
        flex: 1;
        // color: #3CFCAC;
        color: #fff;
      }
    }
    >div{
      ul{
        li{
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          >img{
            width: 200px;
            height: 200px;
            margin: 20px 30px;
          }
          >div{
            flex: 1;
            .top{
              font-size:34px;
              font-weight:500;
              color:rgba(255,255,255,1);
              margin: 28px 0 12px;
            }
            .type{
              font-size:24px;
              color:rgba(170,170,170,1);
              margin-bottom: 6px;
            }
            >div{
              >span{
                font-size:24px;
                color:rgba(255,255,255,1);
              }
              >input{
                display: inline-block;
                width: 100px;
                height: 48px;
                line-height: 48px;
                background-color: rgba(0, 0, 0, 0);
                border:1px solid rgba(170,170,170,1);
                box-sizing: border-box;
                color: rgba(60,252,172,1);
                text-align: center;
              }
              .left,.right{
                display: inline-block;
                border:1px solid rgba(60,252,172,1);
                width: 58px;
                height: 48px;
                line-height: 48px;
                border-radius: 10px;
                text-align: center;
                font-size: 28px;
                color: rgba(60,252,172,1);
              }
            }
            .bot{
              font-size:24px;
              color:rgba(255,255,255,1);
              text-align: right;
              // margin-right: 0px;
              // margin-bottom: 32px;
              margin: 0 0 32px 0;
              span{
                color: #FF3E3E;
                font-size: 32px;
              }
            }
          }
        }
      }
      
    }
    >p{
      height: 88px;
      line-height: 88px;
      padding: 0 30px;
      border-top: 1px solid #333;
    }
  }
  >.bot{
    margin: 35px 30px 0;
    .title{
      font-size:36px;
      font-weight:500;
      color:rgba(255,255,255,1);
      margin-bottom: 30px;
    }
    >ul{
      li{
        display: flex;
        margin-bottom: 26px;
        &:first-child{
          .left{
            color: #1097FA;
          }
        }
        &:nth-child(2){
          .left{
            color: #42B000;
          }
        }
        &:nth-child(3){
          .left{
            color: #F5B34E;
          }
        }
        i{
          font-size: 38px;
          // color: red;
        }
        p{
          flex: 1;
          margin: 0 20px;
          font-size:28px;
          color: #fff;
        }
        >div{
          width: 38px;
          height: 38px;
          // background-color: #fff;
          border-radius: 50%;
          // line-height: 38px;
          .right{
            font-size: 38px;
            // background-color: #fff;
            border-radius: 50%;
            color: #3CFCAC;
            // background-color: #fff;
            // box-sizing: border-box;;
          }
          .b_w{
            color: #fff !important;
          }
        }
      }
    }
    
  }
  .btn_box{
    display: flex;
    justify-content: space-between;
    margin: 165px 30px 30px;
    button{
      width:280px;
      height:88px;
      background:rgba(35,35,35,1);
      border-radius:10px;
      color: #fff;
      &:last-child{
        width:380px;
        background:rgba(60,252,172,1);
        color: #333;
        span{
          color: #FF3E3E;
          margin-left: 6px;
        }
      }
    }
  }
}
</style>

