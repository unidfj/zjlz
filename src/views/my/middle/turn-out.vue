<template>
  <div class="page">
    <m-header :title="setTitle(type)" :canback="Boolean(1)">
      <i v-if="type == 'credit3'" @click="extractRecord()">提取记录</i>
    </m-header>
    <div class="tips" v-if="type=='credit1'">{{coinTxt&&coinTxt[type+'_text']}}一但转赠，不可退还</div>
    <div class="body">
      <form v-if="type=='credit1'">
        <ul>
          <li class="list">
            <div class="title">数量</div>
            <input type="number" class="inp" v-model="formData.money" placeholder="请输入转赠数量">
          </li>
          <li class="list">
            <div class="title">对方手机</div>
            <input type="number" class="inp" v-model="formData.mobile" placeholder="对方手机" oninput="if(value.length>11)value=value.slice(0,11)">
          </li>
          <li class="list">
            <div class="title">交易密码</div>
            <input type="password" class="inp" v-model="formData.paypwd" placeholder="交易密码" maxlength="6">
          </li>
        </ul>
        <div class="sub" @click="confirm()">确定转赠</div>
      </form>
      <form v-else>
        <ul>
          <li class="list">
            <div class="title">出售收益</div>
            <input type="number" class="inp" v-model="num" placeholder="请输入出售收益">
          </li>
          <li class="list">
            <div class="title">级别</div>
            <input type="text" class="inp" v-model="level" placeholder="无" readonly >
          </li>
          <li class="list">
            <div class="title">交易密码</div>
            <input type="password" class="inp" v-model="paypwd" placeholder="交易密码" maxlength="6">
          </li>
        </ul>
        <div class="sub" @click="confirm()">确认出售</div>
      </form>
    </div>
    <m-pwd ref="pwd"></m-pwd>
  </div>
</template>
<script>
import { Owner } from "@/server/server.js";
import {mapGetters} from 'vuex';
import mPwd from '@/components/pwd-alert.vue';
import {Util,Load,Secret} from '@/assets/commonjs/utils.js';
export default {
  components:{
    mPwd
  },
  data() {
    return {
      payPicker:new mui.PopPicker(),
      formData:{
        money:null,
        mobile:null,
        id:null,
        paypwd:null
      },
      num:null,
      level:null,
      paypwd:null,
      levelArr:null,
      maxPrice:null,
      flag:true,
      type:null
    };
  },
  mounted(){
    this.initData();
    this.sellLog();
    // console.log(this.setLevel(100))
  },
  computed:{
      ...mapGetters(['uid','coinTxt'])
  },
  watch:{
    num(value){
      if(value>Number(this.maxPrice)){
        mui.toast('当前出售的最大值为：'+this.maxPrice);
        this.flag = false;
      }else {
        this.flag = true;
      }
      this.level = this.setLevel(value);
    }
  },
  methods: {
    initData(){
      this.type = this.$route.query.type;
      this.$store.commit('saveTemp',null);
    //   this.payPicker.setData([
    //     {
    //       value:'1',
    //       text:'普通登记'
    //     }
    //   ])
    },
    confirm() {
// console.log(this.formData)
// return ;
      if(this.type == 'credit1'){
        let params = Object.assign({},this.formData,{id:this.uid});
        let msg = Util.isValidate(params);
        if(msg){
            mui.toast(msg);
            return;
        }
        if(this.formData.money<=0){
            mui.toast('转赠数量要大于0！');
            return ;
        }
        Owner.getTransfer(params).then(res=>{
            if(res.code == 1){
              mui.toast(res.msg);
              setTimeout(() => {
                this.$router.go(-1);
              }, 1000);
            }else {
              mui.toast(res.msg);
              return ;
            }
        });
      }else {
// console.log(111111111111);return ;
        let params = {num:this.num,paypwd:this.paypwd};
        if(!this.num){
          mui.toast('请输入出售数量！');
          return ;
        }else if(this.num<=0){
          mui.toast('出售数量要大于0！');
          return ;
        }
        let msg = Util.isValidate(params);
        if(msg){
            mui.toast(msg);
            return;
        }
        if(this.flag){
// console.log(params);return ;
          Owner.setSell(params).then(res=>{
            if(res.code == 1){
                mui.toast(res.msg);
                setTimeout(() => {
                    this.num = null;
                }, 1000);
            }else{
              mui.toast(res.msg);
              return;
            }
          })

        }else {
          mui.toast('当前出售的最大值为：'+this.maxPrice);
          return ;
        }
      }
    },
    setTitle(type){
        switch(type){
            case 'credit1':
                return this.coinTxt[type+'_text']+'转赠' ;
                break;
            case 'credit3':
                return this.coinTxt[type+'_text']+'出售' ;
                break;
        }
    },
    // 选择级别 ！！！遗弃！！！
    choiceLevel(){
        let _This = this;
        this.payPicker.show(function(items) {
console.log(items)
        });
    },
    sellLog(){
      Owner.sellLog().then(res=>{
        if(res.code == 1){
          if(res.data){
            let decryptData = JSON.parse(Secret.decrypt(res.data));
            this.levelArr = decryptData.level;
            this.maxPrice = decryptData.max_price.max_price;
          }
        }
      })
    },
    setLevel(num){
        let [levelArr,name] = [this.levelArr,null];
        if(levelArr)
        for(let i = 0;i<levelArr.length;i++){
          if((Number(levelArr[i].min_price)<num ||Number(levelArr[i].min_price)==num) && (num<Number(levelArr[i].max_price) ||num<Number(levelArr[i].max_price))){
              name = levelArr[i].levelname;
              break;
          }
        }
        return name;
    },
    // 出售记录
    extractRecord(){
      this.$router.push({name:'ExtractRecord',query:{type:this.type}})
    },
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.page {
  background: @bg-color;
  .tips {
    padding: 10px 30px;
    background: @bg-color;
    color: red;
  }
  .body {
    padding: 0 30px 30px;
    color: #dbd9ec;

    .list {
      position: relative;
      margin-top: 29px;
      .inp {
        margin-top: 15px;
        margin-bottom: 0;
        height: auto;
        background: @easy-black;
      }
    }
    .sub {
      margin-top: 130px;
      height: 88px;
      line-height: 88px;
      text-align: center;
      color: @bg-color-white;
      font-size: 32px;
      background: @btn-primary-color;
      border-radius: 8px;
    }
  }
}
</style>
