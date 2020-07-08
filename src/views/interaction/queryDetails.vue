<template>
  <div class="page">
    <m-header title="查询明细" :canback="Boolean(1)"></m-header>
    <section class="body">
      <div class="query_header">
        <div class="text text_name">用户名</div>
        <div class="text text_money">分摊金额</div>
        <div class="text text_time">分摊时间</div>
      </div>
      <ul
        class="query_content"
        v-lazy-load="lazyLoad"
        :style="'height:'+(screenHeight-100)+'px;overflow:auto;'"
      >
        <li class="item_li" v-for="item in  dataList" :key="item">
          <div class="text_name text">{{item.username}}</div>
          <div class="text_money text">{{item.num}} CBD</div>
          <div class="text_time text">{{String(formatDate(item.updatetime)).substring(0,15)}}</div>
        </li>
      </ul>
      <m-load ref="load"></m-load>
    </section>
  </div>
</template>
<script>
// import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Init, Index, Base } from "@/server/server.js";
import { Util, Load, Secret } from "@/assets/commonjs/utils.js";
// import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      type: null,
      page: 1,
      dataList: [],
      formatDate: null,
      screenHeight: 667,
      noMore: false
    };
  },
  mounted() {
    if (this.$route.query.type === "interaction") {
      console.log("车联互动");
      this.type = 20;
    } else if (this.$route.query.type === "share") {
      console.log("共享停车");
      this.type = 10;
    }
    this.getOtherCbdList();
    this.formatDate = Util.formatDate;
  },
  computed: {},
  methods: {
    getOtherCbdList() {
      Load.loadStart(this);
      Init.otherCbdList({
        type: this.type,
        page: this.page
      }).then(res => { 
        if (res.code === 1) {
          Load.loadEnd(this); 
          Load.loadEnd(this);
          this.dataList = this.dataList.concat(res.data);
          if (res.page > res.data.length) {
            this.noMore = true;
          }
        } else {
          mui.toast(res.msg);
          return false;
        }
      });
    },
    lazyLoad() {
      if (!this.noMore) {
        this.page = this.page + 1;
        this.getOtherCbdList();
      }
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
  .query_header {
    display: flex;
    text-align: center;
    .text {
      height: 45px;
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(60, 252, 172, 1);
      line-height: 45px;
    }
    .text_name {
      width: 30%;
      text-align: left;
    }
    .text_money {
      width: 30%;
      text-align: center;
    }
    .text_time {
      width: 40%;
      text-align: right;
    }
  }
  .query_content {
    color: white;
    .item_li {
      display: flex;
      .text {
        height: 40px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
        margin-top: 30px;
      }
      .text_name {
        width: 30%;
        text-align: left;
      }
      .text_money {
        width: 30%;
        text-align: center;
      }
      .text_time {
        width: 40%;
        text-align: right;
      }
    }
  }
}
</style>
 
