var zoomMin = 1;
var zoomMax = 18;
// 人口页面设置
var populationItem = {
  aDomAry: [],
  map: null,
  inputSearch: null,
  pressureWarning: null,
  pressure: null,
  pressureInput: null,
  sureBtn: null,
  statisticalBtn: null,
  lis: null,
  inputUserDefined: null,
  statist: null,
  statistLis: null,
  statistInputs: null,
  customManagements: null,
  div: null,
  nav: null,
  finit: function() {
    //初始化
    // 获取元素
    if (this.aDomAry.length < 8) {
      this.aDomAry = fGetElement(
        "map",
        "pressure_warning",
        "pressure",
        "partQuery",
        "search",
        "statistics",
        "allCustomManagement"
      );
    }
    this.map = $(this.aDomAry[0]);
    this.pressureWarning = $(this.aDomAry[1]);
    this.pressure = $(this.aDomAry[2]);
    this.pressureInput = $(this.aDomAry[2]).find(
      "div.input_user_defined>input.set_input"
    );
    this.inputSearch = $(this.aDomAry[3]);
    this.sureBtn = $(this.aDomAry[4])
      .children("div.condition_item")
      .children("div.btns")
      .children("div.sure_btn");
    this.statisticalBtn = $(this.aDomAry[4])
      .children("div.condition_item")
      .children("div.btns")
      .children("div.statistical_btn");
    this.lis = $(this.aDomAry[4])
      .children("div.condition_item")
      .children("div.searchbox_condition")
      .find("li.condition>ul.alllines>li");
    this.inputUserDefined = $(this.aDomAry[4])
      .children("div.condition_item")
      .children("div.searchbox_condition")
      .find("li.condition>div.input_user_defined>input");
    this.statist = $(this.aDomAry[5]);
    this.statistLis = $(this.aDomAry[5]).find("ul.alllines>li");
    this.statistInputs = $(this.aDomAry[5]).find(
      "div.input_user_defined>input.set_input"
    );
    this.customManagements = $(this.aDomAry[6]).children("div");
    this.div = $(this.aDomAry[4]).children("div.condition_item");
    this.nav = $(this.aDomAry[4]).children("div.searchbox_nav");
    this.searchInput();
    this.btnsClick();
    this.pressureClick();
  },
  searchInput: function() {
    //左上角的搜索框点击显示地图效果
    var input = this.inputSearch;
    var map = this.map;
    $(input).on("click", function() {
      //清空地图上的图标
      var divs = $(map)
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

      // 热力图
      hotTMap();
    });
  },
  btnsClick: function() {
    //按钮组设置（仅包含buildings、land、population页面）：三按钮中清除按钮
    var sureBtn = this.sureBtn;
    var statisticalBtn = this.statisticalBtn;
    var Thislis = this.lis;
    var Thisinput = this.inputUserDefined;
    var statist = this.statist;
    var statistLis = this.statistLis;
    var statistInputs = this.statistInputs;
    var customManagements = this.customManagements;
    var div = this.div;
    var nav = $(this.nav).children("span");

    $(sureBtn).on(
      "click",
      function() {
        var dataAll = [];
        if (Thislis) {
          for (var i = 0; i < Thislis.length; i++) {
            if ($($(Thislis)[i]).hasClass("line_selected")) {
              dataAll.push($($(Thislis)[i]).attr("data"));
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
              dataAll.push(
                $($(Thisinput)[j]).attr("data") + ":" + $($(Thisinput)[j]).val()
              );
              $($(Thisinput)[j]).val("");
            }
          }
        }

        var span = this.span;
        var div = this.div;

        $(span)
          .removeClass("searchbox_nav_off")
          .addClass("searchbox_nav_show");
        $(div).attr("style", "display:none"); //隐藏

        //清空地图上的图标
        var map = this.map;
        var divs = $(map)
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
        // 热力图
        hotTMap();
        
      }.bind(this)
    );

    $(statisticalBtn).on("click", function() {
      if (div) {
        $(div).attr("style", "display:none");
      }
      if ($(nav).hasClass("searchbox_nav_off")) {
        $(nav)
          .removeClass("searchbox_nav_off")
          .addClass("searchbox_nav_show");
      }

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
      if (!$(statist).attr("style")) {
        // 清除数据
        if (statistLis) {
          for (var i = 0; i < statistLis.length; i++) {
            if ($($(statistLis)[i]).hasClass("line_selected")) {
              $($(statistLis)[i]).removeClass("line_selected");
              $($(statistLis)[i])
                .parent("ul.alllines")
                .children("li:first")
                .addClass("line_selected");
            }
          }
        }
        if (statistInputs) {
          for (var j = 0; j < statistInputs.length; j++) {
            if ($($(statistInputs)[j]).val()) {
              $($(statistInputs)[j]).val("");
            }
          }
        }
        if (customManagements) {
          // 关闭自定义管理弹窗
          for (var n = 0; n < customManagements.length; n++) {
            var maindiv = $($(customManagements)[n]).children("div:first");
            var modeSet = $($(customManagements)[n]).children("div:last");
            if (!$(maindiv).attr("style")) {
              $(maindiv).attr("style", "display:none");
            }
            if (!$(modeSet).attr("style")) {
              $(modeSet).attr("style", "display:none");
            }
          }
        }
      } else {
        $(statist).attr("style", "");
      }
    });
  },
  pressureClick: function() {
    //压力预警
    var pressureWarning = this.pressureWarning;
    var pressure = this.pressure;
    var pressure_inputs = this.pressureInput;
    var deleteBtn = $(pressure).children("i.delete_icon");
    var pressureSubmit = $(pressure).children("div.pressure_submit_btn");
    if (pressureWarning) {
      $(pressureWarning).on("click", function() {
        if (pressure) {
          $(pressure).attr("style", "");
        }
      });
    }
    if (deleteBtn) {
      $(deleteBtn).on("click", function() {
        //压力预警删除
        for (var i = 0; i < pressure_inputs.length; i++) {
          if ($($(pressure_inputs)[i]).val()) {
            $($(pressure_inputs)[i]).val("");
          }
        }
        if (!$(pressure).attr("style")) {
          $(pressure).attr("style", "display:none");
        }
      });
    }
    if (pressureSubmit) {
      $(pressureSubmit).on("click", function() {
        //提交
        var pressureData = [];
        for (var i = 0; i < pressure_inputs.length; i++) {
          if ($($(pressure_inputs)[i]).val()) {
            pressureData.push(
              $($(pressure_inputs)[i]).attr("data") +
                ":" +
                $($(pressure_inputs)[i]).val()
            );
            $($(pressure_inputs)[i]).val("");
          }
        }
        if (!$(pressure).attr("style")) {
          $(pressure).attr("style", "display:none");
        }
        // 随意图表
        var jspanel = $("div.jsPanel");
        if (jspanel) {
          $(jspanel).remove();
          showECharts(4);
        } else {
          showECharts(4);
        }
      });
    }
  }
};
// 初始化
populationItem.finit();
