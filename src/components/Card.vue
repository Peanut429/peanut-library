<template>
  <div class="book-card">
    <a :href="detailUrl" style="overflow: hidden;">

      <div class="thumb" @click.stop="preview">
        <img
          :src="book.image"
          class="img"
          mode="aspectFit"
        >
      </div>
      <div class="detail">
        <div class="row text-primary">
          <div class="right">
            {{book.rate}}
            <Rate :value="book.rate"></Rate>
          </div>
          <div class="left">
            {{book.title}}
          </div>
        </div>

        <div class="row">
          <div class="right text-primary">
            浏览量{{book.count}}
          </div>
          <div class="left">
            {{book.author}}
          </div>
        </div>

        <div class="row">
          <div class="right">
            {{book.user_info.nickName}}
          </div>
          <div class="left">
            {{book.publisher}}
          </div>
        </div>
      </div>

    </a>
    
  </div>
</template>

<script>
import Rate from './Rate'
export default {
  components: {Rate},
  props: {
    book: {
      type: Object
    }
  },
  data () {
    return {}
  },
  computed: {
    detailUrl () {
      return '/pages/detail/main?id=' + this.book.id
    }
  },
  methods: {
    preview () {
      wx.previewImage({
        current: this.book.image,
        urls: [this.book.image]
      })
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="scss" scoped>
.book-card {
  padding: 5px;
  overflow: hidden;
  margin: 5px 0;
  font-size: 14px;
  .thumb {
    width: 90px;
    height: 90px;
    float: left;
    margin: 0 auto;
    overflow: hidden;
    .img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .detail {
    margin-left: 100px;
    .row {
      line-height: 20px;
      margin-bottom: 3px;
      .right {
        float: right;
      }
      .left {
        margin-right: 80px;
      }
    }
  }
}
</style>
