<template>
  <div class="comment-list">
    <div class="page-title" v-if="comments.length" style="margin-top: 10px;">
      评论
    </div>
    <div class="comment" v-for="comment in comments" :key="comment.id" @click="handleClick(comment)">
      <div class="user">
        <div class="right">
          {{comment.location || '未知地点'}}
          <span class="text-primary">--</span>
          {{comment.phone || '未知型号'}}
        </div>
        <div class="inline">
          <img :src="comment.avatar" class="avatar" mode="aspectFit">
          {{comment.title}}
        </div>
        <div class="content">
          {{comment.comment}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array
    },
    type: {
      type: String
    }
  },
  methods: {
    handleClick (comment) {
      console.log(comment)
      if (this.type === 'user') {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + comment.bookid
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-list {
  background-color: #eee;
  font-size: 14px;
  .comment {
    background: #fff;
    margin-bottom: 10px;
    padding: 5px 20px;
    .content {
      margin: 10px 0;
    }
    .user {
      .avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
  }
}
</style>
