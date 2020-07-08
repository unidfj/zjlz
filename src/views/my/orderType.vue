<template>
  <div class="page">
    <m-header title="订单详情" :canback="Boolean(1)"></m-header>
    <section class="body">
      <ul class="order_details">
        <li class="item_li">买家：大肥羊</li>
        <li class="item_li">买家手机号：13578254875</li>
        <li class="item_li">购买数量：100 CBD</li>
        <li class="item_li">单价：￥1.43</li>
        <li class="item_li">单价区间：￥1.41-￥1.92</li>
        <li class="item_li">总金额：￥143</li>
        <li class="voucher">打款凭证：</li>
        <li class="modez">支付方式：微信</li>
        <li class="img">
          <img src="../../assets/images/interaction.png" alt />
        </li>
        <li class="state">
          状态：
          <span class="title">已完成</span>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
// import { swiper, swiperSlide } from "vue-awesome-swiper";
// import { Init, Index, Base } from "@/server/server.js";
// import { Util, Load, Secret } from "@/assets/commonjs/utils.js";
// import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      state: ""
    };
  },

  mounted() {
    this.state = this.$route.query.type;
  },
  computed: {},
  methods: {}
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
    .modez {
      width: 224px;
      height: 45px;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 45px;
      margin-bottom: 20px;
    }
    .img {
      width: 100%; 
      border-radius: 10px;
      img {
        width: 100%;
      }
    }
    .state {
      color: rgba(255, 255, 255, 1);
      .title {
        line-height: 58px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #3cfcac;
      }
    }
  }
}
</style>
 
