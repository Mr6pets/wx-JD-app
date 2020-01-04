const interfaces=require("../../utils/urlConfig.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    prolist:[],
    page:1,
    size:5,
    noData:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    wx.setNavigationBarTitle({
      title: options.title,
    });
    const _this=this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: interfaces.productionsList,
      header:{
        'content-type':'application/json'
      },
      success(res){
        // console.log(res.data);
        _this.setData({
          prolist:res.data
        })
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var _this=this;
    //显示加载状态
    wx.showNavigationBarLoading();
    //用户请求新的数据
    wx.request({
      url: interfaces.productionsList,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        // console.log(res.data);
        _this.setData({
          prolist: res.data
        })
        //隐藏加载状态
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //页面触底加载的接口是
    // https://enigmatic-island-47099.herokuapp.com/api/profiles/productionsList/1/5;

    // 停止下拉刷新
    wx.stopPullDownRefresh()
    // //在标题栏显示加载
    wx.showNavigationBarLoading();
     const prolist=this.data.prolist;
     let page=this.data.page
     this.setData({//每次触底都会将page+1
       page: ++page
     })
     const _this=this;
     wx.request({
       url: interfaces.productionsList+'/'+_this.data.page+'/'+_this.data.size,
       success(res){
         console.log(res.data);
        if(res.data.length==0){
          _this.setData({
            noData:true
          })
        }else{
          // 将接口文件取出的数据添加到prolist中
          res.data.forEach(item => {
            prolist.push(item);
          })
          _this.setData({
            prolist: prolist
          })
        }
        
        //停止标题栏加载
        wx.hideNavigationBarLoading();
       }
     })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  switchProductDetail(e){
    // console.log(e);
    let index = e.currentTarget.dataset.clickindex;
    wx.navigateTo({
      url: '/pages/detail/index?id='+this.data.prolist[index].id,
    })
    
  }
})