<template>
  <div class="page">
    <m-header title="公告信息" :canback="Boolean(1)"></m-header>
    <section class="body">
      <ul class="list">
        <li class="item" v-for="item of noticeList" :key="item.id" @click="goto(item.id)">
          <p>{{item.title}}</p>
          <i class="iconfont iconright"></i>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import { Owner } from "@/server/server.js";
export default {
  data() {
    return {
      noticeList: [],
      type:'mh'
    };
  },
  mounted() {
      this.initData();
      let noticeParams = {
          type: this.type,
          page: 1
      }
      this.getNotice(noticeParams)
  },
  methods: {
    initData(){
      this.type = this.$route.query.type;
    },
    /**
     * 公告
     */
    getNotice(params) {
      Owner.getTitle({type:'mh'}).then(res=>{
            if(res.code == 1){
                this.noticeList = res.data;
            }else {
              mui.toast(res.msg);
            }
        })
    },
    goto(id) {
        this.$router.push({name:'NoticeDetail',params:{id:id}})
    }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  background: @bg-color;
  padding: @padding-primary;
  // background-color: white;
  height: 100%;
  .list {
    .item {
      background-color: #232323;
      padding: 25px 30px;
      margin-bottom: 30px;
      border:2px dashed rgba(60,252,172,1);
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      p{
        font-size:32px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(60,252,172,1);
      }
      i{
        color: #fff;
      }
    }
  }
}
</style>
