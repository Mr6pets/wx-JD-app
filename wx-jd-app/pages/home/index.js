const interfaces=require("../../utils/urlConfig.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swipers:[],
    logos:[],
    quicks:[],
    pageRow:[],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //存储this,保证之后的指向正确
    var that = this;
    //loading
    wx.showLoading({
      title: '加载中...',
    })
    //进入页面开始请求加载请求
    wx.request({
      url: interfaces.homepage,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        // console.log(res);
        that.setData({
          swipers:res.data.swipers,
          logos:res.data.logos,
          quicks:res.data.quicks,
          pageRow:res.data.pageRow
        })
        // 加载完成
        wx.hideLoading()
      }
    })
  }

})