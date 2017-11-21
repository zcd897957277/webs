$.jsPanel({
	//定位
    position:    {my: "center-top", at: "center-top", offsetY: 15},
    //主题
    theme:       "rebeccapurple",
    contentSize: {width: 600, height: 450},
    headerTitle: "柱状图",
    content:     "<div id='wrap1' style='height:450px'></div>",
    //插入document后操作面板
    callback:    function () {
    	var myChart=echarts.init(document.getElementById("wrap1"));
		// 随机0-1000的数
		function randomData() {
		    return Math.round(Math.random()*1000);
		}
		// legend内容
		var legendData=['空调','太阳能','洗衣机','冰箱'];
		// legend自定义颜色 不设置有默认色
		var legendColor=['blue','gray','#000','cyan'];
		// 映射颜色  不设置有默认色
		var visColor=["#ffffff","#e8192f","#d6664d","#B9044E","#f0ba2e","#d3ce2b","#169A7f","#0b6573","#1BB3c8"];
		var seriseData=[
			{
		        type: 'map',
		        map: 'china'
		   	},
	        {
	            name: '空调',
	            type: 'map',
	            mapType: 'china',
	            label: { normal: {show: true},emphasis: { show: true}},
	            data:[
	                {name: '北京',value: randomData() },
	                {name: '天津',value: randomData() },
	                {name: '上海',value: randomData() },
	                {name: '重庆',value: randomData() },
	                {name: '河北',value: randomData() },
	                {name: '河南',value: randomData() },
	                {name: '云南',value: randomData() },
	                {name: '辽宁',value: randomData() },
	                {name: '黑龙江',value: randomData() },
	                {name: '湖南',value: randomData() },
	                {name: '安徽',value: randomData() },
	                {name: '山东',value: randomData() },
	                {name: '新疆',value: randomData() },
	                {name: '江苏',value: randomData() },
	                {name: '浙江',value: randomData() },
	                {name: '江西',value: randomData() },
	                {name: '湖北',value: randomData() },
	                {name: '广西',value: randomData() },
	                {name: '甘肃',value: randomData() },
	                {name: '山西',value: randomData() },
	                {name: '内蒙古',value: randomData() },
	                {name: '陕西',value: randomData() },
	                {name: '吉林',value: randomData() },
	                {name: '福建',value: randomData() },
	                {name: '贵州',value: randomData() },
	                {name: '广东',value: randomData() },
	                {name: '青海',value: randomData() },
	                {name: '西藏',value: randomData() },
	                {name: '四川',value: randomData() },
	                {name: '宁夏',value: randomData() },
	                {name: '海南',value: randomData() },
	                {name: '台湾',value: randomData() },
	                {name: '香港',value: randomData() },
	                {name: '澳门',value: randomData() }
	            ]
	        },
	        {
	            name: '太阳能',
	            type: 'map',
	            mapType: 'china',
	            label: { normal: {show: true},emphasis: { show: true}},
	            data:[
	                {name: '湖北',value: randomData() },
	                {name: '广西',value: randomData() },
	                {name: '甘肃',value: randomData() },
	                {name: '山西',value: randomData() },
	                {name: '内蒙古',value: randomData() },
	                {name: '陕西',value: randomData() },
	                {name: '吉林',value: randomData() },
	                {name: '福建',value: randomData() },
	                {name: '贵州',value: randomData() },
	                {name: '广东',value: randomData() },
	                {name: '青海',value: randomData() },
	                {name: '西藏',value: randomData() },
	                {name: '四川',value: randomData() },
	                {name: '宁夏',value: randomData() },
	                {name: '海南',value: randomData() },
	                {name: '台湾',value: randomData() },
	                {name: '香港',value: randomData() },
	                {name: '澳门',value: randomData() }
	            ]
	        },
	        {
	            name: '冰箱',
	            type: 'map',
	            mapType: 'china',
	            label: {
	                normal: {
	                    show: true
	                },
	                emphasis: {
	                    show: true
	                }
	            },
	            data:[
	                {name: '北京',value: randomData() },
	                {name: '天津',value: randomData() },
	                {name: '上海',value: randomData() },
	                {name: '重庆',value: randomData() },
	                {name: '河北',value: randomData() },
	                {name: '安徽',value: randomData() },
	                {name: '新疆',value: randomData() },
	                {name: '浙江',value: randomData() },
	                {name: '江西',value: randomData() },
	                {name: '山西',value: randomData() },
	                {name: '内蒙古',value: randomData() },
	                {name: '吉林',value: randomData() },
	                {name: '福建',value: randomData() },
	                {name: '广东',value: randomData() },
	                {name: '西藏',value: randomData() },
	                {name: '四川',value: randomData() },
	                {name: '宁夏',value: randomData() },
	                {name: '香港',value: randomData() },
	                {name: '澳门',value: randomData() }
	            ]
	        },
	        {
	            name: '洗衣机',
	            type: 'map',
	            mapType: 'china',
	            label: {
	                normal: {
	                    show: true
	                },
	                emphasis: {
	                    show: true
	                }
	            },
	            data:[
	                {name: '北京',value: randomData() },
	                {name: '天津',value: randomData() },
	                {name: '上海',value: randomData() },
	                {name: '广东',value: randomData() },
	                {name: '台湾',value: randomData() },
	                {name: '香港',value: randomData() },
	                {name: '澳门',value: randomData() }
	            ]
	        }
	    ];
		    
		option = {
		    title: {
		        text: '通过颜色映射销量',
		        left: 'left'
		    },
		    //提示框组件
		    tooltip: {
		    	//触发类型。'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
		        trigger: 'item'
		    },
		    //图例组件
		    legend: {
		    	//图例列表的布局朝向
		        orient: 'vertical',
		        right: '3%',
		        bottom:'3%',
		        data:legendData
		    },
		    color:legendColor,
		    //visualMap 是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）
		    visualMap: {
		        min: 0,
		        max: 2500,
		        left: 'left',
		        bottom: '3%',
		        text: ['高','低'],           // 文本，默认为数值文本
		        //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
		        calculable: true,
		        color:visColor
		    },
		    //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
		    toolbox: {
		        show: true,
		        right: '3%',
		        //各工具配置项。
		        feature: {
		        	//数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
		            dataView: {readOnly: false},
		            //配置项还原。
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    series: seriseData
		};
		myChart.setOption(option);
    }
});