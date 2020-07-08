<template>
  <div class="page">
    <m-header title="公告详情" :canback="Boolean(1)"></m-header>
    <section class="body">
      <div v-for="item of list" :key="item.id">
          <div class="title">{{item.title}}</div>
          <div class="new-con" v-html="item.contents"></div>
          <div class="date">{{item.createtime}}</div>
      </div>
    </section>
  </div>
</template>
<script>
import { Owner } from "@/server/server.js";
export default {
  data() {
    return {
      id:null,
      list: []
    };
  },
  mounted() {
    this.initData();
    let id = this.id;
    this.getNoticeDetail(id);
  },
  methods: {
    initData(){
      this.id = this.$route.params.id;
    },
    /**
     * 公告详情
     */
    getNoticeDetail(id) {
      Owner.getNoticeDetail({id}).then(res => {
        if (res.code == 1) {
          this.list = res.data;
        } else {
          mui.toast(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  height: 100%;
  background:@bg-color;
  >div{
    border:2px dashed rgba(60,252,172,1);
    width: 690px;
    margin: 30px;
    border-radius: 12px;
    padding: 26px 30px;
    .title{
      text-align: left;
      font-size:34px;
      font-weight:500;
      color:rgba(60,252,172,1);
    }
    .new-con{
      margin-top: 24px;
      /deep/ p{
        font-size:28px;
        color:rgba(170,170,170,1);
        img{
          width: 100% !important;
          height: 300px !important;
        }
      }
    }
    .date{
      font-size:24px;
      color:rgba(153,153,153,1);
      margin-top: 40px;
      text-align: right;
    }

  }
}
</style>
