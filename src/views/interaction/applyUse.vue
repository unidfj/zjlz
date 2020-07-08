<template>
  <div class="page">
    <m-header title="申请使用" :canback="Boolean(1)"></m-header>
    <section class="body">
      <div>
        <div class="upImg">
          <div class="upImg_text">上传故障图片：</div>
          <ul class="item_img">
            <li class="img" v-for="(item,index) in upladSrc" :key="index">
              <img class="img_icon" :src="api + item" alt />
              <div class="icon_icon_frame">
                <i class="iconfont iconuntitled44 icon_icon"></i>
                <div class="text">上传照片</div>
              </div>
              <input class="file" type="file" @change="change($event,index)" />
            </li>
          </ul>
        </div>
        <div class="text_describe">
          <div class="text">添加故障描述：</div>
          <textarea class="conent" v-model="textareaData"></textarea>
        </div>

        <div class="time">
          <div class="item_text">故障时间：</div>
          <div class="time_bot">
            
            <button
              data-options='{"type":"date"}'
              class="mui-btn mui-btn-block choiceTime"
            >{{timeData}}</button>
            <div>
              {{String(timeData).substring(0,4)}}
              <i class="iconfont icontubiaozhizuo-1"></i>
            </div>
            
            <span>年</span>
            <div>
              {{String(timeData).substring(5,7)}}
              
              <i class="iconfont icontubiaozhizuo-1"></i>
            </div>
            <span>月</span>
            
            <div>
              {{String(timeData).substring(8,10)}}
              <i class="iconfont icontubiaozhizuo-1"></i>
            </div>
            <span>日</span>
            
          </div>
        </div>

        <button class="btn" @click="btnClick">提交申請</button>
        <p style="opacity:0">{{num}}</p>
      </div>
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
      upladSrc: ['','',''],
      timeData: '2020-04-16',
      textareaData: null,
      num:0
    };
  },
  mounted() {
    let that = this;
    (function($) {
      $.init();
      var btns = $(".choiceTime");
      btns.each(function(i, choiceTime) {
        choiceTime.addEventListener(
          "tap",
          function() {
            var _self = this;
            if (_self.picker) {
              _self.picker.show(function(rs) {
                that.timeData = rs.text;
                _self.picker.dispose();
                _self.picker = null;
              });
            } else {
              var optionsJson = this.getAttribute("data-options") || "{}";

              var options = JSON.parse(optionsJson);
              var id = this.getAttribute("id");
              _self.picker = new $.DtPicker(options);
              _self.picker.show(function(rs) {
                that.timeData = rs.text;
                _self.picker.dispose();
                _self.picker = null;
              });
            }
          },
          false
        );
      });
    })(mui);
  },
  computed: {
    ...mapGetters(["api"])
  },
  methods: {
    change(event,i) {
      let _This = this;
      let formData = new FormData();
      Load.loadStart(_This);
      Util.uploadImgLimit(event.target.files[0], url => {
        formData.append("image", url);
        Base.upload(formData).then(res => {
          Load.loadEnd(_This);
          if (res.code == 1) {
            // this.upladSrc = [];
            // this.upladSrc.push(this.api + res.data);
            _This.upladSrc[i] = res.data;
            _This.num++;
            // _This.upladSrc.$set(i, res.data)
            // Vue.set(_This.upladSrc,i, res.data)
            // console.log('_This.upladSrc',_This.upladSrc)
          } else {
            mui.toast(res.msg);
            return;
          }
        });
      });
    },
    btnClick() {
      Init.clhzApply({
        images: this.upladSrc.toString(),
        desc: this.textareaData,
        date: this.timeData
      }).then(res => {
        if (res.code === 1) {
          mui.toast(res.msg);
          setTimeout(() => {
            this.$router.push({ name: "Interaction" });
          }, 500);
        } else {
          mui.toast(res.msg);
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
  .upImg {
    .upImg_text {
      height: 50px;
      font-size: 36px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 50px;
      margin-bottom: 24px;
    }
    .item_img {
      display: flex;
      .img {
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
        margin-left: 15px;
        &:first-child{
          margin-left: 0;
        }
        .img_icon {
          border-radius: 10px;
          position: absolute;
          width: 220px;
          height: 200px;          
          left: 0px;
        }
        .icon_icon_frame {
          margin-top: 50px;
          .icon_icon {
            font-size: 60px;
            color: #3CFCAC;
          }
          .text {
            margin-top: 30px;
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
    }
  }
  .text_describe {
    margin-top: 30px;
    .text {
      height: 50px;
      font-size: 36px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 50px;
      // margin-top: 43px;
    }
    .conent {
      margin-top: 24px;
      width: 100%;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(154, 154, 154, 1);
      line-height: 45px;
      height: 250px;
      padding: 27px 33px;
    }
  }
  .time {
    margin-top: 40px;
    // display: flex;
    width: 100%;
    // background-color: rgba(154, 154, 154, 1);

    // background: rgba(255, 255, 255, 1);
    border-radius: 10px;

    .item_text {
      font-size:36px;
      font-weight:500;
      color:rgba(255,255,255,1);
      margin-bottom: 24px;
    }
    .time_bot{
      height: 78px;
      line-height: 78px;
      >div{
        display: inline-block;
        background-color: #fff;
        width: 150px;
        border-radius: 12px;
        padding-left: 40px;
        position: relative;
        >i{
          position: absolute;
          top: 2px;
          right: 12px;
          font-size: 36px;
          color: #000;
        }
      }
      span{
        margin: 0 20px;
        color: #fff;
        font-size: 32px;
        &:last-child{
          margin-right: 0;
        }
      }
      .choiceTime{
        position: absolute;
        width: 100%;
        height: 78px;
        z-index: 99;
        opacity: 0;
      }
    }
    // .choiceTime {
    //   width: 60%;
    //   font-size: 32px;
    //   font-family: PingFangSC-Regular, PingFang SC;
    //   font-weight: 400;
    //   margin: 0;
    //   padding: 0;
    //   line-height: 80px;
    //   height: 80px;
    // }
  }
  .btn {
    width: 100%;
    height: 88px;
    line-height: 88px;
    text-align: center;
    background: rgba(60, 252, 172, 1);
    border-radius: 10px;
    margin-top: 66px;
    color: #333;
  }
}
</style>
 
