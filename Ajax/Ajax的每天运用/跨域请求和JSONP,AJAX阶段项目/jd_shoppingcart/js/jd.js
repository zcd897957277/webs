/***1 异步加载页头和页尾 ****/
$(function(){
  $('#header').load('header.php');
  $('#footer').load('footer.php');
});


/***2 点击登录按钮，异步验证用户名和密码 ****/
var loginName = null; //当前登录的用户名
$('#bt-login').click(function(){
  //把用户的输入序列化为k=v字符串
  var data = $('#login-form').serialize();
  //$.ajax  $.post
  $.post('data/1_login.php', data, function(obj){
    //console.log('开始处理登录验证结果');
    //console.log(arguments);
    if(obj.code===1000){ //验证成功
      $('.modal').fadeOut();  //摸态框淡出
      loginName = $('[name="uname"]').val();
      $('#welcome').html('欢迎回来：'+loginName);
    }else {
      $('.modal .alert').html(obj.msg);
    }
  });
});