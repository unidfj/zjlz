<template>
  <div class="page">
    <m-header title="订单详情" :canback="Boolean(1)"></m-header>
    <section class="body">
      <ul class="order_details">
        <li class="item_li">交易数量：{{dataObj.amount2}}</li>
        <li class="item_li">手续费：{{dataObj.servicecharge}}</li>
        <li class="item_li">待交易数量：{{dataObj.waitamount}}</li>
        <li class="item_li">在交易数量：{{dataObj.freezeamount}}</li>
        <li class="item_li">已交易数量：{{dataObj.haveamount}}</li>
        <li class="item_li">单价：￥{{dataObj.uprice}}</li>
        <li class="item_li">总金额：￥{{dataObj.totalprice}}</li>
        <li class="state">
          状态：
          <span class="title">已创建</span>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
// import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Init, Index, Base } from "@/server/server.js";
// import { Util, Load, Secret } from "@/assets/commonjs/utils.js";
// import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      state: "",
      table: null,
      id: null,
      dataObj: {}
    };
  },

  mounted() {
    this.state = this.$route.query.type;
    this.table = this.$route.query.table;
    this.id = this.$route.query.id;
    this.getorderdetailData();
  },
  computed: {},
  methods: {
    getorderdetailData() {
      Init.orderdetail({ table: this.table, orderid: this.id }).then(res => {
        console.log(res);
        if (res.code === 1) {
          this.dataObj = res.data;
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
 
