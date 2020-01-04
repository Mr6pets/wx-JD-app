const interfaces=require("../../utils/urlConfig.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    partData:{},
    baitiao:[],
    baitiaoSelectItem: {
      desc: "【白条支付】首单享立减优惠"
    },
    hideBaitiao:true,
    hideBuy:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //通过其他页面 navifator 进来的参数通过options可以接受到
    // console.log(options);
    const id = options.id;
    const _this=this;
    //加载请求信息
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: interfaces.productionDetail,
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log(res.data);
        //result 来存取接口中的id和跳转进来的id相同的数据
        let result =null;
        res.data.forEach(item=>{
          if(item.partData.id==id){
           result=item
          }
        })
        _this.setData({
          partData:result.partData,
          baitiao:result.baitiao
        })

        //影藏加载信息
        wx.hideLoading();
      }
    })
  },
  popBaitiaoView(e){
    // console.log("显示白条")
    this.setData({
      hideBaitiao:false
    })
  },
  updateSelectItem(e){
    console.log(e)//接收子组件传递过来的选中的内容
    this.setData({
      baitiaoSelectItem:e.detail
    })
  },
  popBuyView(e){
    // console.log("显示已选");
    this.setData({
      hideBuy:false
    })
  },
  //更新数量的值
  updateCount(e){
    let partData=this.data.partData;
    partData.count=e.detail.val;
    this.setData({
      partData:partData
    })
  },
  //加入购物车
  addCart(){
    // console.log("加入购物车")
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})