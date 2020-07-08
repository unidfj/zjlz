<template>
  <div class="page">
    <m-header title="CBD" :canback="Boolean(1)"></m-header>
    <section class="body">
      <div class="top">
        {{money}} CBD
      </div>
      <div class="center">
        <div @click="choicePay">
          <span>{{value_}}</span>
          <i :class="{'iconfont':true,'icontubiaozhizuo-1':true,'icontubiaozhizuo-':false}"></i>
        </div>
        <div @click="cbd_list(sort!=1?1:2)">
          <span>时间</span>
          <i :class="{'iconfont':true,'icontubiaozhizuo-1':sort!=2,'icontubiaozhizuo-':sort==2}"></i>
        </div>
        <div  @click="cbd_list(sort!=3?3:4)">
          <span>金额</span>
          <i :class="{'iconfont':true,'icontubiaozhizuo-1':sort!=3,'icontubiaozhizuo-':sort!=4}"></i>
        </div>
      </div>
      <ul class="list"  :style="'height:'+(screenHeight-100)+'px;overflow:auto;'" v-lazy-load="lazyLoad">
        <li v-for="v in list" :key="v.id">
          <div>
            <!-- <p>{{String(v.remark).substring(0,4)}}</p> -->
            <p>{{String(v.bname)}}</p>
            <p>{{v.granttime}}</p>
          </div>
          <p>{{v.netincome>=0?'+':''}}{{v.netincome}}</p>
        </li>
      </ul>
    </section>
    <!-- <m-Footer></m-Footer> -->
    <m-load ref="load"></m-load>
  </div>
</template>
<script>
import {Trade} from '@/server/server.js';
import {Util,Load,Secret} from '@/assets/commonjs/utils.js';
import {mapGetters,mapMutations} from 'vuex';
export default {
  data(){
      return {
        img:require('@/assets/images/gzlz/banner.png'),
        list:[],
        bkey:null,
        sort:1,
        money:null,
        page:1,
        screenHeight:null,
        noMore:false,
        
        payPicker:new mui.PopPicker(),
        payList:[
            {
                value: '0',
                text: '全部',
            },
        ],
        value_:'全部',
        typeid:0,
      }
  },
  mounted() {
      this.initData();
      this.cbd_list();
      this.info();
      this.cbd_cate()
  },
  computed: {
    ...mapGetters(['uid','api','bannerSrc','coinTxt','proData'])
  },
  methods: {
    initData(){
      this.screenHeight = window.screen.height || window.screen.availHeight;
      this.bkey = this.$route.query.type;
    },
    // 类型
    cbd_cate(){
      Trade.cbd_cate().then(res=>{
        if(res.code==1){
          if(res.data){
            // this.value_ = res.data[0].bname;
            // this.typeid = res.data[0].id;
            res.data.forEach(v=>{
              this.payList.push({
                text:v.bname,
                value:v.id,
                key:v.bkey,
              })
            })
            setTimeout(()=>{
              this.payPicker.setData(this.payList);
            },200)
          }
        }else{
          mui.toast(res.msg)
        }
      })
    },
    lazyLoad(){
        this.page = this.page+1;
        if(!this.noMore){
            console.log('666')
            this.cbd_list(); 
        }
    },
    // 明细
    cbd_list(sort){
      if(this.sort!=sort&&sort){
        this.page = 1;
        this.list = [];
        this.sort = sort;
      }
      Trade.cbd_list({page:this.page,sort:this.sort,typeid:this.typeid}).then(res=>{
        if(res.code==1){
          this.sort = sort;
          // this.list = res.data;

          this.list = this.list.concat(res.data||[]);
          if(!res.data||res.data.length<10)
          this.noMore = true;
        }else{
          mui.toast(res.msg)
        }
      })
    },
    
    // 选择类别
    choicePay(){
        let _This = this;
        this.isDown = false;
        this.payPicker.show(function(items) {
            _This.value_=items[0].text;
            _This.typeid=items[0].value;
            
            _This.page = 1;
            _This.list = [];
            _This.cbd_list();
        })
    },
    
    // 获取个人信息
    info(){
        Trade.info().then(res=>{
            if(res.code==1){
                this.money = res.data.cbd_yue;
            }else{
                mui.toast(res.msg)
            }
        })
    },
    formatTime(time){
      return Util.formatTime(time).substr(0,5);
    },
  },
  beforeRouteLeave (to, from, next) {
    
    next();
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  line-height: 36px;
  background-color: @bg-color;
  .top{
    width: 690px;
    height: 200px;
    line-height: 200px;
    margin: 30px 30px 0;
    border-radius: 12px;
    font-size:60px;
    font-weight:500;
    color:rgba(255,195,109,1);
    background-image: url('../../assets/images/lz/20.png');
    background-size: 100% 100%;
    text-align: center;
  }
  .center{
    display: flex;
    justify-content: space-between;
    height: 104px;
    line-height: 104px;
    >div{
      padding: 0 30px;
      span{
        font-size:32px;
        font-weight:500;
        color:rgba(60,252,172,1);
      }
      >i{
        font-size: 30px;
        color:rgba(60,252,172,1);
        margin-left: 4px;
      }
    }
  }
  .list{
    margin: 0 30px 30px;
    li{
      width: 100%;
      padding: 25px 30px;
      border-radius: 10px;
      border:2px dashed rgba(60,252,172,1);
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      >div{
        p{
          font-size:30px;
          color:rgba(153,153,153,1);
          &:first-child{
            font-size:36px;
            font-weight:500;
            color:rgba(60,252,172,1);
            margin-bottom: 16px;
            margin-top: 8px;
          }
        }
      }
      >p{
        font-size:36px;
        font-weight:500;
        color:rgba(60,252,172,1);
        margin-top: 25px;
      }
    }
  }
}
.page{
  .rule{
    color: #3CFCAC;
  }
}
</style>

