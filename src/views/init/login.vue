<template>
  <div class="page">
    <m-header :title="value==1?'登录':'注册'"></m-header>

    <section class="body">
      <div class="img_box">
        <img class="logo" :src="proData&&api+proData.login_logo" alt="">
        <!-- <img class="logo" src="../../assets/images/touxiang.png" alt /> -->
      </div>

      <div class="login_frame">
        <div class="form">
          <ul class="form_title">
            <li
              v-for="item in loginList"
              :key="item.lable"
              @click="choiceClcik(item.value)"
              :class="{'denglu':true,'activeClick':value==item.value}"
            >{{item.lable}}</li>
          </ul>
          <div v-show="isShow=='1'">
            <div class="form_item">
              <!-- <label for="name">手机号</label> -->
              <img class="icon_icon" :src="img33" alt />
              <input
                class="inputWidth"
                type="text"
                placeholder="请输入手机号"
                v-model="formData.account"
                oninput="if(value.length>11)value=value.slice(0,11)"
                @keyup.enter="login"
              />
            </div>
            <div class="form_item">
              <img class="icon_icon" :src="img34" alt />
              <!-- <label for="name">密码</label> -->
              <input
                class="inputWidth"
                type="password"
                placeholder="6-15位（不能全是数字或字母）"
                v-model="formData.password"
                @keyup.enter="login"
              />
            </div>
            <!-- <div class="form_item">
            <label for="name">图形验证码</label>
            <div class="item-flex code">
              <input type="text" placeholder="请输入图中的验证码" v-model="formData.captcha" maxlength="4" />
              <img
                class="btn img-code"
                :src="api+'/api/Captcha/get?identifier='+randomCode"
                alt
                @click="getRandom()"
              />
            </div>
            </div>-->
            <div class="service">
              <p class="title" @click="choiceClcik(2)">立即注册</p>
              <p class="title" @click="backPwd">忘记密码</p>
            </div>
            <button type="button" class="login_btn" @click="login">登录</button>
            <button type="button" class="dwon_btn" @click="goToDownload">下载 App</button>
          </div>

          <!-- 注册模块 -->
          <div v-show="isShow=='2'">
            <ul class="ul_li">
              <li class="item_li">
                <img class="icon_icon" :src="img31" alt />
                <input class="input_li" v-model="registerData.username" disabled type="text" placeholder="请输入会员编号" />
              </li>
              <li class="item_li">
                <img class="icon_icon" :src="img32" alt />
                <input class="input_li" v-model="registerData.nickname" type="text" placeholder="请输入用户姓名" />
              </li>
              <li class="item_li">
                <img class="icon_icon" :src="img33" alt />
                <input class="input_li"  
                oninput="if(value.length>11)value=value.slice(0,11)" 
                v-model="registerData.mobile" type="text" 
                placeholder="请输入手机号" />
              </li>
              <li class="item_li">
                <img class="icon_icon" :src="img34" alt />
                <input class="input_li" v-model="registerData.password" type="password" placeholder="请输入登录密码" />
              </li>
              <!-- <li class="item_li">
                <img class="icon_icon" :src="img35" alt />
                <input class="input_li" v-model="registerData.password" type="password" placeholder="请输入交易密码" />
              </li> -->
              <li class="item_li">
                <img class="icon_icon" :src="img36" alt />
                <input class="input_li" v-model="registerData.tjname" type="text" placeholder="请输入推荐人编号" />
              </li>
              <li class="item_li">
                <img class="icon_icon" :src="img37" alt />
                <input class="input_li" v-model="registerData.captcha" type="text" maxlength="4" placeholder="请输入验证码" />
                <div
                  @click="getCode"
                  :disabled="seconds>0"
                  class="item_li_time"
                >{{seconds==0?'点击发送':+seconds+" 秒"}}</div>
              </li>
              <!-- <button
                id="showCityPicker3"
                class="mui-btn mui-btn-block city_style"
                type="button"
              >{{city}}</button>-->

              <div class="city">
                <!-- <div class="city_text">选择城市:</div> -->
                <button
                  id="showCityPicker3"
                  class="mui-btn mui-btn-block city_style"
                  type="button"
                >{{cityAll}}</button>
                
                <!-- <div class="time_bot">
                  <button
                    id="showCityPicker3"
                    class="mui-btn mui-btn-block city_style"
                    type="button"
                  >{{cityAll}}</button>
                  <div>
                    {{String(cityAll).substring(0,4)}}
                    <i class="iconfont icontubiaozhizuo-1"></i>
                  </div>
                  
                  <span>省</span>
                  <div>
                    {{String(cityAll).substring(5,7)}}
                    
                    <i class="iconfont icontubiaozhizuo-1"></i>
                  </div>
                  <span>市</span>
                  
                  <div>
                    {{String(cityAll).substring(8,10)}}
                    <i class="iconfont icontubiaozhizuo-1"></i>
                  </div>
                  <span>区</span>
                  
                </div> -->

              </div>
              
              <button class="chuze" @click="register">立即注册</button>
            </ul>
          </div>
        </div>
        <!-- <p class="other"><a @click="toScan">扫一扫注册</a> <a @click="backPwd">找回密码</a></p> -->
        <!-- <p class="other">
          <a @click="actionSheet">{{isApp?'扫一扫注册':''}}</a>
          <a @click="backPwd">找回密码</a>
        </p>
        <button type="button" class="btn-submit btn-download" @click="goToDownload">下载 App</button>-->
      </div>
    </section>
    <m-load ref="load"></m-load>
  </div>
</template>
<script>
import { Init, Base } from "@/server/server.js";
import { Util, Load, HB, Secret } from "@/assets/commonjs/utils.js";
import { cityData } from "@/assets/commonjs/city.js";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      formData: {
        account: null,
        password: null,
        identifier: null,
        captcha: null
      },
      imgCode: null,
      randomCode: null,
      barcode: null,
      scan: null,
      isApp: false,

      loginList: [
        {
          value: "1",
          lable: "登录"
        },
        {
          value: "2",
          lable: "注册"
        }
      ],
      value: "1",
      isShow: "1",
      cityData: null,
      cityAll: "请选择城市",
      seconds: 0,
      registerData:{
        mobile: null, //手机号码
        password: null, //密码
        username: null, //会员编号
        nickname: null, //用户姓名
        captcha: null, //验证码
        tjname: null, //推荐人编号
        province: null, //省
        city: null, //市
        area: null, //区
        // is_test: 1 //是否加密
      },
      img31:require('@/assets/images/lz/31.png'),
      img32:require('@/assets/images/lz/32.png'),
      img33:require('@/assets/images/lz/33.png'),
      img34:require('@/assets/images/lz/34.png'),
      img35:require('@/assets/images/lz/35.png'),
      img36:require('@/assets/images/lz/36.png'),
      img37:require('@/assets/images/lz/37.png'),
      rule:{
        isMobile:{
          validate:true,
          msg:'请输入正确的手机号'
        },
        isPwd:{
          validate:true,
          msg:'密码应为6-15位字母+数字'
        },
        conFirmL:{
          validate:true,
          msg:'两次输入密码不一致！'
        },
        conFirmP:{
          validate:true,
          msg:'两次输入密码不一致！'
        },
      },

    };
  },
  mounted() {
    this.initData();
    this.getgetUsernameData();
    // this.getRandom();
    // this.getData();
    if (cityData && cityData.cityData) {
      this.cityData = cityData && cityData.cityData;
    }
    (function($, doc, cityData, that) {
      $.init();
      $.ready(function() {
        var _getParam = function(obj, param) {
          return obj[param] || "";
        };
        //					//级联示例
        var cityPicker3 = new $.PopPicker({
          layer: 3
        });
        cityPicker3.setData(cityData);
        var showCityPickerButton = doc.getElementById("showCityPicker3");
        var cityResult3 = doc.getElementById("cityResult3");
        showCityPickerButton.addEventListener(
          "tap",
          function(event) {
            cityPicker3.show(function(items) {
              (that.registerData.province = _getParam(items[0], "text")),
                (that.registerData.city = _getParam(items[1], "text")),
                (that.registerData.area = _getParam(items[2], "text")),
                (that.cityAll =
                  _getParam(items[0], "text") +
                  " " +
                  _getParam(items[1], "text") +
                  " " +
                  _getParam(items[2], "text"));
              //返回 false 可以阻止选择框的关闭
              //return false;
            });
          },
          false
        );
      });
    })(mui, document, this.cityData, this);
  },
  computed: {
    ...mapGetters(["api", "proData"])
  },
  methods: {
    ...mapMutations(["saveProData", "saveUserID", "saveUserInfo"]),
    initData() {
      if(this.$route.query.username){
        this.registerData.tjname = this.$route.query.username;
        this.choiceClcik('2')
        console.log('666')
      }
      mui.init({
        swipeBack: true //启用右滑关闭功能
      });
      try {
        if (plus) {
          this.isApp = true;
        }
      } catch (e) {}
    },
    getgetUsernameData() {
      Init.getUsername().then(res => { 
        if(res.code==1){
           this.registerData.username=res.data
        }
      });
    },
    register() { 
      if(!this.rule.isMobile.validate){
        mui.toast('手机号格式不正确！');
        return;
      }
      Init.register(this.registerData).then(res => { 
        if (res.code == 1) {
            mui.toast(res.msg)
            setTimeout(() => {
               this.registerData={};
               this.value='1';
               this.isShow='1';
            }, 500);
        }else{
            mui.toast(res.msg)
        }
      });
    },

    choiceClcik(e) {
      this.value = e;
      this.isShow = e;
    },
    /**
     * 找回密码
     */
    backPwd() {
      this.$router.push({ name: "BackPwd" });
    },
    // 发送验证码
    getCode() {
      this.seconds = 60;
      if(!this.registerData.mobile){
        mui.toast('请输入手机号码！')
        return;
      }
      let get = setInterval(() => {
        this.$nextTick(() => {
          this.seconds = this.seconds - 1;
          if (this.seconds <= 0) {
            clearInterval(get);
          }
        });
      }, 1000);
      // return ;
      // 发送验证码
      Base.sendCode({ mobile: this.registerData.mobile, event: "register" }).then(
        res => {
          if (res.code == 1) {
            mui.toast(res.msg);
          } else {
            mui.toast(res.msg);
          }
        }
      );
    },
    /**
     * 登录
     */
    login() {
      let params = this.formData;
      // console.log(params);
      // return ;
      let msg = Util.isValidate(params);
      if (msg) {
        mui.toast(msg);
        return;
      }
      Load.loadStart(this);
      Init.login(params).then(res => {
        mui.toast(res.msg);
        if (res.code == 1) {
          let InfoData = JSON.parse(Secret.decrypt(res.data));

          // localStorage.setItem('user_id',res.data.id);
          this.saveUserInfo(InfoData);
          this.saveUserID(InfoData.id);
          localStorage.setItem("userInfo", res.data);
          localStorage.setItem("cookie", InfoData.token);
          setTimeout(() => {
            Load.loadEnd(this);
            this.$router.replace({ name: "index" });
          }, 500);
        } else {
          setTimeout(() => {
            Load.loadEnd(this);
            return;
          }, 500);
        }
      });
    },
    /**
     * 扫码选项  相机 相册
     */
    actionSheet() {
      let _this = this;
      try {
        plus.nativeUI.actionSheet(
          {
            // title:"Plus is ready!",
            cancel: "取消",
            buttons: [
              {
                title: "相机"
              },
              {
                title: "相册"
              }
            ]
          },
          function(e) {
            console.log("User pressed: " + e.index);
            if (e.index == 1) {
              _this.toScan();
            } else {
              _this.selectGallery();
            }
          }
        );
      } catch (e) {}
    },
    /**
     * 随机标识key
     */
    getRandom() {
      let random1 = parseInt(Math.random(0, 1) * 100000000);
      let random2 = parseInt(Math.random(0, 1) * 100000000);
      let str = "abcdd";
      // return  random1+'abcdd'+random2;
      this.randomCode =
        random1 + "abcdd" + random2 + "-" + new Date().getTime();
      this.formData.identifier = this.randomCode;
    },
    /**
     * 相册扫码
     */
    selectGallery() {
      let _This = this;
      HB.picForGallery(_This, res => {
        Load.loadStart(_This);
        plus.downloader
          .createDownload(
            _This.api + res,
            { filename: "_doc/images/" },
            function(d, status) {
              if (status == 200) {
                plus.barcode.scan(
                  d.filename,
                  function(type, result) {
                    Load.loadEnd(_This);
                    plus.nativeUI.confirm("确定跳转?", function(e) {
                      if (e.index == 0) {
                        plus.runtime.openURL(JSON.parse(result));
                      }
                    });
                  },
                  function(e) {
                    console.log("Scan failed: " + JSON.stringify(e));
                  }
                );
              } else {
                console.log("下载图片文件失败！");
              }
              plus.nativeUI.closeWaiting();
            }
          )
          .start();
      });
    },
    /**
     * 相机扫码
     */
    toScan() {
      let _This = this;
      if (!this.barcode) {
        this.barcode = plus.barcode.create("barcode", [plus.barcode.QR], {
          top: "100px",
          left: "0px",
          width: "100%",
          height: "500px",
          position: "static"
        });
        this.barcode.onmarked = _This.onmarked;
        plus.webview.currentWebview().append(this.barcode);
      }
      this.barcode.start();
      // this.scan = new plus.barcode.Barcode('bcid');
      // this.scan.onmarked = this.onmarked();
      // this.scan.start();
    },
    /**
     * 扫码回调
     */
    onmarked(type, result) {
      var text = "未知: ";
      switch (type) {
        case plus.barcode.QR:
          text = "QR: ";
          break;
        case plus.barcode.EAN13:
          text = "EAN13: ";
          break;
        case plus.barcode.EAN8:
          text = "EAN8: ";
          break;
      }
      if (result) {
        // alert( text+result );
        this.barcode.close();
        try {
          if (plus) {
            mui.confirm("确定跳转", actions => {
              if (actions.index == 0) plus.runtime.openURL(result);
            });
          }
        } catch (e) {
          mui.confirm("确定跳转", actions => {
            if (actions.index == 1) plus.runtime.openURL(result);
          });
        }
      }
    },
    
    IsMobilePhoneNumber(event) {
      // var regex = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/;
      var regex = /^1[3-9]\d{9}$/;
      if (event.target.value.match(regex)) {
        this.rule.isMobile.validate = true;
      } else {
        this.rule.isMobile.validate = false;   
        mui.toast('手机号格式不正确')         
      }
    },
    /**
     * 下载
     */
    goToDownload() {
      this.$router.push({ name: "Download" });
    },
    async getData() {
      await Base.getData().then(res => {
        if (res.code == 1) {
          this.saveProData(res.data);
          localStorage.setItem("proData", JSON.stringify(res.data));
        } else mui.toast(res.msg || "加载项目信息失败！");
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "~link-less";
.body {
  background-color: @bg-color;
  .img_box {
    width: 100%;
    height: 280px;
    .logo {
      // width: 100%;
      width: 230px;
      margin: 30px 260px;
    }
  }
  .login_frame {
    .form {
      width: 650px;
      background: rgba(35, 35, 35, 1);
      border-radius: 10px;
      border: 2px dashed rgba(60, 252, 172, 1);
      margin: 0px auto;
      margin-top: 40px;
      margin-bottom: 90px;
      padding: 40px 50px;
      .form_title {
        display: flex;
        justify-content: center;
        .denglu {
          font-size: 36px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          line-height: 50px;
          padding: 21px 29px;
          color: #fff;
          margin-bottom: 30px;
          &:last-child{
            margin-left: 60px;
          }
        }
        .activeClick {
          color: rgba(60, 252, 172, 1) !important;
          border-bottom: 1px solid rgba(60, 252, 172, 1);
        }
      }
      .form_item {
        align-items: center;
        margin-top: 30px;
        position: relative;
        .inputWidth {
          padding-left: 80px;
        }
        input {
          margin: 0;
        }
        .icon_icon {
          width: 30px;
          // margin-left: 14px;
          // margin-top: 16px;
          position: absolute;
          top: 20px;
          left: 20px;
        }
      }
      .service {
        display: flex;
        justify-content: space-between;
        .title {
          height: 33px;
          font-size: 24px;
          color: rgba(60, 252, 172, 1);
          margin-top: 20px;
        }
      }
      .login_btn {
        width: 100%;
        height: 88px;
        background: rgba(60, 252, 172, 1);
        border-radius: 10px;
        font-size: 30px;
        color: rgba(3, 3, 3, 1);
        margin-top: 40px;
      }
      .dwon_btn {
        width: 100%;
        height: 88px;
        background: rgba(255, 195, 109, 1);
        border-radius: 10px;
        line-height: 88px;
        font-size: 30px;
        color: rgba(3, 3, 3, 1);
        margin-top: 30px;
      }
      .ul_li {
        margin-top: 50px;
        .item_li {
          display: flex;
          position: relative;
          .icon_icon {
            // width: 50px;
            max-width: 50px;
            max-height: 66px;
            position: absolute;
            left: 24px;
            top: 20px;
            // top: calc(50% - 25px);
          }
          .input_li {
            height: 98px;
            background: rgba(255, 255, 255, 1);
            border-radius: 10px;
            padding-left: 100px;
          }
          .item_li_time {
            position: absolute;
            right: 30px;
            color: #FF3E3E;
            font-size: 28px;
            top: 30px;
          }
        }
        .chuze {
          margin-top: 40px;
          width: 100%;
          height: 88px;
          background: rgba(60, 252, 172, 1);
          border-radius: 10px;
          font-size: 30px;
          color: rgba(3, 3, 3, 1);
        }
        .city {
          display: flex;
          width: 100%;
          height: 78px;
          position: relative;
          // background-color: rgba(154, 154, 154, 1);
          // text-align: center;
          // background: rgba(255, 255, 255, 1);
          // border-radius: 10px;
          .city_style {
            // width: 486px !important;
            height: 78px;
            line-height: 78px;
            padding: 0;
            font-size: 32px;
            position: absolute;
            top: 0;
            left: 0;
            // opacity: 0;
            z-index: 999;

          }
          .time_bot{
            height: 78px;
            line-height: 78px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            >div{
              display: inline-block;
              background-color: #fff;
              width: 118px;
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
        }
      }
    }
  }
}
</style >

