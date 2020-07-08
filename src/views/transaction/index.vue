<template>
  <div class="page">
    <m-header title="交易">
      <!-- <span @click="$router.push({name:'TransactionOrder'})">我的交易</span> -->
      <span @click="$router.push({name:'myOrder'})">我的交易</span>
    </m-header>
    <section class="body">
      <div class="item">
        <ul>
          <li class="item_li">
            <div class="title">均价(昨/今)</div>
            <div class="money">￥{{dataObj.y_average}}/￥{{dataObj.t_average}}</div>
          </li>
          <li class="item_li">
            <div class="title">最高(昨/今)</div>
            <div class="money">￥{{dataObj.y_high}}/￥{{dataObj.t_high}}</div>
          </li>
          <li class="item_li">
            <div class="title">当前</div>
            <div class="money">￥{{dataObj.price}}</div>
          </li>
          <li class="item_li">
            <div class="title">成交(昨/今)</div>
            <div class="money">￥{{dataObj.y_deal}}/￥{{dataObj.t_deal}}</div>
          </li>
          <li class="item_li">
            <div class="title">买量</div>
            <div class="money">{{dataObj.buy_num}}</div>
          </li>
          <li class="item_li">
            <div class="title">涨跌</div>
            <div :class="{'money':true,'c_r':dataObj.range<0,'c_g':dataObj.range>0}">+{{dataObj.range}}%</div>
          </li>
        </ul>
      </div>
      <div class="btn_famer">
        <button class="btn_left" @click="$router.push({name:'TD',query:{type:'1'}})">买入中心</button>
        <button class="btn_right" @click="$router.push({name:'TD',query:{type:'2'}})">卖出中心</button>
      </div>
      <div class="top">
        <p
          class="topItem"
          v-for="(v,i) in topList"
          :key="i"
          @click="change(i)"
          :class="{'addColor':addColor==i}"
        >{{v}}</p>
      </div>
      <div id="echarts" style="width:100%;height:250px"></div>
      <div class="bot" @click="show = true">创建</div>
    </section>
    <div class="ale" v-show="show">
      <div class="box">
        <button  @click="$router.push({name:'BuyBill',query:{type:'buy'}})">创建买单</button>
        <button @click="$router.push({name:'BuyBill',query:{type:'sell'}})">创建卖单</button>
        <button  @click="show = false">取消</button>
      </div>
    </div>
    <m-Footer></m-Footer>
  </div>
</template>
<script>
// import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Init, Index, Base } from "@/server/server.js";
import echarts from 'echarts'
// import { Util, Load, Secret } from "@/assets/commonjs/utils.js";
// import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      arr1: [],
      arr2: [],
      topList: ["日", "周", "月"],
      addColor: 0,
      dataObj: {},
      show:false,
    };
  },
  mounted() {
    this.kLine("day");
    this.getParamData();
  },
  computed: {},
  methods: {
    getParamData() {
      Init.kParam().then(res => {
        if (res.code === 1) {
          this.dataObj = res.data;
        }
      });
    },

    change(num) {
      this.addColor = num;
      switch (num) {
        case 0:
          this.kLine("day");
          break;
        case 1:
          this.kLine("week");
          break;
        case 2:
          this.kLine("month");
          break;
      }
    },

    kLine(type) {
      Init.kLine({ type }).then(res => {
        if (res.code == 1) {
          this.arr1 = [];
          this.arr2 = [];
          res.data.forEach((v, i) => {
            if (!v) {
              return;
            }
            this.arr1.unshift(v.time);
            this.arr2.unshift((+v.trade).toFixed(2));
          });
          this.drawLine2(type != "day" ? "line" : "bar");
        } else {
          mui.toast(res.msg);
        }
      });
    },

    // 折线图样式一
    drawLine(type) {
      var myChart = this.echarts.init(document.getElementById("echarts"));
      let _this = this
      // 绘制图表
      var option = {
        color: "#3CFCAC", //线条颜色
        title: {
          text: "交易量",
          padding: 16,
          textStyle: {
            color:'#fff',
            fontWeight:'400',
            // color: "#49e0e7",
            fontSize: 18,
            show:false
          }
        },
        grid: {
          left: "0%",
          right: "0%",
          top: "30%",
          bottom: "0%"
        },
        // 整体颜色
        textStyle: {
          fontSize: 18,
          fontWeight: "bolder",
          color: "rgba(255, 255, 255, 1)"
        },
        // 配置要在X轴显示的项
        xAxis: {
          type: 'category',
          boundaryGap: false,
          default: true,
          data: this.timeList,
          // data: this.arr1,
          axisTick: { show:false },
          axisLine: { show:false },
          axisLabel: { show:false }
        },
        // 配置要在y轴显示的项
        yAxis: {

          
          default: true,
          show :false,
          axisTick: { show:false },
          axisLine: { show:false },
          textStyle:{
            // color:'red'
            show:false
          },
        },
        // 每个系列通过type决定自己IDE图表类型
        series: [
          {
            data: this.arr2,
            name: "销量",
            type,
            // type:'line',
            smooth: true,
            symbol: "none",
            areaStyle: {
              // 填充
              normal: {
                // color: "#3CFCAC"
                
                color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(60, 252, 172, 1)'
                    }, {
                        offset: 1,
                        color: 'rgba(60, 252, 172, 0.14)'
                    }])
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    // 折线图样式二
    drawLine2(type){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.echarts.init(document.getElementById('echarts'))
        // 绘制图表
        myChart.setOption({
            color: "#3CFCAC", //线条颜色
            tooltip: {},
            title: {
              text: "交易次数/时间",
              padding: 16,
              textStyle: {
                color:'#fff',
                fontWeight:'400',
                // color: "#49e0e7",
                fontSize: 18,
                show:false
              }
            },
            grid:{
                left:'10%',
                right:'10%',
                bottom:'15%',
                top:'20%',
            },
            xAxis: {
                type: 'category',
                data: this.arr1,
                axisTick: { show:false },
                axisLine: { 
                    show:true,
                    lineStyle:{
                        color:'#fff',
                    }
                },
                axisLabel:{
                    textStyle:{
                        // color:'red',
                        fontSize:"10",
                        color:'#fff'
                    },
                }
            },
            yAxis: { 
                default: true,
                // show :false,
                axisTick: { show:false },
                axisLine: { 
                    show:true,
                    lineStyle:{
                        color:'#fff',
                    }
                },
                color:'red',
                splitLine: {     //网格线
                    "show": false
                },
                
                axisLabel:{
                    textStyle:{
                        fontSize:"10",
                        color:'#fff'
                    },
                }


            },
            series: [
              {
                data: this.arr2,
                name: "销量",
                type,
                smooth: true,
                symbol: "none",
                areaStyle: {
                  normal: {
                    color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(60, 252, 172, 1)'
                        }, {
                            offset: 1,
                            color: 'rgba(60, 252, 172, 0.14)'
                        }])
                  }
                }
              }
            ]
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
  position: relative;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: url("../../assets/images/interaction.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border: 1px dashed rgb(150, 149, 149);
    height: 275px;
    // border-radius: 12px;
    ul {
      overflow: hidden;
      width: 100%;
      padding: 34px 0 27px;

      // padding: 34px 0px;
      .item_li {
        text-align: center;
        width: 32%;
        display: inline-block;
        &:nth-child(4){
          margin-top: 30px;
        }
        .title {
          font-size: 28px;
          font-weight: 400;
          color: #fff;
        }
        .money {
          font-size: 34px;
          // font-weight: 600;
          color: rgba(255, 195, 109, 1);
          margin-top: 12px;
        }
        .c_r{
          color: red !important;
        }
        .c_g{
          color: #3CFCAC !important;
        }
      }
    }
  }
  .btn_famer {
    display: flex;
    height: 88px;
    font-size: 36px;
    margin-top: 33px;
    margin-bottom: 33px;
    .btn_left {
      width: 333px;
      background: rgba(60, 252, 172, 1);
      border-radius: 10px;
      margin-right: 24px;
    }
    .btn_right {
      width: 333px;
      background: rgba(255, 195, 109, 1);
      border-radius: 10px;
    }
    button{
      color: #333;
      font-size: 36px;
    }
  }
  #echarts {
    background: rgba(35, 35, 35, 1);
    border-radius: 10px;
    margin: 0 auto;
  }
  .top {
    display: flex;
    text-align: center;
    .topItem {
      width: 33.33%;
      height: 60px;
      line-height: 60px;
      margin-bottom: 20px;
      border: 1px solid #3cfcac;
    }
  }
  .addColor {
    background-color: #3cfcac;
    color: #fff;
  }
  >.bot{
    width: 120px;
    height: 120px;
    line-height: 120px;
    border-radius: 50%;
    background:rgba(60,252,172,1);
    box-shadow:0px 0px 16px 0px rgba(60,252,172,0.96);
    text-align: center;
    position: absolute;
    right: 55px;
    bottom: 55px;
    z-index: 10;
    font-size:32px;
  }
}
.ale{
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  .box{
    position: absolute;
    bottom: 0;
    width: 100%;
    button{
      width: 100%;
      height: 98px;
      background-color: #232323;
      font-size:36px;
      color:rgba(60,252,172,1);
      &:last-child{
        color: #FF3E3E;
        margin-top: 14px;
      }
      &:first-child{
        border-bottom: 1px solid #000;
      }
    }
  }
}
</style>
 
