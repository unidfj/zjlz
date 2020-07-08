<template>
  <div class="page">
    <m-header title="交易订单" :canback="Boolean(1)"></m-header>
    <section class="body">
      <ul class="btn_frame">
        <li
          @click="btnClick(item)"
          class="btn1"
          :class="{'btnActive':btnLable===item.btnLable}"
          v-for="item in dataList"
          :key="item"
        >{{item.btnLable}}</li>
      </ul>

      <ul class="ul_frame">
        <li
          class="title" 
          :class="{'active':lable===item.lable}"
          v-for="item in herderList"
          :key="item"
          @click="itemClick(item.lable)"
        >{{item.lable}}</li>
      </ul>

      <ul class="order">
        <li class="order_details" v-for="item in orderDataList" :key="item">
          <div class="left">
            <div v-if="status!=1">
              <div class="number" v-if="userInfo.username==item.uuname">买家：{{item.pairname}}</div>
              <div class="number" v-else>买家：{{item.uuname}}</div>
            </div>
            <div class="details">
              <div class="money">单价：￥{{item.price}}</div>
              <div class="num">数量：{{item.amount}} CBD</div>
            </div>
            <div class="total">
              总额：
              <span>￥{{item.totalprice}}</span>
            </div>
          </div>
          <button class="right_btn" @click="goTo(viewsLink,item.table,item.id)">确认</button>
        </li>
      </ul>
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
      orderDataList: [],
      dataList: [
        {
          btnLable: "卖单"
        },
        {
          btnLable: "买单"
        }
      ],
      herderList: [
        {
          lable: "已创建",
          value: "1"
        },
        {
          lable: "待付款",
          value: "2"
        },
        {
          lable: "待确认",
          value: "3"
        },
        {
          lable: "已完成",
          value: "4"
        },
        {
          lable: "申诉中",
          value: "5"
        },
        {
          lable: "已取消",
          value: "6"
        }
      ],
      lable: "已创建",
      viewsLink: "OrderNew",
      viewsName: "已创建",
      btnLable: "卖单",
      type: 2,
      page: 1,
      status: 1,
      userInfo: null
    };
  },
  mounted() {
    this.userInfo = JSON.parse(
      Secret.decrypt(localStorage.getItem("userInfo"))
    );
    // if (localStorage.getItem("lable")) {
    //   this.lable = localStorage.getItem("lable");
    // }
    this.getmyorderData();
  },
  computed: {},
  methods: {
    btnClick(item) {
      if (item.btnLable === "卖单") {
        this.type = 2;
      } else if (item.btnLable === "买单") {
        this.type = 1;
      }
      this.getmyorderData();
      this.btnLable = item.btnLable;
    },
    itemClick(e) {
      this.lable = e;
      // localStorage.setItem("lable", e);
      switch (e) {
        case "已创建":
          this.viewsLink = "OrderNew";
          this.viewsName = e;
          this.lable = e;
          this.status = 1;
          break;
        case "待付款":
          this.viewsLink = "OrderPayment";
          this.viewsName = e;
          this.lable = e;
          this.status = 2;
          break;
        case "待确认":
          this.viewsLink = "OrderWaitFor";
          this.viewsName = e;
          this.lable = e;
          this.status = 3;
          break;
        case "已完成":
          this.viewsLink = "OrderType";
          this.viewsName = e;
          this.lable = e;
          this.status = 4;
          break;
        case "申诉中":
          this.viewsLink = "OrderType";
          this.viewsName = e;
          this.lable = e;
          this.status = 10;
          break;
        case "已取消":
          this.viewsLink = "OrderType";
          this.viewsName = e;
          this.lable = e;
          this.status = 20;
          break;
      }
      this.getmyorderData();
    },
    getmyorderData() {
      Init.myorder({
        page: this.page,
        status: this.status,
        type: this.type
      }).then(res => {
        console.log(res);
        if (res.code === 1) {
          this.orderDataList = res.data;
        }
      });
    },

    // 已完成  已取消 申诉 是同个页面来的
    goTo(type, table, id) {
      this.$router.push({
        name: type,
        query: { type: this.viewsName, id: id, table, table }
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
  .btn_frame {
    display: flex;
    width: 100%;
    height: 80px;
    line-height: 80px;
    color: white;
    text-align: center;
    .btn1 {
      width: 50%;
    }
  }
  .ul_frame {
    background: rgba(35, 35, 35, 1);
    // height: 87px;
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    margin-top: 1px;
    &::-webkit-scrollbar {
      display: none;
    }
    .title {
      padding: 20px 14px;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 45px;
    }
    .active {
      color: #3cfcac;
      border-bottom: 4px solid #3cfcac;
    }
  }
  .order {
    padding: 30px;

    .order_details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 2px dashed rgb(60, 252, 172, 1);
      margin-bottom: 30px;
      .left {
        padding: 20px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 46px;
        // .number {
        // }
        .details {
          display: flex;
          //   .money {
          //   }
          .num {
            margin-left: 20px;
          }
        }
        .total {
          span {
            color: #3cfcac;
          }
        }
      }
      .right_btn {
        width: 150px;
        height: 68px;
        background: rgba(60, 252, 172, 1);
        border-radius: 10px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(3, 3, 3, 1);
        margin-right: 30px;
        border: 1px solid rgba(60, 252, 172, 1);
      }
    }
  }
  .btnActive {
    background-color: #3cfcac;
    color: white;
  }
}
</style>
 
