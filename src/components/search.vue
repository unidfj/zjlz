<!-- 
    头部组件（全局注册组件）
    canback：是否可以回退
    nobg：背景是否为透明
    icon：title图标  iconfont
-->
<template>
    <section>
        <!-- <header :class="{'header':true,'no-shade':nobg}">
            <nav :class="{'nav':true,'no-bg':nobg}">
                <span class="left iconfont iconback" @click.stop="goBack" v-if="canback"></span>
                <p :class="{'center':true,'center-white':nobg}"><i :class="icon"></i> {{title}}</p>
                <p :class="{'right':true,'center-white':nobg}"><slot></slot></p>
            </nav>
        </header> -->
        <div class="search">
            <div>
                <i class="iconfont iconsousuo"></i>
                <input type="text" placeholder="请输入商品名称" v-model="val">
                <button class="right" @click="goTo" @keyup.enter="goTo()">搜索</button>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props:{
        title:{},
        canback:{
            type:Boolean,
            default(){
                return false;
            }
        },
        icon:{}
    },
    data(){
        return {
            val:null,
        }
    },
    methods:{
        goBack(){
            if(this.setback){
                this.$emit('back')
            }else {
                this.$router.go(-1);
            }
        },
        goTo(){
            if(!this.val){
                mui.toast('请输入搜索内容！')
            }
            this.$router.push({name:'List',query:{id:-1,name:this.val}})
        },
    }
}
</script>
<style lang="less" scoped>
.search{
    height: 100px;
    line-height: 100px;
    padding: 20px 24px;
    background-color: #2a2a2a;
    div{
        display: flex;
        justify-content: space-between;
        width: 100%;
        border-radius: 30px;
        height: 60px;
        line-height: 60px;
        padding: 0 34px 0 28px;
        background-color: #030303;
        >i{
            font-size: 28px;
            // margin-right: 12px;
            vertical-align: middle;
            color: #B2B2B2;
        }
        >input{
            flex: 1;
            background-color: rgba(0,0,0,0);
            border: none;
            vertical-align: middle;
            height: 60px;
            color: #fff;
        }
        >button{
            vertical-align: middle;
            margin-left: 20px;
            color: #3CFCAC;
            font-size: 28px;
        }
    }
}
</style>

