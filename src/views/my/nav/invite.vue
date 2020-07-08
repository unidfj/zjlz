<template>
    <div class="page">
        <m-header title="分享推荐" :canback="Boolean(1)" ></m-header>
        <section class="body">
            <!-- <div class="img-box">
                <img class="img" :src="inviteSrc" alt="">
                <p class="tip">扫描二维码即可分享好友哟</p>
                <p v-if="userInfo" class="url">{{inviteUrl}}</p>
                <input class="inp_url" type="text" id="url" :value="inviteUrl" readonly>
                <button ref="copy" class="btn btn-copy" data-clipboard-target="#url" data-clipboard-action="copy" @click="copy">复制</button>
            </div> -->
            <div class="box">
                <p class="top">我的邀请码</p>
                <img class="img" :src="inviteSrc" alt="">
                <p class="bot">邀请码：{{userInfo.username}}</p>
            </div>

            <input class="inp_url" type="text" id="url" :value="userInfo.username" readonly>
            <button ref="copy" class="btn btn-copy" data-clipboard-target="#url" data-clipboard-action="copy" @click="copy">点击复制</button>
        </section>
    </div>
</template>
<script>
import QRCode from 'qrcode';
import {mapGetters} from 'vuex';
import Clipboard from 'clipboard'
export default {
    name:"invite",
    data(){
        return {
            inviteSrc:null,
            inviteUrl:null,
            myClipboard:null
        }
    },
    mounted(){
        // console.log(this.userInfo)
        this.initData();
        this.setCode(this.inviteUrl);
        this.myClipboard = new Clipboard(this.$refs['copy']);
        console.log(this.userInfo)
    },
    computed:{
        ...mapGetters(['uid','userInfo','api',])
    },
    methods:{
        initData(){
            // this.inviteUrl = this.api+'/dist/index.html#'+'/register/'+this.uid+'/'+this.userInfo.mobile;
            // this.inviteUrl = this.api+'/dist/index.html#'+'/register?username='+this.userInfo.username;
            this.inviteUrl = this.api+'/dist/index.html#'+'/login?username='+this.userInfo.username;
        },
        setCode(url){
            QRCode.toDataURL(url).then(url => {
                this.inviteSrc = url;
            })
            .catch(err => {
                console.error(err)
            })
        },
        copy(){
            this.myClipboard.on('success',(e)=>{
                mui.toast('复制成功！');
            })
            this.myClipboard.on('error',(e)=>{
                mui.toast('复制失败，请手动复制');
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .page{
        // background-image: url(../../../assets/images/gzlz/invate_bg.png);
        background-image: url(../../../assets/images/lz/invite.png);
        background-size: 100% 100%;
        background-color: #000;
    }
    .body {
        // background: transparent;
        // background-color: transparent;
        text-align: center;
        .box{
            padding: 70px 0 84px;
            text-align: center;
            width: 464px;
            margin: 165px 143px 76px;
            background:rgba(35,35,35,.8);
            border-radius: 10px;
            border:2px dashed rgba(60,252,172,1);
            .top{
                font-size:32px;
                font-weight:500;
                color:rgba(255,255,255,1);
            }
            >img{
                width: 256px;
                height: 256px;
                margin: 50px 0 36px;
            }
            >.bot{
                font-size:32px;
                font-weight:500;
                color:rgba(60,252,172,1);
            }
        }
        .inp_url {
            position: absolute;
            top: 0;left: 0;opacity: 0;
        }
        .btn-copy{
            width:464px;
            height:88px;
            background:rgba(60,252,172,1);
            border-radius:8px;
            color: #333;
        }
        @media screen and (max-height:667px){
            .img-box {
                position: absolute;
                bottom: 10%;
                left: 50%;
                .transform(translateX(-50%));
            }
        }
    }
</style>
