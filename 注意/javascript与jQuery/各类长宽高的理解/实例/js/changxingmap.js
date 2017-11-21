var map;
var zoomNormal = 14;
var zoomZone = 16;
var zoomMax = 18;
var pageall = 1;
var pagecur = 1;
var pagesize = 8;
var pageitemcount = 0;
var pagedata = null;
var YKlng = 119.92;
var YKlat = 31.02;
var circleTool, circle;
var rectTool, rec
var lay;
var onlyMapLay;
var mapsize;
var array_pict=[];
// 获取元素
function fGetElement() {
    var c = new Array();
    for (var b = 0; b < arguments.length; b++) {
        var a = arguments[b];
        // 判断是否是字符串类型
        if (typeof a == "string") {
            // 获取a
            a = document.getElementById(a)
        }
        if (arguments.length == 1) {
            return a;
        }
        c.push(a);
    }
    return c;
} 
//布局控制
var TLayoutControl = {
    // nLeftWidth 左边框的宽度
    // nTopHeight 距离上面的导航条的高度
    // nLayoutWidth 获取的浏览器文档可视区域的宽度
    // nLayoutHeight 获取的浏览器文档可视区域的高度
    // bIsFullScreen 判断地图全屏
    // nMapH 地图的高度
    // nMapW地图宽度
    // bMapSpreadState 地图状态
    // nMapMinWidth 地图的最小宽度
    // nWindowMinWidth 最大屏幕宽度
    nLeftWidth: 330, nTopHeight: 70, nLayoutWidth: 0, nLayoutHeight: 0
    , bMapSpreadState: false, bIsFullScreen: false
    , oShadeV: null, oShadeH: null, oMap: null
    , oFullScreen: null, nMapH: 0
    , nMapW: 0, aDomAry: [], nWindowMinWidth: 1024, nMapMinWidth: 694
    , fInitLayout: function () {//初始化布局
        var b = this;
        // 窗口的文档显示区的宽度 window.innerWidth
        if (window.innerWidth) {
            this.nLayoutWidth = window.innerWidth
        } else { //ie（兼容）中获取窗口的文档显示区的宽度
            if ((document.body) && (document.body.clientWidth)) {
                this.nLayoutWidth = document.body.clientWidth
            }
        }
        if (window.innerHeight) {
            this.nLayoutHeight = window.innerHeight;
        } else {
            //clientHeight页面浏览器中可以看到内容的这个区域的高度
            if ((document.body) && (document.body.clientHeight)) {
                this.nLayoutHeight = document.body.clientHeight;
            }
        }
        // ie(兼容) 获取可视区域的高宽
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            this.nLayoutHeight = document.documentElement.clientHeight;
            this.nLayoutWidth = document.documentElement.clientWidth;
        }
        // 不是全屏
        if (!this.bIsFullScreen) {
            // 地图的宽度=可视区域的宽度-左边框的宽度
            this.nMapW = this.nLayoutWidth - this.nLeftWidth;
            this.nMapH = this.nLayoutHeight - this.nTopHeight - 28;
        } else {//全屏时
            // 地图的宽度=可视区域的宽度
            this.nMapW = this.nLayoutWidth; 
            this.nMapH = this.nLayoutHeight - 28;
        }
        //地图不是为展开状态
        if (!this.bMapSpreadState) {
            // 地图的宽度=可视区域的宽度-左边框的宽度
            this.nMapW = this.nLayoutWidth - this.nLeftWidth;
            // 地图的宽度小于最小地图宽度时地图的宽度就是最小地图宽度
            this.nMapW = this.nMapW < this.nMapMinWidth ? this.nMapMinWidth : this.nMapW
        } else {//地图是展开状态
            // 地图的宽度=可视区域的宽度
            this.nMapW = this.nLayoutWidth;
            // 地图的宽度大于最大屏幕宽度时地图的宽度就是最大屏幕宽度
            this.nMapW = this.nMapW < this.nWindowMinWidth ? this.nWindowMinWidth : this.nMapW;
        }
        // 获取元素
        if (this.aDomAry.length <= 4) {
            this.aDomAry = fGetElement("map", "tool_container", "mapSpread", "content");
        }
        this.oMap = this.aDomAry[0];
        // 地图最大宽度限制
        this.oMap.style.width = (this.nMapW < this.nMapMinWidth ? this.nMapMinWidth : this.nMapW) + "px";
        this.oMap.style.height = this.nMapH + "px";
        var a = parseInt(this.nMapH / 2 + 90);
        if (a < 150) {
            a = 150;
        }
        // 获取全屏按钮对象
        var varFullScreen = document.getElementById("fullScreen");
        // 没有该对象跳出
        if(varFullScreen==null || varFullScreen==undefined ||varFullScreen==''){
            return;
        }else{
            // 点击进行地图大小的矫正
            varFullScreen.onclick = function () {
                b.fMidifyLayout(this);
            }
        }
        // 获取清屏按钮对象
        var varBClear = document.getElementById("bClear");
        //通用针对两个版本 清除地图上所有覆盖物。
        varBClear.onclick = function () {
            map.clearOverLays();
        }
    }
    , fMidifyLayout: function (c) {//修正布局
        var d = c.id;
        if (d == "mapSpread") {
            // 地图折叠状态
            if (this.bMapSpreadState) {
                this.bMapSpreadState = false;
                this.nMapW = this.nMapW - this.nLeftWidth;
                this.oMap.style.width = this.nMapW + "px";
            } else {//地图展开状态
                this.bMapSpreadState = true;
                this.nMapW = this.nMapW + this.nLeftWidth;
                this.oMap.style.width = this.nMapW + "px";
                map.checkResize();//通用针对两个版本 通知地图其容器大小已更改。在更改了容器对象的大小后调用此方法，以便地图能够调整自己适合于新的大小。
            }
        }
        if (d == "fullScreen") {
            var b = fGetElement("header");
            var a = fGetElement("sidebar");
            if (this.bIsFullScreen) {
                b.style.display = "block";
                this.bIsFullScreen = false;
                if (this.bMapSpreadState) {
                    this.nMapW = this.nMapW - this.nLeftWidth;
                } else {
                    this.nMapW = this.nMapW;
                }
                this.nMapH = this.nMapH - this.nTopHeight; this.bMapSpreadState = false;
                this.oMap.style.width = this.nMapW + "px";
                this.oMap.style.height = this.nMapH + "px";
                var e = fGetElement("fullScreen");
                e.innerHTML = "<a href='javascript:void(0)' class='screenbg'><span class='scrlabel'></span>全屏</a>";
            } else {
                b.style.display = "none";
                this.bIsFullScreen = true;
                if (this.bMapSpreadState) {
                    this.nMapW = this.nMapW;
                } else {
                    this.nMapW = this.nMapW + this.nLeftWidth;
                }
                this.nMapH = this.nMapH + this.nTopHeight;
                this.bMapSpreadState = true;
                this.oMap.style.width = this.nMapW + "px";
                this.oMap.style.height = this.nMapH + "px";
                var varFullScreen = fGetElement("fullScreen");
                varFullScreen.innerHTML = "<a href='javascript:void(0)' class='screenbg'><span class='scrlabelout'></span>退出</a>";
            }
            a.style.height = (this.nMapH + 28) + "px";
            map.checkResize();//通用针对两个版本 通知地图其容器大小已更改。在更改了容器对象的大小后调用此方法，以便地图能够调整自己适合于新的大小。
        }
    }
    , fWinResizeHandle: function () {//调整可视框大小
        this.fInitLayout();//初始化
        // 查找方法有
        if(typeof map.checkResize == 'function'){
            map.checkResize();//通用针对两个版本 通知地图其容器大小已更改。在更改了容器对象的大小后调用此方法，以便地图能够调整自己适合于新的大小。
        }else{
            return;
        }
        this.fModifyChannelList();
    }
    , fModifyChannelList: function () {//修正通道列表
    }
};
// 初始化布局
TLayoutControl.fInitLayout();
// 地图大小调整时调用
window.onresize = function () {
    // ie中长宽不变就跳出
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        var a = document.documentElement.clientHeight;
        var b = document.documentElement.clientWidth;
        if (b === TLayoutControl.nLayoutWidth && a === TLayoutControl.nLayoutHeight) {
            return;
        }
    }
    TLayoutControl.fWinResizeHandle();
};

function loadmap() {
    //初始化地图对象 
    map = new T.Map("map");
    //设置显示地图的中心点和级别 
    map.centerAndZoom(new T.LngLat(YKlng, YKlat), zoomNormal);
}