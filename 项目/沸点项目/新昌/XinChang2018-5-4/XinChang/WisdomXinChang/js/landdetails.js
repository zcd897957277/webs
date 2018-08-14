var zoomNormal = 14;
var zoomZone = 16;
var zoomMax = 18;
var XClng = 120.90385;
var XClat = 29.49983;
// 土地详情页设置
//布局控制
var TLayoutControl = {
    // nMapH 地图的高度
    // nMapW地图宽度
    oMap: null, oFullScreen: null, nMapH: 0
    , nMapW: 0, aDomAry: []
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
        }
        // 获取元素
        if (this.aDomAry.length < 2) {
            this.aDomAry = fGetElement("landdetailsmap");
        }
        this.oMap = this.aDomAry;
        // 地图宽度设置
        this.oMap.style.width = parseInt(parseInt(this.nMapW) * 0.88 * 0.96) + "px";
        this.oMap.style.height = parseInt(parseInt(this.nMapH) * 0.88 * 0.96) + "px";
    },
    fWinResizeHandle: function () {//调整可视框大小
        this.fInitLayout();//初始化
        // 查找方法有
        if(typeof map.checkResize == 'function'){
            map.checkResize();//通用针对两个版本 通知地图其容器大小已更改。在更改了容器对象的大小后调用此方法，以便地图能够调整自己适合于新的大小。
        }else{
            return;
        }
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

function loadlanddetailsmap() {
    //初始化地图对象 
    var map = new T.Map("landdetailsmap");
    //设置显示地图的中心点和级别 
    map.centerAndZoom(new T.LngLat(XClng, XClat), zoomNormal);
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