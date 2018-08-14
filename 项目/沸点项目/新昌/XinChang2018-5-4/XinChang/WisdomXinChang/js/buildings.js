var zoomMin = 1;
var zoomMax = 18;
// 房屋页面设置
var buildingsItem = {
  aDomAry: [],
  rstBuilding: null,
  transactionMonitoring: null,
  transaction: null,
  inputSearch: null,
  map: null,
  sureBtn: null,
  statisticalBtn: null,
  lis: null,
  inputUserDefined: null,
  statist: null,
  statistLis: null,
  statistInputs: null,
  customManagements: null,
  div: null,
  resultNav: null,
  buildingsInfo:[],
  finit: function() {
    //初始化
    // 获取元素
    if (this.aDomAry.length < 9) {
      this.aDomAry = fGetElement(
        "result_building",
        "transaction_monitoring",
        "transaction",
        "partQuery",
        "map",
        "search",
        "statistics",
        "allCustomManagement"
      );
    }
    this.rstBuilding = $(this.aDomAry[0]);
    this.transactionMonitoring = $(this.aDomAry[1]);
    this.transaction = $(this.aDomAry[2]);
    this.transactionInput = $(this.aDomAry[2]).find(
      "div.input_user_defined>input.set_input"
    );
    this.inputSearch = $(this.aDomAry[3]);
    this.map = $(this.aDomAry[4]);
    this.sureBtn = $(this.aDomAry[5])
      .children("div.condition_item")
      .children("div.btns")
      .children("div.sure_btn");
    this.statisticalBtn = $(this.aDomAry[5])
      .children("div.condition_item")
      .children("div.btns")
      .children("div.statistical_btn");
    this.lis = $(this.aDomAry[5])
      .children("div.condition_item")
      .children("div.searchbox_condition")
      .find("li.condition>ul.alllines>li");
    this.inputUserDefined = $(this.aDomAry[5])
      .children("div.condition_item")
      .children("div.searchbox_condition")
      .find("li.condition>div.input_user_defined>input");
    this.statist = $(this.aDomAry[6]);
    this.statistLis = $(this.aDomAry[6]).find("ul.alllines>li");
    this.statistInputs = $(this.aDomAry[6]).find(
      "div.input_user_defined>input.set_input"
    );
    this.customManagements = $(this.aDomAry[7]).children("div");
    this.div = $(this.aDomAry[5]).children("div.condition_item");
    this.resultNav = $(this.aDomAry[5]).children("div.result_nav");
    // 房屋圈定图数据
    this.buildingsInfo = [
      {
        tradeName: "绿城玉兰花园一期",
        unitPrice: "10000元/m²"
      },
      {
        tradeName: "绿城玉兰花园二期",
        unitPrice: "16000元/m²"
      },
      {
        tradeName: "绿城玉兰花园三期",
        unitPrice: "8000元/m²"
      }
    ];
    this.searchInput();
    this.btnsClick();
    this.transactionClick();
    this.filpBuilding();
  },
  searchInput: function() {
    //左上角的搜索框点击显示地图效果
    var input = this.inputSearch;
    var map = this.map;
    var buildingsInfo = this.buildingsInfo;
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

      // 房屋圈定图
      if (typeof buildingsMapInfo === "function") {
        buildingsMapInfo(buildingsInfo);
      }
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
    var rstBuilding = this.rstBuilding;
    var resultNav = this.resultNav;
    var buildingsInfo = this.buildingsInfo;

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

        var div = this.div;
        //隐藏 查询条件
        if(!$(div).attr("style")){
          $(div).attr("style", "display:none"); 
        }
        // 结果条数显示
        $(resultNav).attr("style", "");
        // 具体数据条显示
        $(rstBuilding).attr("style", "");
        // 查询结果显示 -> 获取高度
        getFullScreen("#search>div.result", "height", 185);

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

        // 房屋圈定图
        if (typeof buildingsMapInfo === "function") {
          buildingsMapInfo(buildingsInfo);
        }
      }.bind(this)
    );

    $(statisticalBtn).on("click", function() {
      if (div) {
        $(div).attr("style", "display:none");
      }

      if (rstBuilding) {
        $(rstBuilding).attr("style", "display:none"); //显示
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
  transactionClick: function() {
    //异动监测
    var transactionMonitoring = this.transactionMonitoring;
    var transaction = this.transaction;
    var transaction_inputs = this.transactionInput;
    var deleteBtn = $(transaction).children("i.delete_icon");
    var transactionSubmit = $(transaction).children(
      "div.transaction_submit_btn"
    );
    if (transactionMonitoring) {
      $(transactionMonitoring).on("click", function() {
        if (transaction) {
          $(transaction).attr("style", "");
        }
      });
    }
    if (deleteBtn) {
      $(deleteBtn).on("click", function() {
        //异动监测删除
        for (var i = 0; i < transaction_inputs.length; i++) {
          if ($($(transaction_inputs)[i]).val()) {
            $($(transaction_inputs)[i]).val("");
          }
        }
        if (!$(transaction).attr("style")) {
          $(transaction).attr("style", "display:none");
        }
      });
    }
    if (transactionSubmit) {
      $(transactionSubmit).on("click", function() {
        //提交
        var transactionData = [];
        for (var i = 0; i < transaction_inputs.length; i++) {
          if ($($(transaction_inputs)[i]).val()) {
            transactionData.push(
              $($(transaction_inputs)[i]).attr("data") +
                ":" +
                $($(transaction_inputs)[i]).val()
            );
            $($(transaction_inputs)[i]).val("");
          }
        }
        if (!$(transaction).attr("style")) {
          $(transaction).attr("style", "display:none");
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
  },
  filpBuilding: function() {
    //结果显示去翻页功能 building页面
    var result = this.rstBuilding;
    var results = $(result).children("ul.result_show");
    var pages = $(result)
      .children("div.pages")
      .find("ul>li");
    for (var i = 0; i < pages.length; i++) {
      !(function(i) {
        $($(pages)[i]).on("click", function() {
          var str = "";
          str +=
            "<li class='result_item'>" +
            "<div class='result_img'><img class='resultImg' src='images/房屋.jpg' alt=''></div>" +
            "<div class='result_content'>" +
            "<div class='result_content_col1'><span class='result_content_col_icon col_icon1'></span><a target='_blank' href='./buildingsdetails.html'>绿城玉兰花园</a></div>" +
            "<div class='result_content_col2'>" +
            "[<span class='col2_span'>城区</span>] 地址：<p class='col2_p'新昌区.......</p>" +
            "</div>" +
            "<div class='result_content_col3'><span class='col3_span'>16000</span>元/m²</div>" +
            "</div>" +
            "<div class='clear'></div>" +
            "</li>";
          var num = parseInt(Math.random() * 7);
          var strs = "";
          for (var j = 0; j < num; j++) {
            strs += str;
          }
          $(results).html(strs);
        });
      })(i);
    }
  }
};
// 初始化
buildingsItem.finit();
