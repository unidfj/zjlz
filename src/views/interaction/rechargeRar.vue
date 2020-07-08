<template>
  <div class="page">
    <m-header :title="$route.query.type=='share'?'共享停车充值':'车联互助充值'" :canback="Boolean(1)"></m-header>
    <section class="body">
      <div class="form_frame">
        <div class="recharge">
          <label class="recharge_text item_title">充值{{$route.query.type=='share'?'共享停车':'车联互助'}}数额(CBD)：</label>
          <input
            class="recharge_input"
            v-model="cbd_num"
            placeholder="请输入充值数额"
            type="number"
            readonly
          />
        </div>
        <div class="total">
          <label class="total_text item_title">合计(￥)：</label>
          <input
            style="color:red"
            class="total_input"
            readonly
            placeholder="系统自动生成对应金额"
            type="text"
            :value="money"
          />
        </div>

        <div class="bot">
          <p class="title">支付方式：</p>
          <ul>
            <li v-for="(v,i) in zf_list" :key="i" @click="payClick(v,i)">
              <i :class="v.icon"></i>
              <p>{{v.name}}</p>
              <!-- <div @click="change(i)">
                <i class="iconfont icongou1 right" v-show="zf_se==i"></i>
              </div> -->
              <i :class="{'iconfont':true,'iconyk_yuanquan_fill':zf_se!=i,'icon2xuanzhong se':zf_se==i}"></i>
            </li>
          </ul>
        </div>
        <button class="btn" @click="btnClick">立即充值</button>
      </div>
    </section>
  </div>
</template>
<script>
// import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Init, Index, Base,Trade } from "@/server/server.js";
import { Util, Load, Secret , AppPay } from "@/assets/commonjs/utils.js";
// import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      zf_list: [
        {
          name: "支付宝支付",
          icon: "iconzhifubao iconfont left"
        },
        {
          name: "微信支付",
          icon: "iconweixin iconfont left"
        }
      ],
      zf_se: 0,
      cbd_num: null,
      money: null,
      pay_type: "alipay",
      rechargeType: null,
      goto: null
    };
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
    this.recharge_info();
    if (this.$route.query.type === "interaction") {
      console.log("车联互动");
      this.rechargeType = 20;
      this.goto = "interaction";
    } else if (this.$route.query.type === "share") {
      console.log("共享停车");
      this.rechargeType = 10;
      this.goto = "share";
    }
  },
  watch:{
    'cbd_num'(){
        this.getSwitchCbdRmb();
    },
  },
  computed: {},
  methods: {
    
    recharge_info(){
      Init.recharge_info().then(res=>{
        if(res.code==1){
          if (this.$route.query.type == "share") {
            this.cbd_num = res.data.gxtc_recharge_min;
            this.money = res.data.gxtc_need_money;
          } else{
            this.cbd_num = res.data.clhz_recharge_min;
            this.money = res.data.clhz_need_money;
          }
        }else{
          mui.toast(res.msg)
        }
      })
    },
    
    /**
     * app支付
     */
    appPay(id,order_no){
      let that = this;
      try{
        if(plus) AppPay.pay(id,order_no,20,()=> {
          // this.goOrder();
          setTimeout(()=>{
            this.$router.go(-1)
          },500)
        })
      }catch(e){}
    },
    payClick(v,i) {
      console.log(v);
      if (v.name === "微信支付") {
        this.pay_type = "wechat";
      } else if (v.name === "支付宝支付") {
        this.pay_type = "alipay";
      }
      this.zf_se = i;
    },
    btnClick() {
      if (!this.cbd_num) {
        mui.toast("请输入充值额数");
        return;
      }

      Init.rechargeOrderAdd({
        recharge_type: this.rechargeType,
        pay_type: this.pay_type,
        cbd_num: this.cbd_num
      }).then(res => {
        if (res.code === 1) {
          // this.experience(this.pay_type,res.data.order_no);
          this.appPay(this.pay_type,res.data.order_no);
        }else{
          mui.toast(res.msg);
        }
      });
    }, 
    
    // 现金支付回调测试
    notifyx(pay_type,out_trade_no){
      Trade.notifyx({out_trade_no,pay_type}).then(res=>{
        mui.toast(res.msg)
        if(res.code==1){
          setTimeout(() => {
            this.$router.push({ name: this.goto === "interaction"?"Interaction":"Share" });
          }, 500);
        }
      })
    },
    // 微信/支付宝支付
    experience(pay_type,order_no){
      Trade.experience({order_no,order_type:20,pay_type}).then(res=>{
        if(res.code==1){
          this.notifyx(pay_type,res.data)
        }else{
          mui.toast(res.msg)
        }
      })
    },
    change(i) {
      this.zf_se = i;
    },
    getSwitchCbdRmb() {
      Init.switchCbdRmb({ cbd_num: this.cbd_num }).then(res => {
        if (res.code === 1) {
          this.money = res.data;
        } else {
          // mui.toast(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  line-height: 36px;
  background-color: @bg-color;
  padding: 30px;
  .form_frame {
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
    >div{
      .item_title{
        margin-bottom: 20px;
        display: inline-block;
      }
    }
    .recharge {
      .recharge_input {
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 45px;
        height: 98px;
        // background: rgba(255, 255, 255, 1);
        border-radius: 10px;
      }
    }
    .total {
      .total_text {
        margin-bottom: 23px;
      }
      .total_input {
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 62, 62, 1);
        line-height: 45px;
        height: 98px;
        // background: rgba(255, 255, 255, 1);
        border-radius: 10px;
        &::-webkit-input-placeholder {
          color: rgba(255, 62, 62, 1);
        }
      }
    }
    .bot {
      margin: 35px 30px 0;
      .title {
        font-size: 36px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 30px;
      }
      >ul{
        li{
          display: flex;
          margin-bottom: 26px;
          &:first-child {
            .left {
              color: #1097fa;
            }
          }
          &:nth-child(2) {
            .left {
              color: #42b000;
            }
          }
          &:nth-child(3) {
            .left {
              color: #f5b34e;
            }
          }
          i {
            font-size: 38px;
            color: #fff;
          }
          .se{
            color: #3cfcac;
          }
          p {
            flex: 1;
            margin: 0 20px;
            font-size: 28px;
            color: #fff;
          }
          // > div {
          //   width: 38px;
          //   height: 38px;
          //   background-color: #fff;

          //   border-radius: 50%;
          //   .right {
          //     font-size: 38px;
          //     border-radius: 50%;
          //     color: #3cfcac;
          //     position: absolute;
          //     margin-top: -7px;
          //   }
          // }

        }
      }
    }
    .btn {
      width: 100%;
      height: 88px;
      background: rgba(60, 252, 172, 1);
      border-radius: 10px;
      font-size: 36px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(3, 3, 3, 1);
      line-height: 80px;
      margin-top: 59px;
    }
  }
}
</style>
 
