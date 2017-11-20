var map;
var zoom = 14;
var heatmapOverlay;
if (!isSupportCanvas()) {
    alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
}
function onLoad() {
    map = new T.Map('mapDiv');
    map.centerAndZoom(new T.LngLat(119.92,31.02), zoom);
    console.log(T.HeatmapOverlay)
    heatmapOverlay = new T.HeatmapOverlay({
        "radius": 30,
    });
    map.addOverLay(heatmapOverlay);
    heatmapOverlay.setDataSet({data: heatmapData, max: 300});
}

function isSupportCanvas() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}
//是否显示热力图
function openHeatmap() {
    heatmapOverlay.show();
}
function closeHeatmap() {
    heatmapOverlay.hide();
}
