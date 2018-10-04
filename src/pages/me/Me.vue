<template>
    <div class="container">
        <div class="userinfo">
            <img :src="userinfo.avatarUrl" />
            <p>{{userinfo.nickName}}</p>
        </div>
        <YearProgress></YearProgress>

        <button v-if="userinfo.openId" class="btn" @click="scanBook">添加图书</button>
        <button v-else open-type="getUserInfo" lang="zh_CN" class="btn" @getuserinfo="login">点击登录</button>
    </div>
</template>
<script>
import { showSuccess, showModal, post } from '@/util'
import qcloud from 'wafer2-client-sdk'
import config from '@/config.js'

import YearProgress from '@/components/Yearprogress'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userinfo: {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: ''
      }
    }
  },
  methods: {
    async addBook (isbn) {
      const res = await post('/weapp/addbook', {
        isbn,
        openid: this.userinfo.openId
      })
      showModal('添加成功', `${res.title}添加成功`)
    },
    scanBook () {
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
        }
      })
    },
    getWxLogin ({encryptedData, iv, userinfo}) {
      const self = this
      wx.login({
        success: function (loginResult) {
          console.log('loginResult', loginResult)
          var loginParams = {
            code: loginResult.code,
            encryptedData: encryptedData,
            iv: iv
          }
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.requestLogin({
            loginParams,
            success () {
              qcloud.request({
                url: config.userUrl,
                login: true,
                success (userRes) {
                  console.log('success', userRes)
                  showSuccess('登录成功')
                  wx.setStorageSync('userinfo', userRes.data.data)
                  self.userinfo = userRes.data.data
                }
              })
            },
            fail (error) {
              console.log('fail', error)
              showModal('登录失败', error.type)
            }
          })
        },
        fail: function (loginError) {
          showModal('登录失败', loginError)
        }
      })
    },
    login (e) {
      const self = this
      wx.getSetting({
        success: function (res) {
          console.log('getSetting-success:', res)
          if (res.authSetting['scope.userInfo']) {
            wx.checkSession({
              success: function () {
                console.log('success')
                showSuccess('登录成功')
              },
              fail: function () {
                console.log('e', e)
                console.log('fail')
                qcloud.clearSession()
                var options = {
                  encryptedData: e.mp.detail.encryptedData,
                  iv: e.mp.detail.iv,
                  userinfo: e.mp.detail.userInfo
                }
                console.log('options:', options)
                self.getWxLogin(options)
              }
            })
          } else {
            showModal('用户未授权', e.mp.detail.errMsg)
          }
        }
      })
    }
  },
  onShow () {
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
}
</script>
<style lang="scss">
.container{
    padding: 0 30rpx;
    .userinfo{
      margin-top: 100rpx;
      text-align: center;
      img{
        width: 128rpx;
        height: 128rpx;
        border-radius: 50%;
      }
    }
}
</style>

