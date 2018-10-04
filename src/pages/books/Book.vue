<template>
    <div>
        <TopSwiper :tops="tops"></TopSwiper>
        <Card v-for="book in books" :key="book.id" :book="book"></Card>
        <p class="text-footer" v-if="!more">
          没有更多数据
        </p>
    </div>
</template>
<script>
import {get} from '@/util'
import Card from '@/components/Card.vue'
import TopSwiper from '@/components/TopSwiper.vue'
export default {
  components: {Card, TopSwiper},
  data () {
    return {
      books: [],
      page: 0,
      more: true,
      tops: []
    }
  },
  methods: {
    async getList (init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const books = await get('/weapp/booklist', {page: this.page})
      if (books.list.length < 10 && this.page > 0) {
        this.more = false
      }
      if (init) {
        this.books = books.list
        wx.stopPullDownRefresh()
      } else {
        console.log(this.books, books.list)
        this.books = this.books.concat(books.list)
        console.log('this.books:', this.books)
      }
      wx.hideNavigationBarLoading()
    },
    async getTop () {
      const tops = await get('/weapp/top')
      console.log('tops:', tops.list)
      this.tops = tops.list
    }
  },
  created () {
    this.getList(true)
    this.getTop()
  },
  onReachBottom () {
    if (!this.more) {
      return false
    }
    this.page++
    this.getList()
  },
  onPullDownRefresh () {
    this.getList(true)
  }
}
</script>
<style lang="scss">
</style>

