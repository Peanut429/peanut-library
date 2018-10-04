<template>
  <div class="container">
    <CommentList v-if="userinfo.openId" :comments="comments" type="user"></CommentList>
    <div v-if="userinfo.openId">
      <div class="page-title">我的图书</div>
      <Card v-for="book in books" :key="book.id" :book="book"></Card>
      <div v-if="!books.length">尚未添加过图书，快去添加几本吧</div>
    </div>
  </div>
</template>
<script>
import {get} from '@/util'
import CommentList from '@/components/CommentList'
import Card from '@/components/Card'
export default {
  components: {CommentList, Card},
  data () {
    return {
      comments: [],
      books: [],
      userinfo: {}
    }
  },
  methods: {
    async init () {
      wx.showNavigationBarLoading()
      await this.getComments()
      await this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getComments () {
      const comments = await get('/weapp/commentlist', {openid: this.userinfo.openId})
      // console.log(comments)
      this.comments = comments.list
    },
    async getBooks () {
      const books = await get('/weapp/booklist', {openid: this.userinfo.openId})
      this.books = books.list
    }
  },
  async onPullDownRefresh () {
    await this.init()
    wx.stopPullDownRefresh()
  },
  onShow () {
    if (!this.userinfo.openid) {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
        this.init()
      }
    }
  }
}
</script>
<style>

</style>

