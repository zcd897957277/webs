<%@page pageEncoding="utf-8" contentType="text/html;charset=utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>用户查看</title>
		<link rel="stylesheet" type="text/css" href="css/sidebar.css"/>
		<link rel="stylesheet" type="text/css" href="css/customer.css"/>
		<link rel="stylesheet" type="text/css" href="css/style.css"/>
		<link rel="stylesheet" type="text/css" href="iconfont/iconfont.css"/>
		<link rel="stylesheet" href="css/tabpage.css" media="screen" title="no title">

	</head>
	<style media="screen">
  	.commodity-list li .tablist{
  		display: block;
  	}
  </style>
	<body>
		<div class="wechat-back-commodity clearfix" style="min-width: 960px; overflow: hidden;">
			<div class="sidebar left">
				<div class="username clearfix">
					<img class="left" src="iconfont/userhead.png"/>
					<div class="text left">
						<p>员工姓名</p>
						<p>员工编号</p>
					</div>
				</div>
				<ul class="commodity-list">
					<li><a name="page" href="indexCommodity.do"><i class="iconfont icon-shangpinguanli"></i>商品管理</a></li>
					<li><a name="page" href="reward.do"><i class="iconfont icon-zijinguanli"></i>奖金管理</a></li>
					<li><a name="page" href="customer.do"><i class="iconfont icon-yonghuchazhao"></i>用户查看</a></li>
					<li><a name="page" href="jiamengpay.do"><i class="iconfont icon-zmjiameng"></i>加盟费用</a></li>
					<li class='dingdan'><a name="page"><i class="iconfont icon-dingdan"></i>订单管理</a>
              <ul class="tablist">
                	<li><a name='page1' href="dingdan.do">未支付</a></li>
									<li><a name='page1' href="dingdanad.do">已支付</a></li>
									<li><a name='page1' href="dingdanwc.do">可提现</a></li>
                </ul>
					</li>
					<li class='dingdan2'><a name="page"><i class="iconfont icon-shouzhixiangdan"></i>收支管理</a>
						<ul class="tablist2">
							<li><a name='page2' href="shouzhigl.do">收入管理</a></li>
							<li><a name='page2' href="shouzhigl2.do">支出管理</a></li>
						</ul>
					</li>
					<li><a name="page" href="missionmain.do"><i class="iconfont icon-renwu"></i>任务审核</a></li>
					<li><a name="page" href="tixianshmain.do"><i class="iconfont icon-tixian"></i>提现审核</a></li>
					<li><a name="page" href="shangxian.do"><i class="iconfont icon-goumai"></i>商品用户上限</a></li>
					<li><a name="page" href="charts.do"><i class="iconfont icon-shuzhuang"></i>树状图</a></li>
				</ul>
			</div>
			<div class="article right" style="width: 100%;margin-right: -200px;">
				<div class="content" style="margin-right:200px ;">
					<div class="header">
							<a href="loginout.do" style="color:#f6704a">
						退出
					</a>
					</div>
					<div style="margin-top: 30px;" class="customer-box">
						<table id="ta" border="0"cellpadding="0"cellspacing="0">
			<!-- 				<tr class="table_head">
								<th>用户名称</th>
								<th>订单名称</th>
								<th>订单金额</th>
								<th>支付时间</th>
								<th>生成时间</th>
								<th>订单号</th>
							</tr> -->
<!-- 							<tr>
								<td>王大力</td>
								<td>钻石卡</td>
								<td>1000.00</td>
								<td>2016-10-17 18:15</td>
								<td>2016-10-17 18:15</td>
								<td>1352465456</td>

							</tr>
 -->

						</table>
					</div>
				</div>
				<ul id="tabpage" class="fix">
		<!-- 			<li>&lt;&lt;</li>
					<li class="active num">1</li>
					<li class="num">2</li>
					<li class="num">3</li>
					<li>...</li>
					<li class="num">10</li>
					<li>&gt;&gt;</li> -->
				</ul>
			</div>
		</div>
	</body>
	<script src="js/jquery-3.1.0.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/sidebar.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/tabpage.js" charset="utf-8"></script>
	<script src="js/netPath.js" type="text/javascript"></script>
	<script type="text/javascript">
	for(var i = 0; i < 7; i++) {
					if(i == 4) {
						document.getElementsByName('page')[i].className = "active";
					} else {
						document.getElementsByName('page')[i].className = "";
					}

				}
				for(var i =0; i < 3; i++) {
								if(i == 1) {
									document.getElementsByName('page1')[i].className = "active1";
								} else {
									document.getElementsByName('page1')[i].className = "";
								}

							}
	</script>
	<script type="text/javascript">
	window.onload = loadList(1);
	var numCount=null;
	function loadList(page){
		var url = path+"/loadApplication.do";
		var dataPage = {"page":page}
		$.post(url,dataPage,function(data,status){
			var resultBody = data.data.order_list_detail;

			if(status == "success"){
				var table = document.getElementById('ta');
				var str = '<tr class="table_head">'
					+'<th>用户名称</th>'
					+'<th>订单名称</th>'
					+'<th>订单金额</th>'
					+'<th>支付时间</th>'
					+'<th>生成时间</th>'
					+'<th>订单号</th>'
					+'</tr>'
				$(table).append(str);
				if(resultBody != null){
					for(var i=0;i < resultBody.length;i++){
						var li = document.createElement('tr');
						var orderDate = UnixToDate(resultBody[i].orderDate)
						var payTime = UnixToDate(resultBody[i].payTime)
						li.innerHTML += '<td>'+ resultBody[i].userName + '</td>'
							+ '<td>'+ resultBody[i].cardName + '</td>'
							+ '<td>'+ resultBody[i].cardCount + '</td>'
							+ '<td>'+ payTime + '</td>'
							+ '<td>'+ orderDate + '</td>'
							+ '<td>'+ resultBody[i].orderUUID + '</td>'
							$(li).data('userUUID',resultBody[i].orderUserUUID)
							$(table).append(li);
				
					}	
				}
				var num = "<li class='num'>&lt;&lt;</li>";
				for (var i=1;i<=data.data.count_page;i++){
					if(i==page){
						num += '<li id="countPage" class="active num">'+i+'</li>'
					}
					else{
						num += '<li class="num">'+i+'</li>'
					}
							
				}
				num += '<li class="num">&gt;&gt;</li>'
				$("#tabpage").append(num);
			
			}
				
		});
	}
	$("#tabpage").on("click",".num",function(e){
		var li = $(e.target).html();
		var num1=$('#countPage').html();
		if(li=="&lt;&lt;"){
			if(num1 != 1){
				num1--;
				$("#ta").html("");
				$("#tabpage").html("");
				loadList(num1);
			}
		}else if(li=="&gt;&gt;"){
			if(num1 <numCount){
				num1++
				$("#ta").html("");
				$("#tabpage").html("");
				loadList(num1);
			}

		}
		else {
			$("#ta").html("");
			$("#tabpage").html("");
			var num = $(this).text();
			loadList(num);
		}
	})
	$('#ta').on('click',"tr",function() {
		var userUUID=$(this).data('userUUID');
		window.location.href = "tree.do?userUUID="+userUUID;
	})
	</script>
</html>
