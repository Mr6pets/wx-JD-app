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
    hideBuy:true,
    badgeCount:0
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
    //当我点击购物车的时候 先查下storage中是否有这些存储，如果没有 那么就存储这条信息到storage
    let _this=this;
    wx.getStorage({
      key: 'cartInfo',
      success:function(res){
        // console.log("这是有值的")
        //查找到缓存中有这个数据，判断数组中是否拥有当前的商品
        const cartArray=res.data;
        //拿到现在添加的商品对象
        const partData=_this.data.partData;
        //判断数据是否存在该商品
        let isExit=false;
        //匹配从缓存中拿到的数据和现在data数据中的商品的id
        cartArray.forEach(cart=>{
          //如果缓存中的商品信息和data中的id是一样的那就将total的值相加
          if(cart.id==partData.id){
            isExit=true;
            cart.total+=_this.data.partData.count;
            wx.setStorage({
              key: 'cartInfo',
              data: cartArray,
            })
          }
        });
        if(!isExit){//如果点击的商品信息不是同一个那就是说 也要更新缓存数据
          //将新的商品的信息的total来进行赋值
          partData.total=_this.data.partData.count;
          cartArray.push(partData);
          wx.setStorage({
            data: cartArray,
            key: 'cartInfo',
          })

        }
        //商品数量
        _this.setBadge(cartArray);

        wx.showToast({
          title: '加入购物车成功',
          icon:'success',
          duration:3000
        })

      },
      fail:function(){
        let partData=_this.data.partData;
        //给购物车添加一个total属性
        partData.total=_this.data.partData.count;
        // console.log(partData);
        let cartArray=[];
        cartArray.push(partData);
        wx.setStorage({
          key: 'cartInfo',
          data: cartArray,
        })
        _this.setBadge(cartArray);
      }
    })
  },
  //计算有几个商品
  setBadge(cartArray){
    this.setData({
      badgeCount:cartArray.length
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
    //页面显示的东西都会显示出来，这里显示购物车的统计
    const _this=this;
    wx.getStorage({
      key: 'cartInfo',
      success:function(res){
        const cartArray=res.data;
        _this.setBadge(cartArray);
      }
    })
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