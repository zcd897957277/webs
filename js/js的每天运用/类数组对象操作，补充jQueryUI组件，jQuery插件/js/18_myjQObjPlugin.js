/**
*我的jQuery对象函数库(Library)，基于jQuery而编写
*/
if(!window.jQuery){
  throw new Error('我的函数库依赖于jQuery');
}

/***
* 手风琴插件函数
* 调用方法：  $('.parent').accordion()
*/
jQuery.fn.accordion = function(){
  //this => jQuery对象，类数组对象
  //修改h3的样式
  this.children('h3').css({
    background: '#ddd',
    padding: '8px 0',
    cursor: 'pointer'
  }).click(function(){
    //this => h3 DOM对象
    $(this).next().slideToggle(300);
  });
}


/***
* 标签页插件函数
* 调用方法：  $('.parent').tabs()
*/
jQuery.fn.tabs = function(){
  //this => 类数组对象
  //修改样式
  this.find('ul > li').css({
    display: 'inline-block'
  });
  this.children('div:not(:first)').css({
    display: 'none'
  });
  //为a添加事件监听
  this.find('ul > li > a').click(function(e){
    e.preventDefault();
    //this=>事件源对象 a DOM对象
    var id = $(this).attr('href');
    $(id).show().siblings('div').hide();
  });
}
