
// 搜索框下的下拉显示框高度满屏
function getFullScreen(el, attribute, num) {
  var documentHeight = 0;
  var elem = null;
  if (el) {
    elem = el;
  } else {
    alert("el获取失败，请重新输入");
  }

  var elAttr = attribute;
  var getNum = num;

  if (window.innerHeight) {
    documentHeight = window.innerHeight;
  } else {
    //clientHeight页面浏览器中可以看到内容的这个区域的高度
    if (document.body && document.body.clientHeight) {
      documentHeight = document.body.clientHeight;
    }
  }
  // ie(兼容) 获取可视区域的高宽
  if (document.documentElement && document.documentElement.clientHeight) {
    documentHeight = document.documentElement.clientHeight;
  }
  
  var heightNum = parseInt(documentHeight - parseInt(getNum));
  $(elem).css( elAttr, heightNum );

  // 返回高度值
  return heightNum;

  // // 筛选条件
  // var searchboxCondition = $(
  //   "#search>div.condition_item>div.searchbox_condition"
  // );
  // // 筛选条件下的按钮组
  // var btns = $("#search>div.condition_item>div.btns");
  // // 查询结果显示
  // var results = $("#search>div.result");

  // var sheightNum = parseInt(documentHeight - 188);
  // var btopNum = parseInt(sheightNum + 142);
  // var rheightNum = parseInt(documentHeight - 185);
  // // 筛选条件的高度
  // $(searchboxCondition).css("height", sheightNum);
  // // 按钮显示高度
  // $(btns).css("top", btopNum);
  // // 查询结果高度
  // // $(results).css('height',rheightNum);
}
