var wmsLayer;
var zoomMin = 1;
var zoomMax = 18;
var lay;
var lis;
var maps;
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

var Layers = {
    aDomAry: [],
    childLiClick:function(){//li的点击事件
        // 获取元素
        if (this.aDomAry.length < 2) {
            this.aDomAry = fGetElement("layers");
        }
        lis=$(this.aDomAry).children('ul').children('li');
        for(var i=0;i<lis.length;i++){
            $($(lis)[i]).on('click',function(){
                if(!$(this).hasClass('layer_li_selected')){
                    $(this).siblings().removeClass('layer_li_selected');
                    $(this).addClass('layer_li_selected');
                }
                if($(this).hasClass('layer_land')){
                    if($(this).children('ul.layer_land_maps').attr('style')){
                        $(this).children('ul.layer_land_maps').attr('style','');

                        maps=$(this).children('ul.layer_land_maps').children('li');
                        for(var i=0;i<maps.length;i++){
                            $($(maps)[i]).unbind('click').on('click',function(){
                                if($(this).hasClass('earth_map')){
                                    if(lay){
                                        map.removeLayer(lay);
                                    }
                                }
                                if($(this).hasClass('planner')){
                                    var imageURL = "http://t0.tianditu.cn/img_w/wmts?" +
                                        "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
                                        "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}";
                                    //创建自定义图层对象
                                    lay = new T.TileLayer(imageURL, {minZoom: zoomMin, maxZoom: zoomMax});
                                    //将图层增加到地图上
                                    map.addLayer(lay);
                                }
                            })
                        }
                    }else{
                        $(this).children('ul.layer_land_maps').attr('style','display:none');
                    }
                }else{
                    $(this).siblings('.layer_land').children('ul.layer_land_maps').attr('style','display:none');
                }
            })
        }
    }
}

Layers.childLiClick();