<template>
    <div class="page">
        <!-- <m-header :title="proData &&proData.home_bottom_nav[1].name ||'我的'">
        </m-header> -->
        <section class="body">
            <div class="info">
                <!-- <img :src="img" alt="" class="logo"> -->
                <img :src="userInfo.avatar" alt="" class="logo">
                <div class="center">
                    <p>昵称：{{userInfo.nickname}}</p>
                    <!-- <p>用户编号：{{userInfo.username}}</p> -->
                    <p>手机号：{{userInfo.mobile}}</p>
                    <p>等级：{{userInfo.level}}</p>
                </div>
                <div class="right" @click="$router.push({name:'Chi'})">
                    <!-- <i class="iconfont iconcart"></i> -->
                    <img :src="img19" alt="">
                    <p>共燚权益</p>
                </div>
            </div>

            <ul class="message">
                <li v-for="(v,i) in message_list" :key="i" @click="$router.push({name:v.route})">
                    <!-- <i :class="v.icon"></i> -->
                    <img :src="v.src" alt="">
                    <p>{{v.value}}</p>
                    <p>{{v.title}}</p>
                </li>
            </ul>

            <div class="list">
                <p>
                    <span>我的交易</span>
                    <!-- <span>查看全部交易</span> -->
                </p>
                <ul>
                    <li v-for="(v,i) in transactionList" :key="i" @click="$router.push({name:v.route,query:{status:v.status}})">
                        <!-- <i class="iconfont iconcart"></i> -->
                        <img :src="v.src" alt="">
                        <p>{{v.name}}</p>
                    </li>
                </ul>
            </div>

            <div class="list">
                <p>
                    <span>我的商品订单</span>
                    <span @click="toOrder(0)">查看全部订单</span>
                </p>
                <ul>
                    <li v-for="(v,i) in orderList" :key="i" @click="toOrder(i+1)">
                        <!-- <i class="iconfont iconcart"></i> -->
                        <img :src="v.src" alt="">
                        <p>{{v.name}}</p>
                    </li>
                </ul>
            </div>

            <div class="list">
                <p>
                    <span>基本信息</span>
                    <!-- <span>查看全部交易</span> -->
                </p>
                <ul>
                    <li v-for="(v,i) in menuList" :key="i" @click="goTo(v.route)">
                        <img :src="v.src" alt="">
                        <p>{{v.name}}</p>
                    </li>
                </ul>
            </div>
            
            <button class="quit" @click="toQuit">退出登录</button>
        </section>
        <m-load ref="load"></m-load>
        <m-Footer></m-Footer>
    </div>
</template>
<script>
import {mapGetters,mapMutations} from 'vuex';
import {Base,Owner,Init,Trade} from '@/server/server.js';
import {Secret,Load } from '@/assets/commonjs/utils.js';
export default {
    name:'my',
    data(){
        return {
            img:require('@/assets/images/gzlz/banner.png'),
            img19:require('@/assets/images/lz/19.png'),
            message_list:[
                {
                    src:require('@/assets/images/lz/22.png'),
                    icon:'iconfont iconcart',
                    value:null,
                    title:'车联互助',
                    route:'',
                },
                {
                    src:require('@/assets/images/lz/23.png'),
                    icon:'iconfont iconcart',
                    value:null,
                    title:'CBD',
                    route:'CBD',
                },
                {
                    src:require('@/assets/images/lz/24.png'),
                    icon:'iconfont iconcart',
                    value:null,
                    title:'共享停车',
                    route:'',
                },
            ],
            transactionList:[
                {
                    src:require('@/assets/images/lz/01.png'),
                    name:'已创建',
                    status:1,
                    route:'myOrder'
                },
                {
                    src:require('@/assets/images/lz/02.png'),
                    name:'待付款',
                    status:2,
                    route:'myOrder'
                },
                {
                    src:require('@/assets/images/lz/03.png'),
                    name:'待确认',
                    status:3,
                    route:'myOrder'
                },
                {
                    src:require('@/assets/images/lz/04.png'),
                    name:'已完成',
                    status:4,
                    route:'myOrder'
                },
                {
                    src:require('@/assets/images/lz/05.png'),
                    name:'已取消',
                    status:20,
                    route:'myOrder'
                },
            ],
            orderList:[
                {
                    src:require('@/assets/images/lz/06.png'),
                    name:'待付款',
                    route:''
                },
                {
                    src:require('@/assets/images/lz/07.png'),
                    name:'待发货',
                    route:''
                },
                {
                    src:require('@/assets/images/lz/08.png'),
                    name:'待收货',
                    route:''
                },
                {
                    src:require('@/assets/images/lz/09.png'),
                    name:'已完成',
                    route:''
                },
                {
                    src:require('@/assets/images/lz/10.png'),
                    name:'退换货',
                    route:''
                },
            ],
            menuList:[
                {
                    src:require('@/assets/images/lz/11.png'),
                    name:'实名验证',
                    route:'Certify'
                },
                {
                    src:require('@/assets/images/lz/12.png'),
                    name:'我的团队',
                    route:'Team'
                },
                {
                    src:require('@/assets/images/lz/13.png'),
                    name:'邀请好友',
                    route:'Invite'
                },
                {
                    src:require('@/assets/images/lz/14.png'),
                    name:'地址管理',
                    route:'Address'
                },
                {
                    src:require('@/assets/images/lz/15.png'),
                    name:'联系客服',
                    route:''
                },
                {
                    src:require('@/assets/images/lz/16.png'),
                    name:'商品收藏',
                    route:'Collection'
                },
                {
                    src:require('@/assets/images/lz/27.png'),
                    name:'购物车',
                    route:'Cart'
                },
                {
                    src:require('@/assets/images/lz/17.png'),
                    name:'收款账户',
                    route:'PayInfo'
                },
                {
                    src:require('@/assets/images/lz/18.png'),
                    name:'其它设置',
                    route:'Set'
                },
                {
                    src:require('@/assets/images/lz/23.png'),
                    name:'CBD明细',
                    route:'cbdDetail'
                },
            ],
            userInfo:{
                avatar:null,
                nickname:null,
                username:null,
            },
        }
    },
    created(){
        sessionStorage.setItem('btmNav',4)
    },
    mounted () {
        this.initData()
        this.info();
    },
    computed:{
        ...mapGetters(['api','uid','coinTxt','proData'])
    },
    methods:{
        ...mapMutations(['saveUserInfo','saveUserID','saveCoinTxt','saveProData','saveVersion']),
        initData(){
            
        },
        
        // 获取个人信息
        info(){
            Trade.info().then(res=>{
                if(res.code==1){
                    this.userInfo = res.data;
                    this.message_list[0].value = res.data.clhz_cbd_yue;
                    this.message_list[1].value = res.data.cbd_yue;
                    this.message_list[2].value = res.data.gxtc_cbd_yue;
                }else{
                    mui.toast(res.msg)
                }
            })
        },
        // 订单
        toOrder(i){
            let that = this;
            this.orderUrl = this.api+'/addons/litestore#/my/myorder?showType='+i+'&cookie='+localStorage.getItem('cookie');
            if(i==5) this.orderUrl = this.api+'/addons/litestore#/center/AfterSaleList?cookie='+localStorage.getItem('cookie');
            try {
                if(plus){
                    var nwating = plus.nativeUI.showWaiting(); //显示原生等待框
                    // var webview_sub = plus.webview.create(that.orderUrl).show(); 
                    var webview_sub = plus.webview.open(that.orderUrl); //后台创建webview并打开页面
                    webview_sub.addEventListener('loaded', function() {
                        nwating.close(); //关闭等待框
                        // webview_sub.show('slide-in-right', 150); //把新的webview窗口显示出来
                    }, false); 
                }
            }catch(e){
                location.href = this.orderUrl;
            }
        },
        goTo(route,type){
            if(!route){
                mui.toast('暂未开放！')
            }
            this.$router.push({name:route,query:{type}})
        },
        /**
         * 资产/ 币种余额
         */
        getCoin(){
            Owner.getUserCoin({id:this.uid}).then((res)=>{
                if(res.code == 1){
                    this.assignData(this.capitalList,res.data.data)
                }else{
                    mui.toast(res.msg);
                    return ;
                }
            })
        },
        /**
         * 处理返回的数据
         */
        assignData(lastData,data){
            lastData[0].num = data.credit2.money;
            lastData[1].num = data.credit4.money;
            lastData[2].num = data.credit1.money;
            lastData[3].num = data.credit5.money;
            lastData[4].num = data.total.money;
            lastData[5].num = data.credit3.money;
        },
        /**
         * 获取用户信息
         */
        getUser(id){
            Init.getUser({id}).then(res=>{
                if(res.code ==1){
                    // this.info = res.data[0];
                    this.info = JSON.parse(Secret.decrypt(res.data))[0];
                    if(this.info){
                        localStorage.setItem('userInfo',Secret.encrypt(JSON.stringify(this.info)));
                        this.saveUserInfo(this.info)
                    }
                }else {
                    mui.toast(res.msg);
                }
            })
        },
        /**
         * 退出确认
         */
        toQuit(){
            try{
                if(plus){
                    mui.confirm('退出登录',actions=>{
                        if(actions.index==0)
                        this.quit();
                    })
                }
            }catch(e){
                mui.confirm('退出登录',actions=>{
                    if(actions.index==1)
                    this.quit();
                })
            }
        },
        /**
         * 退出操作
         */
        quit(){
            Load.loadStart(this);
            Init.quit().then(res=>{
                if(res.code == 1){
                    mui.toast(res.msg);
                    setTimeout(() => {
                        this.clearLocal();
                        Load.loadEnd(this);
                        this.$router.replace({name:'Login'});
                    }, 500);
                }else {
                    setTimeout(() => {
                        Load.loadEnd(this);
                        return ;                        
                    }, 500);
                }
            })
        },
        /**
         * 清楚缓存
         */
        clearLocal(){
            localStorage.clear();
            this.saveUserInfo(null);
            this.saveUserID(null);
            this.saveCoinTxt(null);
            this.saveProData(null);
            sessionStorage.setItem('btmNav',0);
        }
    }
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        // padding: @padding-primary;
        background-color: @bg-color;
        .info{
            display: flex;
            justify-content: space-between;
            padding: 60px 34px 46px 36px;
            background-color: #232323;
            
            background-image: url('../../assets/images/lz/21.png');
            background-size: 100% 100%;
            >img{
                width: 120px;
                height: 120px;
                border-radius: 50%;
                border: 8px solid #333;
            }
            .center{
                margin-left: 46px;
                flex: 1;
                p{
                    font-size:28px;
                    margin-top: 4px;
                    &:first-child{
                        font-size:32px;
                        font-weight:600;
                        margin-top: 0;
                    }
                }
            }
            .right{
                text-align: center;
                img{
                    width: 78px;
                }
                p{
                    font-weight:600;
                    color:rgba(255,195,109,1);
                    font-size: 28px;
                    margin-top: 8px;
                }
            }
        }
        .message{
            width: 100%;
            padding: 20px 30px 40px;
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            li{
                border: 1px dashed #3CFCAC;
                flex: 1;
                border-radius: 10px;
                text-align: center;
                padding: 40px 0 20px;
                background-color: #232323;
                &:nth-child(2){
                    margin: 0 15px;
                }
                >i{
                    font-size: 43px;
                    margin-bottom: 18px;
                    color: #3CFCAC;
                    display: inline-block;
                }
                >img{
                    width: 44px;
                    margin-bottom: 12px;
                }
                p{
                    font-size:34px;
                    // font-weight:600;
                    color:rgba(255,255,255,1);
                    &:last-child{
                        font-size:24px;
                        font-weight: 400;
                    }
                }
            }
        }
        .list{
            margin-bottom: 24px;
            padding: 0 30px;
            color: #3CFCAC;
            
            >p{
                display: flex;
                font-weight:550;
                font-size:34px;
                color: #3CFCAC;
                margin-bottom: 30px;
                display: flex;
                justify-content: space-between;
                span{
                    &:nth-child(2){
                        font-size:28px;
                        font-weight:400;
                    }
                }
            }
            >ul{
                // border: 1px dashed #3CFCAC;
                padding: 46px 0 30px;
                border-radius: 10px;
                
                background-image: url('../../assets/images/lz/20.png');
                background-size: 100% 100%;
                li{
                    width: 20%;
                    text-align: center;
                    display: inline-block;
                    &:nth-child(n+6){
                        margin-top: 40px;
                    }
                    i{
                        font-size: 60px;
                    }
                    img{
                        max-width: 60px;
                        max-height: 60px;
                    }
                    p{
                        font-size:24px;
                        color:rgba(255,255,255,1);
                        // margin-top: 35px;
                        margin-top: 20px;
                    }
                }
            }
        }
        .quit{
            width: 690px;
            border: 1px solid rgba(60,252,172,.6);
            color: #3CFCAC;
            height: 88px;
            margin: 10px 30px 30px;
        }
    }
</style>
