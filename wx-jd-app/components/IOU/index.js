// components/IOU/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideBaitiao:{
      type:Boolean,
      value:true
    },
    baitiao:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectIndex:0//默认选中的下标
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideBaitiaoView(e){
      //组件上有data-target="self" 的左右就是做标记
      //e.target.dataset.targe可以拿到自己定义的值
      if(e.target.dataset.target=="self"){
        this.setData({
          hideBaitiao:true
        })
      }
      
    },
    selectItem(e){
      // 拿到当前点击的下标
      let index=e.currentTarget.dataset.index;
      let baitiao =this.data.baitiao;
      for(let i=0;i<baitiao.length;i++){
        baitiao[i].select=false;
      }
      baitiao[index].select = !baitiao[index].select;
      //选择过后重新更新下数据
      this.setData({
        baitiao:baitiao,
        selectIndex: index
      })
    },
    //立即打白条
    makeBaitiao(){
      //隐藏弹出框
      this.setData({
        hideBaitiao:true
        
      })
      //将选中的内容存储在selectItem
      const selectItem = this.data.baitiao[this.data.selectIndex];
      //事件传递
      this.triggerEvent("updateSelect",selectItem)

    }
  }
})
