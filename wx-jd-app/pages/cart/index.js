// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray:[]// 存放商品信息
    ,totalMoney:"0.00"//选中商品的总价
    ,totalCount:0//选中商品的总个数
    ,selectAll:false//全选按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getCount(e){
    //更新最新的count值
    const index =e.currentTarget.dataset.index;
    const cartArray=this.data.cartArray;
    //这里是找到点击那个商品将里面组件的加减值传递到这里更新加减值
    cartArray[index].total=e.detail.val;
    //将data中值更新
    this.setData({
      cartArray:cartArray
    })
  },
  //跳转到详情
  switchGoodsDetail(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray
    wx.navigateTo({
      url: '/pages/detail/index?id=' + cartArray[index].id,
    })
  },
  selectGoods(e){//点击选中的按钮执行的函数
    const index=e.currentTarget.dataset.index;
    const cartArray=this.data.cartArray;
    //计算合计
    let totalMoney=Number(this.data.totalMoney);
    let totalCount=this.data.totalCount;

    let selectAll=this.data.selectAll;
    //设置选中或者不选中的状态
    cartArray[index].select=!cartArray[index].select

    //如果是选中状态
    if(cartArray[index].select){
      totalMoney += Number(cartArray[index].price) * cartArray[index].total
      totalCount++
    }else{//没有选中
      totalMoney-=Number(cartArray[index].price )* cartArray[index].total;
      totalCount--
      //当我没有选中的时候，也该表全选在状态
      selectAll=false;
    }

    //更新数据
    this.setData({
      cartArray:cartArray,
      totalMoney:String(totalMoney.toFixed(2)),
      totalCount:totalCount,
      selectAll:selectAll
    })
  },
  subCount(e){
    const index = e.currentTarget.dataset.index
    const cartArray = this.data.cartArray
    let totalMoney = Number(this.data.totalMoney)
    // 计算金额
    if (cartArray[index].select) {
      totalMoney -= Number(cartArray[index].price)
    }
    this.setData({
      totalMoney: String(totalMoney.toFixed(2))
    })
  },
  addCount(e){
    const index=e.currentTarget.dataset.index;
    const cartArray=this.data.cartArray;

    let totalMoney=Number(this.data.totalMoney);

    //计算金额
    if(cartArray[index].select){
      totalMoney+=Number(cartArray[index].price) * cartArray[index].total
    }

    //更新数据
    this.setData({
      totalMoney:String(totalMoney.toFixed(2))
    })
  },
  selectAll(){//点击全选按钮
    const cartArray=this.data.cartArray;
    let totalCount=0;
    let totalMoney=0;
    let selectAll=this.data.selectAll;
    
    //点击全选按钮，取反这个值
    selectAll=!selectAll;
    cartArray.forEach(item=>{//遍历所有的对象中的select属性为 true或者false
      item.select=selectAll;
      //如果全部选中计算总价
      if(item.select){
        totalMoney+=Number(item.price)*item.total;
        totalCount++
      }else{//如果都不选 那就是全部为0
        totalMoney=0;
        totalCount=0;
      }
    })
    //更新数据
    this.setData({
      cartArray:cartArray,
      totalMoney:String(totalMoney.toFixed(2)),
      totalCount:totalCount,
      selectAll:selectAll 
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
    var _this=this;
    //点击购物车进来就拿storage的数据
    wx.getStorage({
      key: 'cartInfo',
      success:(res)=>{
        const cartArray=res.data;
        cartArray.forEach(cart=>{//遍历数组将每个对象中添加一个select=false的属性
          cart.select=false;//全都不选中
        })
        _this.setData({
          cartArray:cartArray,
          //离开在进来就初始化,这样就没错进来都初始化
          selectAll:false,
          totalMoney:"0.00",
          totalCount:0
        })
        //设置tabbar图标
        cartArray.length>0?
        wx.setTabBarBadge({
          index: 2,
          text: String(cartArray.length),
        }):wx.removeTabBarBadge({
         index: 2
       })
      }
      
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //当离开页面的时候，更新页面storage
    const cartArray=this.data.cartArray;
    wx.setStorage({
      data: cartArray,
      key: 'cartInfo',
    })
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