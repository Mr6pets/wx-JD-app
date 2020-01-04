// components/infocell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //定义接受来自父节点的传递的属性
    //目前接受的type的类型有以下几种，
    //String Number Boolean Object Array ,null (表示任意类型)
    title:{
      type:String,
      value:''
    },
    desc:{
      type:String,
      value:''
    }

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
    popView:function(){
      // console.log(123);
      //注册事件
      this.triggerEvent("popView");
    }
  }
})
