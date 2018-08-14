// 条件项中条件的选择、压力预警
var SearchItem = {
  aDomAry: [],
  lis: null,
  inputUserDefined: null,
  clearBtn: null,
  div: null,
  rstLand: null,
  nav: null,
  content: null,
  rstBuilding: null,
  resultNav: null,
  finit: function() {
    //初始化
    // 获取元素
    if (this.aDomAry.length < 5) {
      this.aDomAry = fGetElement(
        "search",
        "result_land",
        "content",
        "result_building"
      );
    }
    this.lis = $(this.aDomAry[0])
      .children("div.condition_item")
      .children("div.searchbox_condition")
      .find("li.condition>ul.alllines>li");
    this.inputUserDefined = $(this.aDomAry[0])
      .children("div.condition_item")
      .children("div.searchbox_condition")
      .find("li.condition>div.input_user_defined>input");
    this.clearBtn = $(this.aDomAry[0])
      .children("div.condition_item")
      .children("div.btns")
      .children("div.clear_btn");
    this.div = $(this.aDomAry[0]).children("div.condition_item");
    this.rstLand = $(this.aDomAry[1]);
    this.nav = $(this.aDomAry[0]).children("div.searchbox_nav");
    this.content = $(this.aDomAry[2]);
    this.rstBuilding = $(this.aDomAry[3]);
    this.resultNav = $(this.aDomAry[0]).children("div.result_nav");
    this.changeTypes();
    this.searchLiClick();
    this.btnsClickClear();
    this.transNav();
    this.switchLayer();
  },
  changeTypes: function() {
    //选中土地房屋人口案例库，转换页面（左上角）
    var select = $(this.aDomAry[0]).find(
      "div.searchbox_area>div.search_left>select.switchs"
    );
    var searchInput = $(this.aDomAry[0]).find(
      "div.searchbox_area>div#partQuery>input.search_input"
    );

    // 点击select跳转页面
    $(select).on("change", function() {
      var optionValue = $(this).val();
      window.location.href = optionValue;
    });
  },
  searchLiClick: function() {
    //搜索条件中li的选择
    var Thislis = this.lis;
    for (var i = 0; i < Thislis.length; i++) {
      !(function(i) {
        $($(Thislis)[i]).on("click", function() {
          if (
            ($($(Thislis)[i]).hasClass("small_line") ||
              $($(Thislis)[i]).hasClass("normal_line") ||
              $($(Thislis)[i]).hasClass("sbig_line") ||
              $($(Thislis)[i]).hasClass("big_line")) &&
            !$($(Thislis)[i]).hasClass("line_selected")
          ) {
            $($(Thislis)[i])
              .addClass("line_selected")
              .siblings()
              .removeClass("line_selected");
          }
        });
      })(i);
    }
  },
  btnsClickClear: function() {
    //按钮组设置（仅包含buildings、land、population页面）：三按钮中清除按钮
    var clearBtn = this.clearBtn;
    var Thislis = this.lis;
    var Thisinput = this.inputUserDefined;

    $(clearBtn).on("click", function() {
      if (Thislis) {
        for (var i = 0; i < Thislis.length; i++) {
          if ($($(Thislis)[i]).hasClass("line_selected")) {
            $($(Thislis)[i]).removeClass("line_selected");
            $($(Thislis)[i])
              .parent("ul.alllines")
              .children("li:first")
              .addClass("line_selected");
          }
        }
      }
      if (Thisinput) {
        for (var j = 0; j < Thisinput.length; j++) {
          if ($($(Thisinput)[j]).val()) {
            $($(Thisinput)[j]).val("");
          }
        }
      }
    });
  },
  transNav: function() {
    //筛选条件的显示
    var nav = this.nav;
    var div = this.div;
    var rstLand = this.rstLand;
    var rstBuilding = this.rstBuilding;
    var resultNav = this.resultNav;
    $(nav).on("click", function() {
      if (!$(div).attr("style")) {
        $(div).attr("style", "display:none");

        // if($(rstBuilding).attr("data-type") == 'off'){
        //   // 房屋详情
        //   if($(rstBuilding).attr("style")){
        //     $(rstBuilding).attr("style", "");
        //     $(resultNav).attr("style", "");
        //   }
        // }
        
        // // 土地详情
        // if($(rstLand).attr("data-type") == 'off'){
        //   if($(rstLand).attr("style")){
        //     $(rstLand).attr("style", "");
        //     $(resultNav).attr("style", "");
        //   }
        // }

      } else {
        $(div).attr("style", "");

        // 高度满屏
        // 筛选条件
        getFullScreen("#search>div.condition_item>div.searchbox_condition", "height", 188);
        // 筛选条件下的按钮组
        getFullScreen("#search>div.condition_item>div.btns", "top", 47);

        // 房屋详情 结果显示
        $(rstBuilding).attr("style", "display:none");
        // 土地详情 结果显示
        $(rstLand).attr("style", "display:none");
        // 结果条目显示
        $(resultNav).attr("style", "display:none");
      }
    });
  },
  switchLayer: function() {
    //图层切换
    var ctent = this.content;
    var iBtn = $(ctent).find("div.layer_nav>div.switch_btn>i");
    var layerPop = $(ctent).find("div.layer_nav>div.layer-pop");
    var layers = $(ctent).find(
      "div.layer_nav>div.layer-pop>div.layer_container>div.layer-items>a"
    );
    // 打开图层
    $(iBtn).on("click", function() {
      if ($(layerPop).attr("style")) {
        $(layerPop).attr("style", "");
      } else {
        $(layerPop).attr("style", "display:none");
      }
    });
    // 选择相应的图层
    for (var i = 0; i < layers.length; i++) {
      !(function(i) {
        $($(layers)[i]).on("click", function() {
          // 地图
          if ($(this).hasClass("vec_type")) {
            if (!$(layerPop).attr("style")) {
              $(layerPop).attr("style", "display:none");
            }
            map.setMaxZoom(18);
            // 删除添加的图层
            var addLayers = $("#map").find(
              "div.tdt-map-pane>div.tdt-tile-pane>div"
            );
            for (var j = 0; j < addLayers.length; j++) {
              if ($($(addLayers)[j])) {
                $($(addLayers)[j]).remove();
              }
            }
            var imageURL =
              "https://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}";
            //创建自定义图层对象
            var maplay_base = new T.TileLayer(imageURL, {
              minZoom: zoomMin,
              maxZoom: zoomNormal
            });
            //将图层增加到地图上
            map.addLayer(maplay_base);
            var imageURL =
              "https://t4.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}";
            var maplay_text = new T.TileLayer(imageURL, {
              minZoom: zoomMin,
              maxZoom: zoomNormal
            });
            //将图层增加到地图上
            map.addLayer(maplay_text);
          }
          // 规划
          if ($(this).hasClass("gui_type")) {
            if (!$(layerPop).attr("style")) {
              $(layerPop).attr("style", "display:none");
            }
            map.setMaxZoom(18);
            // 删除添加的图层
            var addLayers = $("#map").find(
              "div.tdt-map-pane>div.tdt-tile-pane>div"
            );
            for (var j = 0; j < addLayers.length; j++) {
              if ($($(addLayers)[j])) {
                $($(addLayers)[j]).remove();
              }
            }
            var imageURL =
              "https://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}";
            //创建自定义图层对象
            var maplay_base = new T.TileLayer(imageURL, {
              minZoom: zoomMin,
              maxZoom: zoomNormal
            });
            //将图层增加到地图上
            map.addLayer(maplay_base);
            var imageURL =
              "https://t4.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}";
            var maplay_text = new T.TileLayer(imageURL, {
              minZoom: zoomMin,
              maxZoom: zoomNormal
            });
            //将图层增加到地图上
            map.addLayer(maplay_text);
          }
          // 影像
          if ($(this).hasClass("img_type")) {
            if (!$(layerPop).attr("style")) {
              $(layerPop).attr("style", "display:none");
            }
            // 删除添加的图层
            var addLayers = $("#map").find(
              "div.tdt-map-pane>div.tdt-tile-pane>div"
            );
            for (var j = 0; j < addLayers.length; j++) {
              if ($($(addLayers)[j])) {
                $($(addLayers)[j]).remove();
              }
            }
            map.setMaxZoom(18);
            //创建自定义图层对象
            var imageURL =
              "https://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}";
            var maplay_base = new T.TileLayer(imageURL, {
              minZoom: zoomMin,
              maxZoom: zoomMax
            });
            //将图层增加到地图上
            map.addLayer(maplay_base);
            var imageURL =
              "http://t0.tianditu.cn/cia_w/wmts?" +
              "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
              "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}";
            //创建自定义图层对象
            var maplay_text = new T.TileLayer(imageURL, {
              minZoom: zoomMin,
              maxZoom: zoomMax
            });
            //将图层增加到地图上
            map.addLayer(maplay_text);
          }
          // 地形
          if ($(this).hasClass("ter_type")) {
            if (!$(layerPop).attr("style")) {
              $(layerPop).attr("style", "display:none");
            }
            // 删除添加的图层
            var addLayers = $("#map").find(
              "div.tdt-map-pane>div.tdt-tile-pane>div"
            );
            for (var j = 0; j < addLayers.length; j++) {
              if ($($(addLayers)[j])) {
                $($(addLayers)[j]).remove();
              }
            }
            map.setMaxZoom(14);
            var imageURL =
              "https://t4.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}";
            //创建自定义图层对象
            var maplay_base = new T.TileLayer(imageURL, {
              minZoom: zoomMin,
              maxZoom: zoomNormal
            });
            //将图层增加到地图上
            map.addLayer(maplay_base);
            var imageURL =
              "https://t4.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}";
            var maplay_text = new T.TileLayer(imageURL, {
              minZoom: zoomMin,
              maxZoom: zoomNormal
            });
            //将图层增加到地图上
            map.addLayer(maplay_text);
          }
          // 三维
          // if($(this).hasClass('sw_type')){
          //     if(!$(layerPop).attr('style')){
          //         $(layerPop).attr('style','display:none');
          //     }
          //     map.setMaxZoom(18);
          //     // 删除添加的图层
          //     var addLayers=$("#map").find('div.tdt-map-pane>div.tdt-tile-pane>div');
          //     for(var j=0;j<addLayers.length;j++){
          //         if($($(addLayers)[j])){
          //             $($(addLayers)[j]).remove();
          //         }
          //     }
          //     var imageURL = "https://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}";
          //     var maplay_base = new T.TileLayer(imageURL, {minZoom: zoomMin, maxZoom: zoomMax});
          //     //将图层增加到地图上
          //     map.addLayer(maplay_base);
          //     var imageURL = "http://t0.tianditu.cn/cia_w/wmts?" +
          //         "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
          //         "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}";
          //     //创建自定义图层对象
          //     var maplay_text = new T.TileLayer(imageURL, {minZoom: zoomMin, maxZoom: zoomMax});
          //     //将图层增加到地图上
          //     map.addLayer(maplay_text);

          //     var imageURL = "https://t4.tianditu.com/DataServer?T=elv_c&x={x}&y={y}&l={z}";
          //     maplay_3D = new T.TileLayer(imageURL, {minZoom: zoomMin, maxZoom: zoomMax});
          //     //将图层增加到地图上
          //     map.addLayer(maplay_3D);
          // }
        });
      })(i);
    }
  }
};
// 初始化
SearchItem.finit();
