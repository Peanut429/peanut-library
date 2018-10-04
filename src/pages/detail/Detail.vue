<template>
  <div>
    <BookInfo :info="info"></BookInfo>
    <CommentList :comments="comments"></CommentList>
    <div class="comment" v-if="showAdd">
      <textarea
        v-model="comment"
        class="textarea"
        :maxlength="100"
        placeholder="请输入图书短评"
      ></textarea>
      <div class="location">
        地理位置:
        <switch color="#EA5A49" :checked="location" @change="getGeo"></switch>
        <span class="text-primary">{{location}}</span>
      </div>
      <div class="phone">
        手机型号:
        <switch color="#EA5A49" :checked="phone" @change="getPhone"></switch>
        <span class="text-primary">{{phone}}</span>
      </div>
      <button class="btn" @click="addComment">评论</button>
    </div>
    <div v-else class="text-footer">
      未登录或者已经评论过啦
    </div>
    <button class="btn" open-type="share">转发给好友</button>
  </div>
</template>

<script>
import { get, post, showModal } from '@/util'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'

export default {
  props: {},
  components: {BookInfo, CommentList},
  data () {
    return {
      userinfo: {},
      bookid: '',
      info: {},
      comment: '',
      location: '',
      phone: '',
      comments: []
    }
  },
  computed: {
    showAdd () {
      // 1.没登录
      if (!this.userinfo.openId) {
        return false
      }
      // 2.已经评论过
      if (this.comments.some((v) => { return v.openid === this.userinfo.openId })) {
        return false
      }
      return true
    }
  },
  methods: {
    async getDetail () {
      const info = await get('/weapp/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({
        title: info.title
      })
      this.info = info
    },
    getGeo (e) {
      const ak = 'ibfURNKBkXy5aQ6rajzGiXL1XHrfO0Of'
      let url = 'https://api.map.baidu.com/geocoder/v2/'
      if (e.target.value) {
        wx.getLocation({
          success: (geo) => {
            wx.request({
              url,
              data: {
                location: `${geo.latitude},${geo.longitude}`,
                output: 'json',
                ak
              },
              success: (res) => {
                console.log(res)
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                  this.location = '未知地点'
                }
              }
            })
            console.log(geo)
          }
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        this.phone = phoneInfo.model
      } else {
        this.phone = ''
      }
    },
    async addComment () {
      if (this.comment === '') {
        return
      }
      const data = {
        openid: this.userinfo.openId,
        comment: this.comment,
        phone: this.phone,
        location: this.location,
        bookid: this.bookid
      }
      try {
        await post('/weapp/addcomment', data)
        this.comment = ''
        await this.getComments()
      } catch (e) {
        showModal('失败', e.msg)
      }
      console.log(data)
    },
    async getComments () {
      const comments = await get('/weapp/commentlist', {bookid: this.bookid})
      this.comments = comments.list
      console.log(comments)
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
    this.getComments()
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  margin-top: 10px;
  .textarea {
    padding: 10rpx;
    width: 730rpx;
    height: 200rpx;
    background-color: #eee;
  }
  .location {
    margin-top: 10px;
    padding: 5px 10px;
  }
  .phone {
    margin-top: 10px;
    padding: 5px 10px;
  }
}
</style>
