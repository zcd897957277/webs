function landMapInfo(infos) {
  //详细信息输出框
  // 图片
  var pict_nums = ["marker1.png", "marker2.png", "marker3.png"];
  // 经纬度
  var marker_tlnglat_nums = [
    ["120.90", "29.499"],
    ["120.925", "29.503"],
    ["120.885", "29.494"]
  ];
  // 文本
  var config_text = ["楼盘1", "民居2", "商户3"];
  for (var i = 0; i < pict_nums.length; i++) {
    //创建图片对象
    var icon = new T.Icon({
      iconUrl: "./images/" + pict_nums[i],
      iconSize: new T.Point(19, 27),
      iconAnchor: new T.Point(9, 27)
    });
    //创建标注对象
    var lnglats = new T.LngLat(
      marker_tlnglat_nums[i][0],
      marker_tlnglat_nums[i][1]
    );
    var marker = new T.Marker(lnglats, { icon: icon });
    //向地图上添加标注
    map.addOverLay(marker);

    // 设置配置信息
    var config = {
      text: config_text[i],
      offset: new T.Point(-35, -35),
      position: lnglats
    };
    //创建地图文本对象
    var label = new T.Label(config);
    //创建地图文本对象
    map.addOverLay(label);

    // 给标注对象绑定点击事件
    !(function(marker, lnglats, i) {
      // 修改提示文本样式
      $(".tdt-pane .tdt-overlay-pane")
        .children("div")
        .each(function(index, val) {
          $(val)
            .removeClass("tdt-label")
            .css({
              color: "#000000",
              "z-index": "500",
              "font-size": "16px",
              "white-space": "nowrap",
              position: "absolute",
              "font-weight": "bold"
            });
        });

      marker.addEventListener("click", function() {
        var point = lnglats;
        var html = "";
        html +=
          "地块编号：" +
          infos[i].landId +
          "<br/>土地坐落：" +
          infos[i].landPosition +
          "<br/>土地性质：" +
          infos[i].landNature +
          "<br/>出让面积：" +
          infos[i].landArea +
          "m²" +
          "<br/>起始价：" +
          infos[i].startPrice +
          "万元" +
          "<br/>成交价：" +
          infos[i].currentPrice +
          "万元" +
          "<br/>竞得人：" +
          infos[i].competitionMan +
          "<br/>出让时间：" +
          infos[i].sellTime +
          "。";
        var markerInfoWin = new T.InfoWindow(html, {
          offset: new T.Point(0, -40)
        }); // 创建信息窗口对象
        map.openInfoWindow(markerInfoWin, point); //开启信息窗口
      });
    })(marker, lnglats, i);
  }
}
