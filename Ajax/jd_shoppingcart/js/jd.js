/***1 异步加载页头和页尾 ****/
$(function(){
  $('#header').load('header.php');
  $('#footer').load('footer.php');
});


$(function(){
  /*$('#bt-login').click(function(){
    alert(123);
  });*/
  //通过事件代理为异步加载元素绑定事件监听
  //$(document.body).on('click','#bt-login',function(){
  //  alert(123);
  //});
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


/***3 产品列表页加载完成，异步请求第1页记录 ****/
$(function(){
  loadProduct(1);
})
//为分页条中超链接代理事件监听
$('.pager').on('click','a', function(e){
  e.preventDefault();
  var pno = $(this).attr('href'); //目标页号
  loadProduct(pno);
})
///异步分页加载商品列表
function loadProduct(pno){
  //$.get  $.getJSON  $.ajax
  $.getJSON('data/2_product_select_v2.php',{'pno':pno},function(pager){
    //console.log('开始处理响应数据-产品列表');
    //console.log(pager);
    //1 构建产品列表的内容
    var html = '';
    $.each(pager.data, function(i,p){
      html += `
        <li>
          <a href=""><img src="${p.pic}" alt=""/></a>
          <p>￥${p.price}</p>
          <h1><a href="">${p.pname}</a></h1>
          <div>
              <a href="" class="contrast"><i></i>对比</a>
              <a href="" class="p-operate"><i></i>关注</a>
              <a href="${p.pid}" class="addcart"><i></i>加入购物车</a>
          </div>
        </li>  
      `;
    });
    $('#plist ul').html(html);
    //2 构建分页条中的内容
    var pagerHtml = '';
    if(pager.pno-2>0){
      pagerHtml += `<li><a href="${pager.pno-2}">${pager.pno-2}</a></li> `;
    }
    if(pager.pno-1>0){
      pagerHtml += `<li><a href="${pager.pno-1}">${pager.pno-1}</a></li> `;
    }
    pagerHtml += `<li class="active"><a href="#">${pager.pno}</a></li> `;
    if(pager.pno+1<=pager.pageCount){
      pagerHtml += `<li><a href="${pager.pno+1}">${pager.pno+1}</a></li> `;
    }
    if(pager.pno+2<=pager.pageCount){
      pagerHtml += `<li><a href="${pager.pno+2}">${pager.pno+2}</a></li> `;
    }

    $('.pager').html(pagerHtml);
  })
}

/***4 点击“去购物车结算”，做页面同步跳转 ****/
//必须使用事件代理
$(document.body).on('click','#settle_up',function(){
  //同步页面跳转  window.open  location.href ...
  location.href="shoppingcart.html?loginName="+loginName;
})