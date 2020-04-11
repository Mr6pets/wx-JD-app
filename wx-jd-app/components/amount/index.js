// components/amount/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count:{
      type:Number,
      value:1
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
    inputChangeHandle(e){
      // console.log(e);
      var value=e.detail.value;
      //将获取的数据值存放在一个myEventDetail的对象中
      var myEventDetail={
        val:value
      }
      //数据改变时，向父组件传递新数据
      this.triggerEvent("myevent",myEventDetail);
    },
    subtract(e){
      let count=this.data.count;
      count>1 ? count-- : 1;
      this.setData({
        count:count
      })
      var myEventDetail={
        val:count
      }
      //数据发生变化向父亲节点传递
      this.triggerEvent("myevent",myEventDetail);

      //接口处留存 点击减号触发
      this.triggerEvent("subevent");

    },
    add(e){
      let count=this.data.count;
      this.setData({
        count:++count
      })
      var myEventDetail={
        val:count
      }
      this.triggerEvent("myevent",myEventDetail);

      //接口处留存 点击加号触发
      this.triggerEvent("addevent");
    }
  }
})
