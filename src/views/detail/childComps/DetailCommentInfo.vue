<template>
  <div class="detail-commentinfo">
    <div class="comment-top">
      <span class="title">用户评价</span>
      <span class="more">
        <a href>更多</a>
        <i class="fa fa-angle-right"></i>
      </span>
    </div>
    <div class="comment-middle">
      <div class="user">
        <img :src="commentInfo.user.avatar" alt />
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="content">{{commentInfo.content}}</div>
      <p>
        <span class="time">{{commentInfo.created | dateFilter}}</span>
        <span class="style">{{commentInfo.style}}</span>
      </p>
    </div>
    <div class="comment-bottom">
      <img :key="index" :src="item" alt v-for="(item,index) in commentInfo.images" />
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/common/utils.js'

export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    dateFilter(time) {
      let date = new Date(time * 1000)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
.detail-commentinfo {
  padding: 10px 10px 10px;
  box-shadow: 0px 2px 2px rgba(100, 100, 100, 0.1);
  margin-bottom: 10px;
}
.comment-top {
  height: 45px;
  line-height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  box-shadow: 0px 2px 2px rgba(100, 100, 100, 0.1);
}
.comment-top .title {
  font-size: 18px;
  color: #333333;
}
.comment-top .more {
  margin-right: 10px;
}
.comment-top .more a {
  color: #000000;
}
.comment-top .more i {
  font-size: 22px;
  position: relative;
  top: 2px;
  left: 6px;
}
.comment-middle .user {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  font-size: 18px;
  color: #333333;
  margin: 10px 0;
}
.comment-middle .user img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.comment-middle .user span {
  margin-left: 8px;
}
.comment-middle .content {
  line-height: 1.4;
  font-size: 13px;
}
.comment-middle p {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
  color: #999999;
  font-size: 14px;
}
.comment-middle .style {
  margin-left: 10px;
}
.comment-bottom {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.comment-bottom img {
  width: 23%;
  border-radius: 2px;
  margin-right: 2%;
}
</style>
