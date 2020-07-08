<template>
    <div class="page">
        <m-header title="地址管理" :canback="Boolean(1)"></m-header>
        <section class="body">
            <ul class="list">
                <li v-for="(v,i) in list" :key="i" @click="setdefault(v.address_id,i)">
                    <div class="left">
                        <i class="iconfont iconziyuan" v-show="se==i"></i>
                    </div>
                    <div class="center">
                        <p>{{v.name}}、{{v.phone}}</p>
                        <p>{{v.Area?v.Area.province+v.Area.city+v.Area.region+v.detail:''}}</p>
                        <!-- <p>{{v.Area?Object.values(v.Area&&v.Area.Area).join('')+v.Area.detail:''}}</p> -->
                    </div>
                    <i class="iconfont iconbianji" @click.stop="$router.push({name:'Add',query:{id:v.address_id}})"></i>
                </li>
            </ul>
            <div class="top" @click="$router.push({name:'Add'})">
                <i class="iconfont iconjiahao1"></i>
                <p>添加收货地址</p>
            </div>
        </section>
        <m-load ref="load"></m-load>
    </div>
</template>
<script>
import {Trade} from '@/server/server.js';
import {Util,Load,HB} from '@/assets/commonjs/utils.js';
import {mapGetters,mapMutations}  from 'vuex';
export default {
    name:'set',
    data(){
        return {
            isApp:false,
            list:[],
            se:0,
        }
    },
    mounted(){
        this.lists()
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
            
        },
        // 更改默认收货地址
        setdefault(id,i){
            Trade.setdefault({id}).then(res=>{
                mui.toast(res.msg)
                if(res.code==1){
                    this.se = i;
                }  
            })
        },
        // 收货地址
        lists(){
            Trade.lists().then(res=>{
                if(res.code==1){
                    this.list = res.data.list;
                    if(this.list.length!==0){
                        this.list.forEach((v,i)=>{
                            if(v.isdefault=='1'){
                                this.se = i;
                            }
                        })
                    }
                }else{
                    mui.toast(res.msg)
                }
            })
        },
        // change(i){
        //     this.se = i;
        // }
        
    }
    
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        background-color: @bg-color;
        color: white;
        .top{
            text-align: center;
            border:2px dashed #3CFCAC;
            background-color: #232323;
            border-radius: 10px;
            margin: 30px;
            height: 150px;
            line-height: 150px;
            padding: 0 180px;
            display: flex;
            justify-content: space-between;
            i{
                font-size: 58px;
                margin-right: 50px;
                color: #3CFCAC;
            }
            p{
                font-size:36px;
                font-weight:500;
                color:#3CFCAC;
            }
        }
        .list{
            width: 690px;
            margin: 30px;
            li{
                display: flex;
                justify-content: space-between;
                background-color: #232323;
                border-radius: 10px;
                // height: 120px;
                padding: 30px 30px;
                .center{
                    flex: 1;
                    margin-left: 30px;
                    text-align: left;
                    display: inline-block;
                    >p{
                        color: #fff;
                    }
                }
                >.left{
                    width: 38px;
                    height: 38px;
                    background-color: #ddd;
                    vertical-align: middle;
                    border-radius: 50%;
                    margin-top: 20px;
                    >i{
                        font-size: 38px;
                        // border-radius: 50%;
                        color: #3CFCAC;
                        // display: inline-block;
                        // background-color: #fff;
                        // box-sizing: border-box;;
                    }
                }
                >i{
                    vertical-align: middle;
                    color: #ddd;
                    display: inline-block;
                    margin-top: 20px;
                }
            }
        }
    }
</style>

