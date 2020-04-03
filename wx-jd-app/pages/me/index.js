//获取应用实例，这个方法可以拿到app.js 文件中的全局的APP实例
const app=getApp();
// console.log(app)；
//这里如果打印，就可以获取到全局的信息，包含app.js中globalData里面的信息
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo:false,
    canIUse:wx.canIUse("button.open-type.getUserInfo")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo){
      this.setData({
        userInfo:app.globalData.userInfo,
        hasUserInfo:true
      })
    }else if(this.data.canIUse){
      //getuserInfo是一个网络请求，可能回存在延迟，在onload之后返回数据，这就的加入callback回调函数
      //防止这样的延迟发生
      app.userInfoReadyCallback=res=>{
        this.setData({
          userInfo:res.userInfo,
          hasUserInfo:true
        })
      }
    }
  },
  //实现获取用户信息的方法
  getUserInfo:function(e){
    // console.log(e)
    var _this=this;
    this.setData({
      userInfo:e.detail.userInfo,
      hasUserInfo:true
    })
  }
})