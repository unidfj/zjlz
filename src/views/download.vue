<template>
  <div class="content">
    <m-header title="下载 App" :canback="Boolean(1)"></m-header>
    <!-- <template v-show='isShow'>
      <div class="logo_content">
        <img class="icon" :src="icon" :alt="app_name" v-show='icon'>
        <p class="app_name" v-text="app_name"></p>
        <p class="app_version">版本号：{{app_version}}</p>
      </div>
      <div class="download">
        <a :href="app_package" download>
          <div class="android">安卓下载</div>
          <p class="size">大小：{{package_size}}</p>
        </a>
      </div>
      <div class="qrcode" v-show='app_ios_qrcode'>
        <div class="title">iOS 下载</div>
        <img :src="qrCodeSrc" alt="">
        <p>扫描二维码下载</p>
      </div>
      <div class="donwload_bg" v-if='wechat' @click='wechat=false'>
        <img class="txt" src='../assets/images/wechat_txt.png' />
        <img class="btn" src='../assets/images/wechat_btn.png' />
      </div>
    </template>-->

    <ul class="item_ul">
      <li class="item_li_ad">
        <img class="ad_img" :src="icon" alt />
        <button class="AdBtn" @click="goTo(0)">安卓点击下载</button>
      </li>
       <li class="item_li_ad">
        <img class="ad_img" :src="api+app_ios_qrcode" alt />
        <button class="AdBtn">IOS 扫码下载</button>
      </li>
    </ul>
  </div>
</template>
<script>
import { Base } from "@/server/server.js";
import { mapGetters } from "vuex";
import { Util } from "@/assets/commonjs/utils.js";

export default {
  name: "conputer",
  data() {
    return {
      isShow: true,
      app_name: "app_name",
      icon: "",
      app_version: "1.0.0",
      app_package: "app_package",
      package_size: "0M",
      app_ios_qrcode: "",
      wechat: false
    };
  },
  mounted() {
    this._init();
  },
  computed: {
    qrCodeSrc() {
      return this.api + this.app_ios_qrcode;
    },
    ...mapGetters(["api"])
  },
  methods: {
    _init() {
      this.wechat = Util.isWechat();
      Base.getDownload()
        .then(res => {
          this.isShow = true;
          console.log(res);
          if (res.code == 1) {
            this.app_name = res.data.app_name;
            this.icon = this.api + res.data.icon;
            this.app_version = res.data.app_version;
            this.app_package = this.api + res.data.app_package;
            this.package_size = res.data.package_size;
            this.app_ios_qrcode = res.data.app_ios_qrcode;
          } else {
            mui.toast(res.msg);
          }
        })
        .catch(err => {
          mui.toast("网络错误");
        });
    },
    goTo(v){
      switch(+v){
        case 0:
          location.href = this.app_package;
      }
    }
  }
};
</script>

<style scoped lang="less">
@import "~link-less";

.content {
  width: 100%;
  height: 100%;
  text-align: center;
  overflow-y: auto; 
  .item_ul {
    padding: 0 84px;
    .item_li_ad {
      margin-top: 84px;
      .ad_img {
        width: 300px;
        height: 300px;
        border: 2px dashed rgba(60, 252, 172, 1);
        padding: 22px;
      }
      .AdBtn {
        width: 100%;
        height: 88px;
        background: rgba(60, 252, 172, 1);
        border-radius: 10px; 
        font-size: 36px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(3, 3, 3, 1);
        line-height: 88px;
        margin-top: 60px;
      }
    }
  }
}

// .content {
//   width: 100%;
//   height: 100%;
//   text-align: center;
//   overflow-y: auto;
//   // background: #fff;
// }
// img, a {
//   display: block;
// }
// .logo_content {
//   width: 50%;
//   padding-top: 60px;
//   margin: 0 auto 60px;
//   .icon {
//     width: 80%;
//     margin: 0 auto;
//   }
//   .app_name {
//     font-size: 40px;
//     margin: 20px 0 10px;
//   }
//   .app_version {
//     font-size: 18px;
//   }
// }
// .download {
//   a {
//     width: 452px;
//     height: 100px;
//     background: #78bc43;
//     border-radius: 16px;
//     margin: 0 auto;
//     color: #fff;
//     font-size: 32px;
//     display: flex;
//     flex-direction: column;
//     margin-bottom: 40px;;
//   }
//   .android {
//     flex: 1.5;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
//   .size {
//     flex: 1;
//     color: #fff;
//     font-size: 20px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
// }
// .donwload_bg {
//   position: fixed;
//   left: 0;
//   top: 40PX;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0,0,0,.9);
//   .btn {
//     position: absolute;
//     right: 30px;
//     top: 30px;
//     width: 135px;
//     height: 98px;
//   }
//   .txt {
//     position: absolute;
//     top: 100px;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 378px;
//     height: 186px;
//   }
// }
// .qrcode {
//   width: 95%;
//   margin: 0 auto;
//   // border-top: 1px solid #ddd;
//   .title {
//     border-left: 6px solid #89b843;
//     font-size: 26px;
//     line-height: 1.5;
//     text-align: left;
//     text-indent: 15px;
//     margin-top: 20px;;
//     color: #fff;
//   }
//   p {
//     line-height: 1.5;
//     color: #fff;
//     font-size: 24px;
//   }
//   img {
//     display: block;
//     margin: 20px auto 10px;
//     max-width: 50%;;
//   }
// }
</style >