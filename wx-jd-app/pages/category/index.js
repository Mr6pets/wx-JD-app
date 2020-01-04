// pages/category/index.js
const interfaces=require("../../utils/urlConfig.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLeftItems:[],
    navRightItems:[],
    curIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: interfaces.productions,
      header:{
        "content-type":"application/json"
      },
      success(res){
        // console.log(res);
        _this.setData({
          navLeftItems:res.data.navLeftItems,
          navRightItems:res.data.navRightItems
        })
        wx.hideLoading();
      }
    })
  },
  switchRightTap(e){
    let curindex = parseInt(e.currentTarget.dataset.curindex); 
    // console.log(curindex)
    this.setData({
      curIndex: curindex
    })
  },
  showListView(e){
    // console.log(e.currentTarget.dataset.txt);
    let txt = e.currentTarget.dataset.txt;
    //导航跳转
    wx.navigateTo({
      url:"/pages/list/index?title="+txt,
    })
  }

})