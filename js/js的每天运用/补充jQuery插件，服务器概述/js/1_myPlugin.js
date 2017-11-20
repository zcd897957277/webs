if(!window.jQuery){
  throw new Error('我的插件必须依赖于jQuery');
}

jQuery.fn.affixLayout = function(){
  //this => $('..')  类数组对象
  this.find('.affix ul li a').click(function(e){
    e.preventDefault();
    //this => 事件源  a

    //1修改附加导航中li的active
    $(this).parent().addClass('active').siblings('.active').removeClass('active');
    //2修改.main中div的active
    $($(this).attr('href')).addClass('active').siblings('.active').removeClass('active');
  });
}