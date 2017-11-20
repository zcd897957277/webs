/***1 异步请求页头和页尾***/
$('#header').load('header.php',function(){
  //页头加载完成再修改欢迎消息
  $('#welcome').html('欢迎回来：'+loginName);
});
$('#footer').load('footer.php');
//获取当前的登录用户名
var s = location.search; //当前地址栏中URL中的查询字符串部分
var loginName = s.substring(s.indexOf('=')+1);
//alert('欢迎回来：'+loginName);


/***2 异步请求当前登录用户的购物车内容***/
$.getJSON('data/4_cart_detail.php',{'uname':loginName}, function(arr){
  //console.log('开始处理购物车详情数据');
  //console.log(arr);
  var html = '';
  $.each(arr, function(i,p){
    html += `
      <tr>
        <td>
            <input type="checkbox"/>
            <input type="hidden" name="did" value="${p.did}" />
            <div><img src="${p.pic}" alt=""/></div>
        </td>
        <td><a href="">${p.pname}</a></td>
        <td>￥${p.price}</td>
        <td>
            <button class="minus">-</button><input type="text" value="${p.count}"/><button class="plus" data-did="${p.did}">+</button>
        </td>
        <td><span>1199.00</span></td>
        <td><a href="${p.did}">删除</a></td>
      </tr>
    `;
  })
  $('#cart tbody').html(html);
})

/***3 点击+和-按钮修改购物车中的内容***/
//必须使用事件代理
$('#cart').on('click','.plus', function(){
  var count = $(this).prev().val();
  count++;
  $(this).prev().val(count);
  var did = $(this).data('did');
  ////异步请求，把更改后的数量提交给服务器
  $.post('data/4_cart_update.php',{'count':count, 'did':did}, function(txt){
    console.log('服务器返回的修改结果：'+txt);
  })
})

