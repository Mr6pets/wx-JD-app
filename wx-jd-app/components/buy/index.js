// components/buy/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideBuy:{
      type:Boolean,
      value:true
    },
    partData:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideBuyView(e){
      if(e.target.dataset.target=="self"){
        this.setData({
          hideBuy:true
        })
      }
    },
    getCount(e){
      // console.log(e);
      // 再次进行传递到父级
      this.triggerEvent("onGetCount",e.detail)
    },
    buy(e){
      this.setData({
        hideBuy:true
      })
      //触发父级的事件 添加购物车
      this.triggerEvent("buyEvent");
    }
  }
})
