const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    avatarUrl: defaultAvatarUrl, // 默认头像
    nickName: '',
    userInfo: {} // 存储完整信息
  },

  // 获取头像
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({
      avatarUrl: avatarUrl
    })
  },

  // 实时获取昵称输入
  onNicknameInput(e) {
    this.setData({
      nickName: e.detail.value
    })
  },

  // 表单提交
  formSubmit(e) {
    const { avatarUrl, nickName } = this.data
    const userInfo = {
      avatarUrl: avatarUrl,
      nickName: nickName
    }
    // console.log("----------" + this.data.userInfo)

    this.setData({
      userInfo: userInfo
    }, () => {
      // console.log("更新后的数据：", this.data.userInfo)

      // 现在 this.data.nickName 已经更新，可以正确传递数据
      wx.request({
        url: 'http://localhost:8088/user',
        method: 'POST',
        data: {
          openId: '12333',
          nickName: this.data.userInfo.nickName, 
          avatarUrl: this.data.userInfo.avatarUrl,
          createTime: '',
          lastLoginTime: ''
        },
        success(res) {
          console.log("请求成功, 后端返回数据：", res.data);
        },
        fail(err) {
          console.error("请求失败：", err);
        }
      })
    }
  )}
})