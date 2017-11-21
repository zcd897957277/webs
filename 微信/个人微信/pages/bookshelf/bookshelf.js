// bookshelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      id:'history',
      name:'历史',
      isTap:true,
      isTwo:false
    },{
      id:'collection',
      name:'收藏',
      isTap:false,
      isTwo:true
    }],
    listBooks:[{
      id:'book1',
      name:'宝贝你好甜',
      text:'宝贝你好甜',
      iconPath:'../../image/images/book1.png',
      isShow:false
    }, {
      id: 'book2',
      name: '终极教官',
      text:'终极教官',
      iconPath: '../../image/images/book2.png',
      isShow: false
    }, {
        id: 'book3',
        name: '邪魅总裁暖床来',
        text:'邪魅总裁暖床来',
        iconPath: '../../image/images/book3.png',
        isShow: false
    }, {
      id: 'book4',
      name: '地府我开的',
      text:'地府我开的',
      iconPath: '../../image/images/book4.png',
      isShow: false
    }, {
        id: 'book5',
        name: '美女总裁的贴身保镖',
        text:'美女总裁的贴身保镖',
        iconPath: '../../image/images/book5.png',
        isShow: false
    }, {
      id: 'book6',
      name: '先婚后宠：总裁大人小娇妻',
      text:'先婚后宠：总裁大人小娇妻',
      iconPath: '../../image/images/book6.png',
      isShow: false
    }, {
        id: 'book7',
        name: '发个红包去天庭',
        text:'发个红包去天庭',
        iconPath: '../../image/images/book7.png',
        isShow: false
    }, {
      id: 'book-index',
      name: '',
      text: '',
      iconPath: '../../image/images/bookIndex.png',
      isShow: false
    }],
    scrollViewTip:[{
      id:'cszlzsd',
      name:'重生之领主时代',
      text:'当七曜奇观现世，水蓝星异变突发。'
    },{
      id:'msj',
      name:'牧神记',
      text:'大墟的祖训说，天黑，别出门。'
    }, {
        id: 'msj2',
        name: '牧神记',
        text: '大墟的祖训说，天黑，别出门。'
    },{
      id:'mrwljt',
      name:'末日亡灵军团',
      text:'末日降临，丧尸肆虐，法律、秩序被摧毁，文明社会彻底崩塌，人类进入黑暗末世。'
    }],
    // 是否显示面板指示点
    indicatorDots: false,
    // 指示点颜色
    indicatorColor: '#a7a8a2',
    // 当前选中的指示点颜色
    indicatorActiveColor: '#50a4fc',
    autoplay: true,
    // 自动切换时间间隔
    interval: 2000,
    // 滑动动画时长
    duration: 1000,
    // 是否采用衔接滑动
    circular: true,
    // 轮播的当前页码
    current:''
  },
  // 按钮样式切换
  transButStyle:function(e){
    var id=e.currentTarget.id,list=this.data.list;
    if (id == 'collection') {
      wx: wx.redirectTo({
        url: 'sonpages/collection'
      })
    }
    // for (var i = 0, len = list.length; i < len; ++i) {
    //   if (list[i].id == id) {
    //     if (list[i].isTap==false){
    //       // list[i].isTap = !list[i].isTap;
    //       if(i==1){
    //         wx: wx.redirectTo({
    //           url: 'sonpages/collection'
    //         })
    //       }
    //     }else{
    //       return;
    //     }
    //   } else {
    //     list[i].isTap = false
    //   }
    // }
    // this.setData({
    //   list: list
    // });
  },
  // 小说管理
  managementBooks:function(e){

  },
  // 轮播项删除
  deleteCarouselItem:function(e){
    if (e.currentTarget.id){
      var id = e.currentTarget.id, scrollViewTip = this.data.scrollViewTip;
      for (var i = 0, len = scrollViewTip.length; i < len; ++i) {
        if (scrollViewTip[i].id == id) {
          scrollViewTip.splice(i, 1);
          if(i==(len-1)){
            this.setData({
              current: 0
            });
          }
          this.setData({
            scrollViewTip: scrollViewTip
          });
          return;
        }
      }
    }else{
      return;
    }    
  }
})