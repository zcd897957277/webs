
// �������µ�������ʾ��߶�����
function getFullScreen(el, attribute, num) {
  var documentHeight = 0;
  var elem = null;
  if (el) {
    elem = el;
  } else {
    alert("el��ȡʧ�ܣ�����������");
  }

  var elAttr = attribute;
  var getNum = num;

  if (window.innerHeight) {
    documentHeight = window.innerHeight;
  } else {
    //clientHeightҳ��������п��Կ������ݵ��������ĸ߶�
    if (document.body && document.body.clientHeight) {
      documentHeight = document.body.clientHeight;
    }
  }
  // ie(����) ��ȡ��������ĸ߿�
  if (document.documentElement && document.documentElement.clientHeight) {
    documentHeight = document.documentElement.clientHeight;
  }
  
  var heightNum = parseInt(documentHeight - parseInt(getNum));
  $(elem).css( elAttr, heightNum );

  // ���ظ߶�ֵ
  return heightNum;

  // // ɸѡ����
  // var searchboxCondition = $(
  //   "#search>div.condition_item>div.searchbox_condition"
  // );
  // // ɸѡ�����µİ�ť��
  // var btns = $("#search>div.condition_item>div.btns");
  // // ��ѯ�����ʾ
  // var results = $("#search>div.result");

  // var sheightNum = parseInt(documentHeight - 188);
  // var btopNum = parseInt(sheightNum + 142);
  // var rheightNum = parseInt(documentHeight - 185);
  // // ɸѡ�����ĸ߶�
  // $(searchboxCondition).css("height", sheightNum);
  // // ��ť��ʾ�߶�
  // $(btns).css("top", btopNum);
  // // ��ѯ����߶�
  // // $(results).css('height',rheightNum);
}
