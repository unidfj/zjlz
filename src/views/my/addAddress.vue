<template>
    <div class="page">
        <m-header title="地址管理" :canback="Boolean(1)"></m-header>
        <section class="body">
            
            <form class="tj-form">
                <div class="form-item">
                    <label for="name">收货人</label>
                    <input type="text" placeholder="请输入收货人姓名" v-model="name">
                </div>
                <!-- <div class="form-item">
                    <label for="name">身份证号码</label>
                    <input type="text" placeholder="请输入身份证号码" v-model="creditid">
                </div> -->
                <div class="form-item">
                    <label for="name">手机号码</label>
                    <input type="text" placeholder="请输入收货人手机号码" v-model="phone">
                </div>
                <div class="form-item" @click="showPopup">
                    <label for="name">所在地址</label>
                    <input type="text" placeholder="请选择地区" readonly :value="region">
                    <i class="iconfont icontubiaozhizuo-1"></i>
                </div>
                <div class="form-item" >
                    <label for="name">详细地址</label>
                    <textarea name="" id="" cols="30" rows="10" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等" v-model="detail"></textarea>
                </div>
                <div class="bot" v-if="id">
                    <p>设为默认地址</p>
                    <div :class="{'se':se}" @click="change()">
                        <div></div>
                    </div>
                </div>
                <button type="button" class="btn-submit btn-blue" @click="adress" v-if="!id">保存</button>
                <button type="button" class="btn-submit btn-blue" @click="edit" v-if="id">确认修改</button>
                <button type="button" class="btn-submit btn-red" @click="del" v-if="id">删除</button>
            </form >

        </section>
        
        <van-popup v-model="show">
            <van-area :area-list="areaList"  @confirm="onConfirm($event)"/>
        </van-popup>
        <m-load ref="load"></m-load>
    </div>
</template>
<script>
import {Trade} from '@/server/server.js';
import {Util,Load,HB} from '@/assets/commonjs/utils.js';
import {cn} from '@/assets/commonjs/cn.js';
import {mapGetters,mapMutations}  from 'vuex';
import { Area,Popup } from 'vant';
import 'vant/lib/area/style';
export default {
    // components:{
    //     Area,Popup
    // },
    name:'set',
    data(){
        return {
            isApp:false,
            se:false,
            areaList:null,
            show:false,
            id:null,
            
            region:null,
            name:null,
            phone:null,
            detail:null,
            // creditid:null,
        }
    },
    mounted(){
        this.initData();
    },
    computed:{
        ...mapGetters(['userInfo','version'])
    },
    methods:{
        ...mapMutations(['saveUserInfo','saveUserID','saveCoinTxt','saveProData','saveVersion']),
        initData(){
            this.areaList = Object.assign({},cn);
            this.id = this.$route.query.id;
            if(this.id){
                this.adressDetail(this.id)
            }
        },
        // 删除地址
        del(){
            Trade.del({id:this.id}).then(res=>{
                mui.toast(res.msg)
                if(res.code==1){
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },500)
                }
            })
        },
        // 修改地址
        edit(){
            let params = {
                id:this.id,
                name:this.name,
                phone:this.phone,
                detail:this.detail,
                region:this.region,

            }
            Trade.edit(params).then(res=>{
                mui.toast(res.msg)
                if(res.code==1){
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },500)
                }
            })
        },

        change(){
            this.se = !this.se;
            if(this.se){
                this.setdefault(this.id)
            }
        },
        
        // 更改默认收货地址
        setdefault(id){
            Trade.setdefault({id}).then(res=>{
                mui.toast(res.msg)
                if(res.code==1){
                    // this.se = i;
                } 
            })
        },
        // 地址详情
        adressDetail(id){
            Trade.adressDetail({id}).then(res=>{
                if(res.code==1){
                    
                    // this.region = res.data.detail.region;
                    this.name = res.data.detail.name;
                    this.phone = res.data.detail.phone;
                    this.detail = res.data.detail.detail;
                    // this.creditid = res.data.detail.creditid;
                    this.region = res.data.rArea[0]+','+res.data.rArea[1]+','+res.data.rArea[2];
                    this.se = res.data.detail.isdefault=='0'?false:true;
                    console.log('se',this.se)
                }else{
                    mui.toast(res.msg)
                }
            })
        },
        // 添加地址
        adress(){
            let params = {
                region:this.region,
                name:this.name,
                phone:this.phone,
                detail:this.detail
                // creditid:this.creditid
            }
            Trade.adress(params).then(res=>{
                if(res.code==1){
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },500)
                }else{
                    mui.toast(res.msg)
                }
            })
        },
        // 确认
        onConfirm(e){
            this.show = false;
            let province = e[0]?e[0].name:'';
            let city = e[1]?e[1].name:'';
            let area = e[2]?e[2].name:'';
            this.region = province +','+ city +','+ area;
            // console.log(this.data)
        },
        showPopup() {
            this.show = true;
            // setTimeout(()=>{
            //     document.querySelector('.van-picker__cancel').onclick = ()=>{this.show = false}
            //     document.querySelector('.van-popup--center').style.position = 'fixed';
            //     document.querySelector('.van-popup--center').style.left = '0';
            //     document.querySelector('.van-popup--center').style.right = '0';
            //     document.querySelector('.van-popup--center').style.bottom = '0';
            // },100)
        },
    }
    
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        background-color: @bg-color;color: white;
        .tj-form {
            .form-item{
                position: relative;
                label{
                    color: #fff;
                }
                textarea{
                    // width:650px;
                    height:151px;
                    background:rgba(255,255,255,1);
                    border-radius:10px;
                    padding: 25px 30px;
                    margin: 20px 0;
                    color: #333;
                }
                >i{
                    font-size: 40px;
                    position: absolute;
                    right:30px;
                    top: 84px;
                    color: #000;
                }
            }
            button{
                margin-bottom: 30px;
            }
        }
        .bot{
            display: flex;
            justify-content: space-between;
            margin-bottom: 74px;
            margin-top: 20px;
            p{
                font-size:34px;
            }
            >div{
                width:74px;
                height:38px;
                background:rgba(78,78,78,1);
                position: relative;
                border-radius: 19px;
                >div{
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    background-color: #3CFCAC;
                    left: 0;
                    top: 0;
                }
            }
            .se{
                background:rgba(60,252,172,.7);
                >div{
                    position: absolute;
                    left: 36px !important;
                }
            }
        }
    }
</style>

