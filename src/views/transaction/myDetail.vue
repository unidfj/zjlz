<template>
  <div class="page">
    <m-header title='订单详情' :canback="Boolean(1)"></m-header>
    <section class="body">
      <ul class="list" v-if="table=='cc'&&data.state==4">
        <li>交易数量：{{data.amount2}}</li>
        <li>已交易数量：{{data.haveamount}}</li>
        <li>待交易数量：{{data.waitamount}}</li>
        <li>手续费：{{data.servicecharge}} CBD</li>
        <li>单价：{{data.uprice}} CBD</li>
        <li>总价：{{data.totalprice}} CBD</li>
        <li>状态：<span class="c_g">已完成</span></li>
      </ul>
      <ul class="list" v-else>
        <li v-if="data.state!=1">买家：{{data[type!=1?'sellinfo':'buyinfo'].username}}</li>
        <li v-if="data.state!=1">买家手机号：{{data[type!=1?'sellinfo':'buyinfo'].mobile}}</li>
        <li>购买数量：{{data.amount||data.waitamount}} CBD</li>
        <li>单价：￥ {{data.price||data.uprice}}</li>
        <li>单价区间：{{data.section}}</li>
        <li>总金额：{{data.totalprice}}</li>
        <li>状态：<span :class="{'c_g':true,'c_r':data.status==10||data.status==20||data.status==3}">{{getBtn(data.state||data.status)}}</span></li>
        
        <!-- 支付二维码模块 -->
        <li class="img_box"  v-if="data.status&&((data.status==2&&type==1)||data.status==3||data.status==4||data.status==10)">
          <p class="title">收款方式</p>
          <div>
            <div v-if="data.sellinfo.wechat_url||data.buyinfo.wechat_url" @click="addSrc(api+(data.sellinfo.wechat_url||data.buyinfo.wechat_url))">
              <img :src="api+(data.sellinfo.wechat_url||data.buyinfo.wechat_url)" alt="">
              <p>微信</p>
            </div>
            <div v-if="data.sellinfo.alipay_url||data.buyinfo.alipay_url" @click="addSrc(api+(data.sellinfo.alipay_url||data.buyinfo.alipay_url))">
              <img :src="api+(data.sellinfo.alipay_url||data.buyinfo.alipay_url)" alt="">
              <p>支付宝</p>
            </div>
          </div>
        </li>
        <!-- 支付模块 -->
        <li class="upload_box" v-if="data.status&&((data.status==2&&type==1)||data.status==3||data.status==4||data.status==10)">
          <p class="title" >{{data.status==2&&type==1?'上传':''}}打款凭证</p>
          <p class="cftype" v-if="data.paytype">支付方式：{{data.paytype==1?'微信':'支付宝'}}</p>
          <div @click="zf_type = true" class="zf" v-if="!data.paytype">
            <img :src="img25" alt="">
            <span>支付宝支付</span>
            <i :class="{'iconfont':true,'iconyk_yuanquan_fill':!zf_type,'icon2xuanzhong se':zf_type}"></i>
          </div>
          <div  @click="zf_type = false" class="zf" v-if="!data.paytype">
            <img :src="img26" alt="">
            <span>微信支付</span>
            <i :class="{'iconfont':true,'iconyk_yuanquan_fill':zf_type,'icon2xuanzhong se':!zf_type}"></i>
          </div>
          <div class="bot">
            <img :src="api+data.payproof" alt="" v-show="data.payproof">
            <i class="iconfont iconuntitled44"></i>
            <p>上传打款凭证</p>
            <img :src="upload_img" alt="" v-show="upload_img" v-if="type==1&&data.status==2">
            <input class="file" type="file" @change="change($event)" v-if="type==1&&data.status==2">
          </div>
        </li>

        <!-- 申诉模块 -->
        <li class="appeal_box" v-show="appeal">
          <p class="title">提交申诉：</p>
          <div class="inp_box">
            <p>申诉理由：</p>
            <input type="text" placeholder="请输入申诉理由" v-model="contents">
          </div>
          <div class="bot">
            <!-- <img :src="api+data.payproof" alt="" v-show="data.payproof"> -->
            <i class="iconfont iconuntitled44"></i>
            <p>上传凭证</p>
            <img :src="appeal_img" alt="" v-show="appeal_img" v-if="type==2&&data.status==3">
            <input class="file" type="file" @change="change($event,true)" v-if="type==2&&data.status==3">
          </div>
        </li>

        <!-- 按钮模块 -->
        <li>
          <button @click="$refs['pwd'].open()" v-if="(data.status==2&&type==1)||(type==2&&data.status==3)&&!appeal">{{(type==2&&data.status==3)?'放行':'提交'}}</button>
          <button @click="appeal = true" v-if="data.status==3&&type==2" v-show="!appeal">申诉</button>
          <button v-show="appeal" @click="complaint">提交申诉</button>
        </li>

      </ul>
    </section>
    <div class="ale" v-show="show" @click="show = false">
      <!-- <img :src="src" alt=""> -->
      <img :src="src" alt="">
    </div>
    <m-pwd ref="pwd" @pay="pay"></m-pwd>
    <m-load ref="load"></m-load>
  </div>
</template>
<script>
import { Init, Index, Base } from "@/server/server.js";
import { Util, Load, Secret } from "@/assets/commonjs/utils.js";
import { mapGetters, mapMutations } from "vuex";
import mPwd from '@/components/pwd-alert.vue';
export default {
  components:{
      mPwd
  },
  data() {
    return {
      title: null,
      type:null,
      list:[],
      status:1,
      table:null,
      img25:require('@/assets/images/lz/25.png'),
      img26:require('@/assets/images/lz/26.png'),
      orderid:null,
      zf_type:true,
      data:{
        buyinfo:{
          alipay_url: null,
          alipayact: null,
          bankact: null,
          email: null,
          mobile: null,
          username: null,
          wechat_url: null,
          wechatact: null,
          wechatname: null,
        },
        sellinfo:{
          alipay_url: null,
          alipayact: null,
          bankact: null,
          email: null,
          mobile: null,
          username: null,
          wechat_url: null,
          wechatact: null,
          wechatname: null,
        },
        status:null,
        payproof:null,
        state:null,
        amount:null,
        price:null,
        section:null,
        status:null,
        totalprice:null,
        tradesn:null,
        type:null,
        uuname:null,
      },
      upload_img:null,
      payroof:null,
      fd:true,
      appeal_img:null,
      images:null,
      contents:null,
      appeal:false,
      src:null,
      show:null,
    };
  },
  mounted() { 
    this.initData();
    this.orderdetail();
    
  },
  computed: {
    ...mapGetters([,'api','userInfo'])
  },
  methods: {
    initData(){
      this.table = this.$route.query.table;
      this.type = this.$route.query.type;
      this.orderid = this.$route.query.id;
    },
    addSrc(v){
      this.show = true;
      this.src = v;
    },
    formatDate(v){
      return Util.formatDate(v)
    },
    // 卖家申诉
    complaint(){
      if(!this.fd) return;
      this.fd = false
      Init.complaint({orderid:this.orderid,contents:this.contents,images:this.images}).then(res=>{
        mui.toast(res.msg)
        this.fd = true;
        if(res.code==1){
          setTimeout(()=>{
            this.$router.go(-1)
          },100)
        }
      })
    },
    // 卖家确认
    dealOrder(pwd){
      if(!this.fd) return;
      this.fd = false
      Init.dealOrder({orderid:this.orderid,pwd}).then(res=>{
        mui.toast(res.msg)
        this.fd = true;
        if(res.code==1){
          setTimeout(()=>{
            this.$router.go(-1)
          },100)
        }
      })
    },
    // 买家付款
    payOrderpwd(pwd){
      if(!this.fd) return;
      this.fd = false
      let params = {
        payroof:this.payroof,
        pwd,
        orderid:this.orderid,
        patype:this.zf_type?2:1,
      }
      Init.payOrder(params).then(res=>{
        mui.toast(res.msg)
        this.fd = true;
        if(res.code==1){
          setTimeout(()=>{
            this.$router.go(-1)
          },100)
        }
      })
    },
    // 交易订单列表
    orderdetail(){
      Init.orderdetail({table:this.table,orderid:this.orderid}).then(res=>{
        if(res.code==1){
          this.data = res.data
        }else{
          mui.toast(res.msg)
        }
      })
    },
    getBtn(v){
      switch(+v){
        case 1:
          return '已创建';
        case 2:
          return '待付款';
        case 3:
          return '待确认';
        case 4:
          return '已完成';
        case 10:
          return '申诉中';
        case 20:
          return '已关闭';
      }
    },
    
    change(event,bl){
        let _This = this;
        let formData = new FormData();
        Load.loadStart(_This);
        Util.uploadImgLimit(event.target.files[0],url=>{
            formData.append('image',url);
            Base.upload(formData).then((res)=>{
            Load.loadEnd(_This);
                if(res.code == 1){
                  if(bl){
                    _This.appeal_img = _This.api+res.data;
                    _This.images = res.data;
                  }else{
                    _This.upload_img = _This.api+res.data;
                    _This.payroof = res.data;
                  }
                }else {
                    mui.toast(res.msg);
                    return ;
                }
            })
        })
    },
    pay(pwd){
      if(this.data.status==2){
        this.payOrderpwd(pwd);
      }else if(this.data.status==3){
        this.dealOrder(pwd)
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  background-color: @bg-color;
  .list{
    width: 690px;
    margin: 30px;
    border:2px dashed rgba(60,252,172,1);
    padding: 20px 30px;
    border-radius: 12px;
    background-color: #232323;
    li{
      margin-bottom: 10px;
      color: #fff;
      &:last-child{
        border-bottom: 0;
      }
      .title{
        font-weight:500;
        font-size: 34px;
        margin-bottom: 24px;
      }
      .c_g{
        color: #3CFCAC;
      }
      .c_r{
        color: red;
      }
      >button{
        width:630px;
        height:88px;
        background:rgba(60,252,172,1);
        border-radius:8px;
        color: #000;
        z-index: 99;
        &:nth-child(2){
          background-color: #FFC36D;
          margin-top: 30px;
        }
      }
      
      >.bot{
        width: 326px;
        height: 200px;
        border-radius: 10px;
        border:2px dashed rgba(60,252,172,1);
        text-align: center;
        margin-top: 32px;
        margin-bottom: 42px;
        position: relative;
        >i{
          font-size: 60px;
          margin-top: 46px;
          display: inline-block;
          margin-bottom: 30px;
          color: #3CFCAC;
        }
        p{
          font-size: 24px;
          color: #fff;
        }
        img{
          // width: 100%;
          width: 326px !important;
          height: 200px !important;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 90;
        }
        >input{
          width: 100%;
          height: 200px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 99;
          opacity: 0;
        }
      }
    }
    .img_box{
      margin-top: 10px;
      >div{
        padding-left: 8px;
        >div{
          margin-right: 44px;
          display: inline-block;
          img{
            width: 200px;
            height: 200px;
            margin-bottom: 10px;
          }
          p{
            font-size: 24px;
            color: #fff;
            text-align: center;
          }
        }
      }
    }
    .upload_box{
      >.zf{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        img{
          width: 38px;
          height: 38px;
          margin-right: 20px;
        }
        span{
          font-size: 28px;
          color: #fff;
          flex: 1;
          display: inline-block;
        }
        i{
          font-size: 36px;
          color: #fff;
        }
        .se{
          color: #3CFCAC;
        }
      }
      .cftype{
        margin-bottom: 20px;
        font-size: 32px;
      }
    }
    .appeal_box{
      .title{
        margin-bottom: 0;
      }
      .inp_box{
        display: flex;
        justify-content: space-between;
        height: 98px;
        line-height: 98px;
        padding-left: 20px;
        input{
          flex: 1;
          height: 98px;
          background-color: rgba(0, 0, 0, 0);
        }
      }
      .bot{
        margin-left: 20px;
        margin-top: 0;
      }
    }

  }
}
.ale{
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  img{
    margin: 200px 50px;
    width: 650px;
    // height: 650px;
    // position: absolute;
    // top: 200px;
    // left: 50px;
  }
}
</style>
 
