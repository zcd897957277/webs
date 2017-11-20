/ 获取元素
function fGetElement() {
    var c = new Array();
    for (var b = 0; b < arguments.length; b++) {
        var a = arguments[b];
        if (typeof a == "string") {
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
    nLeftWidth: 330, nTopHeight: 70, nLayoutWidth: 0, nLayoutHeight: 0, bMapSpreadState: false, bIsFullScreen: false
    , oMapSpread: null, oShadeV: null, oShadeH: null, oMapTool: null, oMap: null, oMapContainer: null, oMapNav: null
    , oFullScreen: null, nMapH: 0, nMapW: 0, aDomAry: [], nWindowMinWidth: 1024, nMapMinWidth: 694
    , fInitLayout: function () {//初始化布局
        var b = this;
        if (window.innerWidth) {
            this.nLayoutWidth = window.innerWidth
        } else {
            if ((document.body) && (document.body.clientWidth)) {
                this.nLayoutWidth = document.body.clientWidth
            }
        }
        if (window.innerHeight) {
            this.nLayoutHeight = window.innerHeight;
        } else {
            if ((document.body) && (document.body.clientHeight)) {
                this.nLayoutHeight = document.body.clientHeight;
            }
        }
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            this.nLayoutHeight = document.documentElement.clientHeight;
            this.nLayoutWidth = document.documentElement.clientWidth;
        }
        if (!this.bIsFullScreen) {
            this.nMapW = this.nLayoutWidth - this.nLeftWidth;
            this.nMapH = this.nLayoutHeight - this.nTopHeight - 28;
        } else {
            this.nMapW = this.nLayoutWidth; this.nMapH = this.nLayoutHeight - 28;
        }
        if (!this.bMapSpreadState) {//地图是否为展开状态
            this.nMapW = this.nLayoutWidth - this.nLeftWidth;
            this.nMapW = this.nMapW < this.nMapMinWidth ? this.nMapMinWidth : this.nMapW
        } else {
            this.nMapW = this.nLayoutWidth;
            this.nMapW = this.nMapW < this.nWindowMinWidth ? this.nWindowMinWidth : this.nMapW;
        }
        if (this.aDomAry.length <= 0) {
            this.aDomAry = fGetElement("map", "tool_container", "mapSpread", "content", "sidebar");
        }
        this.oMapTool = this.aDomAry[1];
        this.oMapTool.style.display = "block";
        this.oMapTool.style.width = this.nMapW + "px";
        this.oMapContainer = this.aDomAry[3];
        this.oMap = this.aDomAry[0];
        this.oMap.style.width = (this.nMapW < this.nMapMinWidth ? this.nMapMinWidth : this.nMapW) + "px";
        this.oMapContainer.style.height = (this.nMapH + 28) + "px";
        if (this.bIsFullScreen) {
            this.oMapContainer.style.height = (this.nMapH + 31 + 73) + "px";
        }
        this.oMap.style.height = this.nMapH + "px";
        this.oMapSpread = this.aDomAry[2];
        this.oMapSpread.style.display = "block";
        var a = parseInt(this.nMapH / 2 + 90);
        if (a < 150) {
            a = 150;
        }
        this.oMapSpread.style.top = a + "px";
        this.oMapSpread.title = "收起左栏";
        this.oMapNav = this.aDomAry[4];
        this.oMapNav.style.height = (this.nMapH + 28) + "px";
        this.oMapSpread.onclick = function () {
            b.fMidifyLayout(this);
        }
        var varFullScreen = document.getElementById("fullScreen");
        if(varFullScreen==null || varFullScreen==undefined ||varFullScreen==''){
            return;
        }else{
            varFullScreen.onclick = function () {
                b.fMidifyLayout(this);
            }
        }
        var varBClear = document.getElementById("bClear");
        varBClear.onclick = function () {
            map.clearOverLays();//通用针对两个版本 清除地图上所有覆盖物。
        }
    }
    , fMidifyLayout: function (c) {//修正布局
        var d = c.id;
        if (d == "mapSpread") {
            if (this.bMapSpreadState) {
                this.oMapSpread.style.backgroundPosition = "-412px -7px";
                this.oMapSpread.title = "收起左栏";
                this.bMapSpreadState = false;
                if (this.bIsFullScreen) {
                    this.oMapNav.style.marginTop = 0 + "px";
                }
                this.oMapNav.style.display = "block";
                this.nMapW = this.nMapW - this.nLeftWidth;
                this.oMap.style.width = this.nMapW + "px";
                this.oMapTool.style.width = this.oMapContainer.style.width = (this.nMapW < this.nMapMinWidth ? this.nMapMinWidth : this.nMapW) + "px";
            } else {
                this.oMapSpread.style.backgroundPosition = "-429px -7px";
                this.oMapSpread.title = "显示左栏";
                this.bMapSpreadState = true;
                this.oMapNav.style.display = "none";
                this.nMapW = this.nMapW + this.nLeftWidth;
                this.oMapContainer.style.left = "0px";
                this.oMapTool.style.width = this.oMapContainer.style.width = this.nMapW + "px";
                this.oMapTool.style.width = this.nMapW + "px";
                this.oMap.style.width = this.nMapW + "px";
                map.checkResize();//通用针对两个版本 通知地图其容器大小已更改。在更改了容器对象的大小后调用此方法，以便地图能够调整自己适合于新的大小。
            }
        }
        if (d == "fullScreen") {
            var b = fGetElement("header");
            var a = fGetElement("sidebar");
            if (this.bIsFullScreen) {
                this.oMapNav.style.display = "block";
                b.style.display = "block";
                this.bIsFullScreen = false;
                this.oMapContainer.style.marginTop = "0px";
                if (this.bMapSpreadState) {
                    this.nMapW = this.nMapW - this.nLeftWidth;
                } else {
                    this.nMapW = this.nMapW;
                }
                this.oMapNav.style.marginTop = "0px";
                this.nMapH = this.nMapH - this.nTopHeight; this.bMapSpreadState = false;
                this.oMapTool.style.width = this.oMapContainer.style.width = this.nMapW + "px";
                this.oMap.style.width = this.nMapW + "px";
                this.oMap.style.height = this.nMapH + "px";
                this.oMapContainer.style.height = parseInt(this.nMapH + 31) + "px";
                this.oMapSpread.style.backgroundPosition = "-412px -7px";
                var e = fGetElement("fullScreen");
                e.innerHTML = "<a href='javascript:void(0)' class='screenbg'><span class='scrlabel'></span>全屏</a>";
            } else {
                this.oMapNav.style.display = "none";
                b.style.display = "none";
                this.bIsFullScreen = true;
                this.oMapContainer.style.marginTop = "0px";
                if (this.bMapSpreadState) {
                    this.nMapW = this.nMapW;
                } else {
                    this.nMapW = this.nMapW + this.nLeftWidth;
                }
                this.nMapH = this.nMapH + this.nTopHeight;
                this.oMapContainer.style.left = "0px";
                this.bMapSpreadState = true;
                this.oMapTool.style.width = this.oMapContainer.style.width = (this.nMapW < 1024 ? 1024 : this.nMapW) + "px";
                this.oMap.style.width = this.nMapW + "px";
                this.oMap.style.height = this.nMapH + "px";
                this.oMapContainer.style.height = parseInt(this.nMapH + 28) + "px";
                this.oMapSpread.style.backgroundPosition = "-429px -7px";
                var varFullScreen = fGetElement("fullScreen");
                varFullScreen.innerHTML = "<a href='javascript:void(0)' class='screenbg'><span class='scrlabelout'></span>退出</a>";
            }
            a.style.height = (this.nMapH + 28) + "px";
            map.checkResize();//通用针对两个版本 通知地图其容器大小已更改。在更改了容器对象的大小后调用此方法，以便地图能够调整自己适合于新的大小。
        }
    }
    , fWinResizeHandle: function () {//手动调整可是框大小
        this.fInitLayout();
        
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
// 最后宽度
function endwith(str, endstr) {
    if (endstr == null || endstr == "" || str.length == 0 || endstr.length > str.length)
        return false;
    if (str.substring(str.length - endstr.length) == endstr)
        return true;
    else
        return false;
}
// 初始化布局
TLayoutControl.fInitLayout();
// 地图大小调整时调用
window.onresize = function () {
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        var a = document.documentElement.clientHeight;
        var b = document.documentElement.clientWidth;
        if (b === TLayoutControl.nLayoutWidth && a === TLayoutControl.nLayoutHeight) {
            return;
        }
    }
    TLayoutControl.fWinResizeHandle();
};