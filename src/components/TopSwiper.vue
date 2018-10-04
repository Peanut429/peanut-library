<template>
  <div class="swiper">
    <swiper
      :indicator-dots="true"
      indicator-color="#EA5A49"
      :autoplay="true"
      :interval="6000"
      :duration="1000"
      :circular="true"
    >
      <div v-for="(top, index) in imgUrls" :key="index">
        <swiper-item>
          <img @click="bookDetail(img)" :src="img.image" mode="aspectFit" class="slider-image" v-for="(img, imgindex) in top" :key="imgindex">
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    tops: {
      type: Object
    }
  },
  computed: {
    imgUrls () {
      let res = this.tops
      return [
        res.slice(0, 3),
        res.slice(3, 6),
        res.slice(6)
      ]
    }
  },
  methods: {
    bookDetail (item) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + item.id
      })
    }
  },
  mounted () {
    console.log('props tops:', this.tops)
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  margin-top: 5px;
  .slider-image {
    width: 33%;
    height: 250rpx;
  }
}
</style>
