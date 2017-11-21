var map;
var zoomNormal = 14;
var zoomZone = 16;
var zoomMax = 18;
var YKlng = 119.92;
var YKlat = 31.02;
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
    // nMapH 地图的高度
    // nMapW地图宽度
    // nMapMinWidth 地图的最小宽度
    // nWindowMinWidth 最大屏幕宽度
    oMap: null, oFullScreen: null, nMapH: 0
    , nMapW: 0, aDomAry: [], nWindowMinWidth: 1024, nMapMinWidth: 694
    , fInitLayout: function () {//初始化布局
        var b = this;
        // 窗口的文档显示区的宽度 window.innerWidth
        if (window.innerWidth) {
            this.nMapW = window.innerWidth;
        } else { //ie（兼容）中获取窗口的文档显示区的宽度
            if ((document.body) && (document.body.clientWidth)) {
                this.nMapW = document.body.clientWidth;
            }
        }
        if (window.innerHeight) {
            this.nMapH = window.innerHeight;
        } else {
            //clientHeight页面浏览器中可以看到内容的这个区域的高度
            if ((document.body) && (document.body.clientHeight)) {
                this.nMapH = document.body.clientHeight;
            }
        }
        // ie(兼容) 获取可视区域的高宽
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            this.nMapH = document.documentElement.clientHeight;
            this.nMapW = document.documentElement.clientWidth;
            // 地图的宽度小于最小地图宽度时地图的宽度就是最小地图宽度
            //this.nMapW = this.nMapW < this.nMapMinWidth ? this.nMapMinWidth : this.nMapW
        }
        // 获取元素
        if (this.aDomAry.length <= 3) {
            this.aDomAry = fGetElement("map", "tool_container", "mapSpread", "content");
        }
        this.oMap = this.aDomAry[0];
        // 地图最大宽度限制
        this.oMap.style.width = (this.nMapW < this.nMapMinWidth ? this.nMapMinWidth : this.nMapW) + "px";
        this.oMap.style.height = this.nMapH + "px";
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
            for(var i=1;i<($(this.oMap).children('div.tdt-map-pane').children('div')).length;i++){
                if(i==2){
                    $($($(this.oMap).children('div.tdt-map-pane').children('div'))[i]).children('div').remove();
                    $($($(this.oMap).children('div.tdt-map-pane').children('div'))[i]).children('svg').children('g').empty();
                }else{
                    $($($(this.oMap).children('div.tdt-map-pane').children('div'))[i]).empty();
                }
            }
        }.bind(this)
    }
    , fMidifyLayout: function (c) {//修正布局
        var d = c.id;
        if (d == "fullScreen") {
            this.nMapW = this.nMapW;
            this.nMapH = this.nMapH;
            this.oMap.style.width = this.nMapW + "px";
            this.oMap.style.height = this.nMapH + "px";
            var e = fGetElement("fullScreen");
            e.innerHTML = "<a href='javascript:void(0)' class='screenbg'><span class='scrlabel'></span>全屏</a>";
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
    // 缩放控件的配置
    var config={
        position:T_ANCHOR_BOTTOM_RIGHT,//  控件初始位置，在四角位置之一。
        zoomInText:"+",// 放大层级按钮的文字显示。
        zoomOutText:"-",// 缩小层级按钮的文字显示。
        zoomInTitle:"放大",// 放大层级按钮的标题显示。
        zoomOutTitle:"缩小"
    };
    //创建一个地图缩放控件。
    var control=new T.Control.Zoom(config);
    // // 添加控件
    map.addControl(control);
}