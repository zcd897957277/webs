// search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索框内的值
    inputValue:'',
    // 刷新图片路径
    refreshSrc:'../../image/refresh_03.png',
    // 删除图片路径
    deleteSrc:'../../image/delete_03.png',
    // 热门搜索列表
    hotSearch_list:[
      {
        hotSearch_id:'nxzdtssy',
        hotSearch_name:'女校长的贴身神医'
      }, {
        hotSearch_id: 'dsqmys',
        hotSearch_name: '都市奇门医圣'
      }, {
        hotSearch_id: 'qmsqyd',
        hotSearch_name: '权谋：升迁有道'
      }, {
        hotSearch_id: 'zqsjxt',
        hotSearch_name: '最强升级系统'
      }, {
        hotSearch_id: 'dszqnzz',
        hotSearch_name: '都市之全能至尊'
      }, {
        hotSearch_id: 'tfws',
        hotSearch_name: '天赋武神'
      }, {
        hotSearch_id: 'gjgcq',
        hotSearch_name: '古井观传奇'
      }, {
        hotSearch_id: 'xhdtsgs',
        hotSearch_name: '校花的透视高手'
      }, {
        hotSearch_id: 'snjhypdy',
        hotSearch_name: '庶女惊华：一品毒医'
      }
    ],
    // 搜索历史
    searchHistoryData: []
  },
  // 获取搜索框中输入的痕迹
  displayMark:function(e){
    var val=e.detail.value;
    var data = this.data.searchHistoryData;
    if(val){
      data.push({
        searchHistory_id:val,
        searchHistory_name:val
      });
    }else{
      return;
    }
    this.setData({
      searchHistoryData: data,
      inputValue:''
    });
  },
  // 删除历史记录
  deleteHistory:function(e){
    this.setData({
      searchHistoryData: []
    });
  }
})