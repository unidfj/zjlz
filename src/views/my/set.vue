<template>
    <div class="page">
        <m-header title="设置" :canback="Boolean(1)"></m-header>
        <section class="body">
            <ul class="list">
                <!-- <li class="item">
                    <span>用户名</span>
                    <span>{{userInfo?userInfo.username:'-'}}</span>
                </li>
                <li class="item">
                    <span>手机号</span>
                    <span>{{userInfo?userInfo.mobile:'-'}}</span>
                </li> -->
                <router-link class="item" :to="{name:item.route,query:{type:item.type}}" v-for="(item,index) in navList" :key="index">
                    <span>{{item.name}}</span>
                    <i class="iconfont iconright"></i>
                </router-link>
                <!-- <li class="item" v-if="isApp">
                    <span>版本号</span>
                    <span>v{{version?version:'1.0'}}</span>
                </li> -->
            </ul>
            <!-- <button class="btn btn-blue btn-quit" @click="toQuit">退出登录</button> -->
        </section>
        <m-load ref="load"></m-load>
    </div>
</template>
<script>
import {Init} from '@/server/server.js';
import {Util,Load,HB} from '@/assets/commonjs/utils.js';
import {mapGetters,mapMutations}  from 'vuex';
export default {
    name:'set',
    data(){
        return {
            isApp:false,
            navList:[
                {
                    name:'修改登录密码',
                    route:'SetPwd',
                    type:'login'
                },
                {
                    name:'修改交易密码',
                    route:'SetPwd',
                    type:'trade'
                },
                // {
                //     name:'晒图奖励',
                //     route:'ShaiTu',
                //     type:''
                // },
                // {
                //     name:'关于',
                //     route:'CheckUpdate',
                //     type:''
                // },
            ]
        }
    },
    mounted(){
        // this.getShare();
        // setTimeout(() => {
        //     this.share();
        // }, 10000);
    },
    computed:{
        ...mapGetters(['userInfo','version'])
    },
    methods:{
        ...mapMutations(['saveUserInfo','saveUserID','saveCoinTxt','saveProData','saveVersion']),
        initData(){
            try{
                if(plus){
                    this.isApp = true;
                }
            }catch(e){}
            HB.getVersion(data=>{
                localStorage.setItem('version',data);
                this.saveVersion(data);
            })
        },
        getShare(){
            try{
                if(plus){
                    plus.share.getServices(res=>{
                        res[2].send( {type:'image',pictures:['http://fagzlz.a6shop.net:80/uploads/20190821/2924b90238ff3e6e48b4e85b71b5b39b.png'],extra:{scene:'WXSceneSession'}}, function(){
                            alert("分享成功！");
                        }, function(e){
                            alert("分享失败："+e.message);
                        });
                    },err=>{
                        console.log(err)
                    });
                }
            }catch(e){}
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
        background-color: @bg-color;color: white;
        .list {
            margin: @margin-primary;
            .item {
                .display-flex();
                justify-content: space-between;
                align-items: center;
                // padding: @padding-primary 0;
                padding: 0 30px;
                height: 98px;
                line-height: 98px;
                background:rgba(35,35,35,1);
                border-radius:10px;
                border:2px dashed rgba(60,252,172,1);
                margin-bottom: 30px;
                span{
                    font-size:34px;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:500;
                    color:rgba(60,252,172,1);
                }
            }
        }
        .btn-quit {
            height: 80px;line-height: 80px;width: 90%;
            display: block;margin: @margin-primary auto;
        }
    }
</style>

