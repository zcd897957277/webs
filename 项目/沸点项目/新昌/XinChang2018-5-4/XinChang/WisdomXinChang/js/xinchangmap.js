var zoomNormal = 14;
var zoomZone = 16;
var zoomMax = 18;
var XClng = 120.90385;
var XClat = 29.49983;

//布局控制
var TLayoutControl = {
  // nMapH 地图的高度
  // nMapW地图宽度
  // nMapMinWidth 地图的最小宽度
  oMap: null,
  oFullScreen: null,
  nMapH: 0,
  nMapW: 0,
  aDomAry: [],
  nMapMinWidth: 694,
  fInitLayout: function() {
    //初始化布局
    var b = this;
    // 窗口的文档显示区的宽度 window.innerWidth
    if (window.innerWidth) {
      this.nMapW = window.innerWidth;
    } else {
      //ie（兼容）中获取窗口的文档显示区的宽度
      if (document.body && document.body.clientWidth) {
        this.nMapW = document.body.clientWidth;
      }
    }
    if (window.innerHeight) {
      this.nMapH = window.innerHeight;
    } else {
      //clientHeight页面浏览器中可以看到内容的这个区域的高度
      if (document.body && document.body.clientHeight) {
        this.nMapH = document.body.clientHeight;
      }
    }
    // ie(兼容) 获取可视区域的高宽
    if (
      document.documentElement &&
      document.documentElement.clientHeight &&
      document.documentElement.clientWidth
    ) {
      this.nMapH = document.documentElement.clientHeight;
      this.nMapW = document.documentElement.clientWidth;
    }
    // 获取元素
    if (this.aDomAry.length <= 3) {
      this.aDomAry = fGetElement("map", "tool_container", "content");
    }
    this.oMap = this.aDomAry[0];
    // 地图最大宽度限制
    this.oMap.style.width =
      (this.nMapW < this.nMapMinWidth ? this.nMapMinWidth : this.nMapW) + "px";
    this.oMap.style.height = this.nMapH + "px";
    // 获取全屏按钮对象
    var varFullScreen = document.getElementById("fullScreen");
    // 没有该对象跳出
    if (
      varFullScreen == null ||
      varFullScreen == undefined ||
      varFullScreen == ""
    ) {
      return;
    } else {
      // 点击进行地图大小的矫正
      varFullScreen.onclick = function() {
        b.fMidifyLayout(this);
      };
    }
    // 获取清屏按钮对象
    var varBClear = document.getElementById("bClear");
    //通用针对两个版本 清除地图上所有覆盖物。
    varBClear.onclick = function() {
      var divs = $(this.oMap)
        .children("div.tdt-map-pane")
        .children("div");
      for (var i = 1; i < divs.length; i++) {
        if (i == 2) {
          $($(divs)[i])
            .children("div")
            .remove();
          $($(divs)[i])
            .children("svg")
            .children("g")
            .empty();
        } else {
          $($(divs)[i]).empty();
        }
      }
    }.bind(this);
  },
  fMidifyLayout: function(c) {
    //修正布局
    var d = c.id;
    var span = $(c).find("a.screenbg>span");
    if (d == "fullScreen" && $(span).hasClass("scrlabel")) {
      var e = fGetElement("fullScreen");
      var docElm = document.documentElement;
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
      var isIE =
        userAgent.indexOf("compatible") > -1 &&
        userAgent.indexOf("MSIE") > -1 &&
        !isOpera; //判断是否IE浏览器
      // ie
      if (isIE) {
        var wsh = new ActiveXObject("WScript.Shell");
        wsh.sendKeys("{F11}");
      }
      // safari
      //     if (userAgent.indexOf("Safari") > -1) {
      //         alert('当前Safari浏览器版本过低，为了更好的体验请升级至最新版本！')
      //     }
      //W3C
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }
      //FireFox
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      }
      //Chrome等
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
      //edge
      else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
      e.innerHTML =
        "<a href='javascript:void(0)' class='screenbg'><span class='scrlabel_exit'></span>退出</a>";
      map.checkResize(); //通用针对两个版本 通知地图其容器大小已更改。在更改了容器对象的大小后调用此方法，以便地图能够调整自己适合于新的大小。
    } else if (d == "fullScreen" && $(span).hasClass("scrlabel_exit")) {
      var e = fGetElement("fullScreen");
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
      var isIE =
        userAgent.indexOf("compatible") > -1 &&
        userAgent.indexOf("MSIE") > -1 &&
        !isOpera; //判断是否IE浏览器
      if (isIE) {
        var wsh = new ActiveXObject("WScript.Shell");
        wsh.sendKeys("{F11}");
      }
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      e.innerHTML =
        "<a href='javascript:void(0)' class='screenbg'><span class='scrlabel'></span>全屏</a>";
      map.checkResize();
    }
  },
  fWinResizeHandle: function() {
    //调整可视框大小
    this.fInitLayout(); //初始化
    // 查找方法有
    if (typeof map.checkResize == "function") {
      map.checkResize(); //通用针对两个版本 通知地图其容器大小已更改。在更改了容器对象的大小后调用此方法，以便地图能够调整自己适合于新的大小。
    } else {
      return;
    }
  }
};
// 初始化布局
TLayoutControl.fInitLayout();
// 地图大小调整时调用
window.onresize = function() {
  // ie中长宽不变就跳出
  if (
    document.documentElement &&
    document.documentElement.clientHeight &&
    document.documentElement.clientWidth
  ) {
    var a = document.documentElement.clientHeight;
    var b = document.documentElement.clientWidth;
    if (
      b === TLayoutControl.nLayoutWidth &&
      a === TLayoutControl.nLayoutHeight
    ) {
      return;
    }
  }
  TLayoutControl.fWinResizeHandle();

  // 高度满屏
  // 筛选条件
  getFullScreen("#search>div.condition_item>div.searchbox_condition", "height", 188);
  // 筛选条件下的按钮组
  getFullScreen("#search>div.condition_item>div.btns", "top", 47);
   // 查询结果显示
   getFullScreen("#search>div.result", "height", 185);
};

function loadmap() {
  //初始化地图对象
  map = new T.Map("map");
  //设置显示地图的中心点和级别
  map.centerAndZoom(new T.LngLat(XClng, XClat), zoomNormal);
  // 缩放控件的配置
  var config = {
    position: T_ANCHOR_BOTTOM_RIGHT, //  控件初始位置，在四角位置之一。
    zoomInText: "+", // 放大层级按钮的文字显示。
    zoomOutText: "-", // 缩小层级按钮的文字显示。
    zoomInTitle: "放大", // 放大层级按钮的标题显示。
    zoomOutTitle: "缩小"
  };
  //创建一个地图缩放控件。
  var control = new T.Control.Zoom(config);
  // 添加控件
  map.addControl(control);
}
