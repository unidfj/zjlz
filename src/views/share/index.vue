<template>
  <div class="page">
    <m-header title="共享停车">
      <span @click="rule_show = true">规则</span>
    </m-header>
    <section class="body">
      <div class="item">
        <div class="item_left">
          <div class="momey">我的共享停车余额：</div>
          <div class="num">{{dataObj.gxtc_cbd_yue}} CBD</div>
        </div>
        <div class="item_right"  @click="$router.push({name:'RechargeRar',query:{type:'share'}})">充值</div> 
       
      </div>

      <button class="btn"  @click="$router.push({name:'QueryDetails',query:{type:'share'}})">查询明细</button>
    </section>
    
    <div class="ale" v-show="rule_show">
      <div class="box">
        <div class="content" v-html="rule"></div>
        <button @click="rule_show = false">确认</button>
      </div>
    </div>
    <m-Footer></m-Footer>
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
      dataObj:{},
      rule:null,
      rule_show:false,
    };
  },
  mounted() {
     this.getUserIndex();
     this.gxtcrule();
  },
  computed: {},
  methods: {
    // 共享停车规则
    gxtcrule(){
      Init.gxtcrule().then(res=>{
        if(res.code==1){
          this.rule = res.data;
        }else{
          mui.toast(res.msg)
        }
      })
    },

    getUserIndex(){
      Init.userIndex().then(res=>{
        if(res.code===1){ 
          this.dataObj=res.data;
        }
      })
    },
 
    ruleClick() {
      mui.confirm("这是规定内容", "规则", function(e) {
        if (e.index == 1) {
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
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: url("../../assets/images/interaction.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border: 1px dashed rgb(150, 149, 149);
    .item_left {
      margin-left: 40px;
      flex: 1;
      .momey {
        margin-top: 60px;
        margin-bottom: 33px;
     
        height: 40px;
        font-size: 28px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
      }
      .num {
        
        height: 84px;
        font-size: 52px;
        // font-weight: 600;
        color: rgba(255, 195, 109, 1);
        line-height: 84px;
        margin-bottom: 58px;
      }
    }
    .item_right {
      width: 190px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      background: rgba(60, 252, 172, 1);
      border-radius: 10px;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(3, 3, 3, 1);
      margin-right: 80px;
    }
  }
  .btn {
    width: 100%;
    height: 88px;
    line-height: 88px;
    background: rgba(255, 195, 109, 1);
    border-radius: 10px;
    font-size: 36px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(3, 3, 3, 1);
    margin-top: 30px;
  }
}
.ale{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .8);
  // background-color: red;
  z-index: 99;
  .box{
    border-radius: 10px;
    background-color: #fff;
    width: 690px;
    padding: 20px 30px;
    margin: 200px 30px 0;
    max-height: 800px;
    // height: 800px;
    position: absolute;
    .content{
      overflow-y: scroll;
      max-height: 680px;
      /deep/ p{
        color: #333;
      }
    }
    button{
      width: 100%;
      height: 88px;
      background-color: #3cfcac;
      color: #333;
      // margin-top: 30px;
      bottom: 0;
    }
  }
}
</style>
 
