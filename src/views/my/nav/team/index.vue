<template>
    <div class="page">
        <m-header title="我的团队" :canback="Boolean(1)"></m-header>
        <section class="body">
            <div class="top">
                <div>
                    <p>{{data.teamnum}}</p>
                    <p>团队人数</p>
                </div>
                <div>
                    <p>{{data.team_buys_num}}</p>
                    <p>伞下业绩</p>
                </div>
            </div>
            <ul class="list" :style="'height:'+(screenHeight-100)+'px;overflow:auto;'" v-lazy-load="lazyLoad">
                <li>
                    <p>会员</p>
                    <p>手机号码</p>
                    <p>级别</p>
                    <p>注册时间</p>
                </li>
                <li v-for="(v,i) in list" :key="i">
                    <p>{{v.nickname}}</p>
                    <p>{{v.mobile}}</p>
                    <p>{{v.levelname}}</p>
                    <p>{{v.createtime}}</p>
                </li>
            </ul>
        </section>
    </div>
</template>
<script>
import {Trade,Owner} from '@/server/server.js';
import {Util,Load,Secret} from '@/assets/commonjs/utils.js';
import {mapGetters,mapMutations} from 'vuex';
export default {
    name:"PayInfo",
    data(){
        return {
            list:[],
            data:{
                teamnum:null,
                team_buys_num:null,
            },
            page:1,
            screenHeight:null,
            noMore:false,
        }
    },
    mounted(){
        this.screenHeight = window.screen.height || window.screen.availHeight;
        this.getTeam();
    },
    
    lazyLoad(){
        this.page = this.page+1;
        if(!this.noMore){
            this.getTeam(); 
        }
    },
    methods:{
        getTeam(){
            Owner.getTeam({page:this.page}).then(res=>{
                if(res.code==1){
                    // this.list = res.data;
                    this.data = res.data2;
                    
                    this.list = this.list.concat(res.data||[]);
                    if(!res.data||res.data.length<10)
                    this.noMore = true;
                }else{
                    mui.toast(res.msg)
                }
            })
        },
    }
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        background-color: @bg-color;
        color: white;
        >.top{
            display: flex;
            justify-content: space-between;
            margin: 30px 30px 40px;
            >div{
                flex: 1;
                background:rgba(35,35,35,1);
                border-radius:10px;
                border:2px dashed rgba(60,252,172,1);
                padding: 33px 0;
                p{
                    text-align: center;
                    font-size:34px;
                    font-weight:600;
                    color:rgba(60,252,172,1);
                    &:last-child{
                        font-size:24px;
                        color:rgba(255,255,255,1);
                        font-weight: 400;
                        margin-top: 4px;
                    }
                }
                &:last-child{
                    margin-left: 22px;
                }
            }
        }
        >.list{
            padding: 0 30px;
            li{
                display: flex;
                justify-content: space-between;
                p{
                    flex: 10;
                    font-size:28px;
                    color: #fff;
                    height: 70px;
                    line-height: 70px;
                    text-align: center;
                    &:nth-child(2),&:nth-child(4){
                        float: 10;
                    }
                    &:first-child{
                        text-align: left;
                        // flex: 6;
                    }
                    &:last-child{
                        text-align: right;
                    }
                }
                &:first-child{
                    p{
                        font-size:32px;
                        font-weight:500;
                        color:rgba(60,252,172,1);
                    }
                }
            }
        }
    }
</style>
