// pages/bookshelf/sonpages/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      id: 'history',
      name: '历史',
      isTap: false,
      isTwo: false
    }, {
      id: 'collection',
      name: '收藏',
      isTap: true,
      isTwo: true
    }],
    // 正文图片路径
    tiaotiaoSrc:'../../../image/jump_head.png'
  },
  // 按钮样式切换
  transButStyle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    if (id == 'history') {
      wx: wx.switchTab({
        url: '../bookshelf'
      });
    }
    // for (var i = 0, len = list.length; i < len; ++i) {
    //   if (list[i].id == id) {
    //     if (list[i].isTap == false) {
    //       // list[i].isTap = !list[i].isTap;
    //       if(i==0){
    //         wx: wx.switchTab({
    //           url:'../bookshelf'
    //         });
    //       }
    //     } else {
    //       return;
    //     }
    //   } else {
    //     list[i].isTap = false
    //   }
    // }
    // this.setData({
    //   list: list
    // });
  }
})