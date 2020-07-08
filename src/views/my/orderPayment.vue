<template>
  <div class="page">
    <m-header title="订单详情" :canback="Boolean(1)"></m-header>
    <section class="body">
      <ul class="order_details">
        <li
          class="item_li"
        >买家：{{userInfo.username==dataObj.pairname?dataObj.uuname:dataObj.pairname}}</li>
        <li class="item_li">买家手机号：{{dataObj.sellinfo&&dataObj.sellinfo.mobile}}</li>
        <li class="item_li">购买数量：{{dataObj.amount}} CBD</li>
        <li class="item_li">单价：￥{{dataObj.price}}</li>
        <li class="item_li">单价区间：￥{{dataObj.section}}</li>
        <li class="item_li">总金额：￥{{dataObj.totalprice}}</li>

        <li class="img_frame">
          <span class="type">收款方式：</span>
          <div class="item">
            <div class="img"  v-if="dataObj.sellinfo&&dataObj.sellinfo.wechat_url">
              <img :src="wechat_url" alt />
              <div class="title">微信</div>
            </div>
            <div class="img" v-if="dataObj.sellinfo&&dataObj.sellinfo.alipay_url">
              <img :src="alipay_url" alt />
              <div class="title">支付宝</div>
            </div>
          </div>
        </li>
      </ul>
      <div class="bot">
        <p class="title">支付方式：</p>
        <ul>
          <li v-for="(v,i) in zf_list" :key="i">
            <i :class="v.icon"></i>
            <p>{{v.name}}</p>
            <div @click="iclick(i)">
              <i class="iconfont icongou1 right" v-show="zf_se==i"></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="up_picture">
        <img class="img_icon" :src="upladSrc" alt />
        <div class="icon_icon_frame">
          <i class="iconfont icongou1 icon_icon"></i>
          <div class="title">上传照片</div>
        </div>
        <input class="file" type="file" @change="change($event)" />
      </div>
      <button class="btn">付款</button>
    </section>
    <m-load ref="load"></m-load>
  </div>
</template>
<script>
// import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Init, Index, Base } from "@/server/server.js";
import { Util, Load, Secret } from "@/assets/commonjs/utils.js"; 
import { mapGetters, mapMutations } from "vuex";

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
      upladSrc: "",
      dataObj: {},
      userInfo: "",
      alipay_url:null,
      wechat_url:null
    };
  },

  mounted() {
    this.userInfo = JSON.parse(
      Secret.decrypt(localStorage.getItem("userInfo"))
    ); 
    this.state = this.$route.query.type;
    this.table = this.$route.query.table;
    this.id = this.$route.query.id;
    this.getorderdetailData();
  },
  computed: {
    ...mapGetters(["api"])
  },
  methods: {
    getorderdetailData() {
      Init.orderdetail({ table: this.table, orderid: this.id }).then(res => {
        console.log(res);
        if (res.code === 1) {
          this.dataObj = res.data; 
          this.alipay_url=this.api+res.data.sellinfo.alipay_url
          this.wechat_url=this.api+res.data.sellinfo.wechat_url
        }
      });
    },
    iclick(i) {
      console.log(i);
      this.zf_se = i;
    },
    change(event) {
      let _This = this; 
      let formData = new FormData();
      Load.loadStart(_This);
      Util.uploadImgLimit(event.target.files[0], url => {
        formData.append("image", url);
        Base.upload(formData).then(res => {
          Load.loadEnd(_This);
          if (res.code == 1) {
            _This.upladSrc = _This.api + res.data;
          } else {
            mui.toast(res.msg);
            return;
          }
        });
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
  .order_details {
    background: rgba(35, 35, 35, 1);
    border-radius: 10px;
    padding: 20px;
    border: 2px dashed rgba(60, 252, 172, 1);
    .item_li {
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 20px;
    }
    .voucher {
      margin-top: 40px;
      font-size: 36px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 50px;
      margin-bottom: 20px;
    }
    .img_frame {
      margin-top: 20px;
      .type {
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 50px;
      }
      .item {
        display: flex;
        margin-top: 24px;
        .img {
          margin-right: 43px;
          text-align: center;
          img {
            width: 200px;
            height: 200px;
          }
          .title {
            font-size: 24px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 33px;
          }
        }
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
    > ul {
      li {
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
        }
        p {
          flex: 1;
          margin: 0 20px;
          font-size: 28px;
          color: #fff;
        }
        > div {
          width: 38px;
          height: 38px;
          background-color: #fff;
          border-radius: 50%;
          .right {
            font-size: 38px;
            border-radius: 50%;
            color: #3cfcac;
          }
        }
      }
    }
  }

  .up_picture {
    width: 220px;
    height: 200px;
    background: rgba(35, 35, 35, 1);
    border-radius: 10px;
    border: 2px dashed rgba(60, 252, 172, 1);
    text-align: center;
    margin-left: 5px;
    margin-right: 5px;
    position: relative;
    z-index: 999;
    .img_icon {
      border-radius: 10px;
      width: 100%;
      position: absolute;
      left: 0px;
    }
    .icon_icon_frame {
      margin-top: 50px;
      .icon_icon {
        width: 58px;
        height: 58px;
      }
      .text {
        margin-top: 21px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        height: 33px;
        line-height: 33px;
      }
    }
  }
  .file {
    position: absolute;
    width: 100%;
    height: 196px;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .btn {
    margin-top: 43px;
    height: 88px;
    width: 100%;
    background: rgba(60, 252, 172, 1);
    border-radius: 8px;
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 88px;
  }
}
</style>
 
