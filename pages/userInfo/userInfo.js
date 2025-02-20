const app = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
 
 
Page({
/**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickName: '',
 
  },
 
  onChooseAvatar(e) {

    
    // console.log("e::" +  e.detail.avatarUrl)
    const avatarUrl = e.detail.avatarUrl;  // 获取头像 URL
    this.setData({
      avatarUrl: avatarUrl,  // 更新页面上的头像 URL
    })
    // console.log(this.data.avatarUrl)
    
  },
  formSubmit(e) {
    const nickName = e.detail.value.nickname;
    
    // 使用 setData 的回调函数，确保数据更新后再执行请求
    this.setData({
      nickName: nickName
    }, () => {
      console.log("更新后的数据：", this.data);

      // 现在 this.data.nickName 已经更新，可以正确传递数据
      wx.request({
        url: 'http://localhost:8088/user',
        method: 'POST',
        data: {
            openId: '12333',
            nickName: this.data.nickName, // 确保这里能拿到最新的 nickName
            atavarUrl: this.data.avatarUrl,
            createTime: '',
            lastLoginTime: ''
        },
        success(res) {
          console.log("后端返回数据：", res.data);
        },
        fail(err) {
          console.error("请求失败：", err);
        }
      });
    });
  },

 
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  }
})