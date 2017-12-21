$.jsPanel({
	//定位
    position:    {my: "center-top", at: "center-top", offsetY: 15},
    //主题
    theme:       "rebeccapurple",
    contentSize: {width: 600, height: 450},
    headerTitle: "柱状图",
    //content:     "<div id='wrap1' style='height:450px'></div>",中间height必须加因为图表canvas不能从浮动面板内拿到height
    content:     "<div id='wrap1' style='height:450px;transform:skew(15deg,15deg)'></div>",
    //插入document后操作面板
    callback:    function () {
    	var myChart=echarts.init(document.getElementById("wrap1"));
		option = {
		    title : {
		        text: '南丁格尔玫瑰图',
		        subtext: '纯属虚构',
		        x:'center'
		    },
		    //提示框组件可以设置在多种地方：
			//可以设置在全局，即 tooltip
			//可以设置在坐标系中，即 grid.tooltip、polar.tooltip、single.tooltip
			//可以设置在系列中，即 series.tooltip
			//可以设置在系列的每个数据项中，即 series.data.tooltip
		    tooltip : {
		    	//触发类型。'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
		    	//'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
		        trigger: 'item',
		        //提示框浮层内容格式器，支持字符串模板和回调函数两种形式。
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    //图例组件。图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
		    legend: {
		        x : 'center',
		        y : 'bottom',
		        data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
		    },
		    //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
		    toolbox: {
		        show : true,
		        //各工具配置项。除了各个内置的工具按钮外，还可以自定义工具按钮。
		        feature : {
		            mark : {show: true},
		            //数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
		            dataView : {show: true, readOnly: false},
		            //动态类型切换 
		            magicType : {
		                show: true,
		                type: ['pie', 'funnel']
		            },
		           	// 配置项还原。
		            restore : {show: true},
		            //保存为图片。
		            saveAsImage : {show: true}
		        }
		    },
		    //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
		    calculable : true,
		    //设置数据
		    series : [
		        {
		            name:'半径模式',
		            type:'pie',
		            radius : [20, 110],
		            center : ['25%', '50%'],
		            //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
		            //'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
					//'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
		            roseType : 'radius',
		            //饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
		            label: {
		                normal: {
		                    show: false
		                },
		                emphasis: {
		                    show: true
		                }
		            },
		            //标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线。
		            lableLine: {
		            	//普通状态下视觉引导线的样式。
		                normal: {
		                    show: false
		                },
		                //高亮状态下视觉引导线的样式。
		                emphasis: {
		                    show: true
		                }
		            },
		            data:[
		                {value:10, name:'rose1'},
		                {value:5, name:'rose2'},
		                {value:15, name:'rose3'},
		                {value:25, name:'rose4'},
		                {value:20, name:'rose5'},
		                {value:35, name:'rose6'},
		                {value:30, name:'rose7'},
		                {value:40, name:'rose8'}
		            ]
		        },
		        {
		            name:'面积模式',
		            type:'pie',
		            //饼图的半径，数组的第一项是内半径，第二项是外半径。
		            radius : [30, 110],
		            //饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
		            center : ['75%', '50%'],
		            roseType : 'area',
		            data:[
		                {value:10, name:'rose1'},
		                {value:5, name:'rose2'},
		                {value:15, name:'rose3'},
		                {value:25, name:'rose4'},
		                {value:20, name:'rose5'},
		                {value:35, name:'rose6'},
		                {value:30, name:'rose7'},
		                {value:40, name:'rose8'}
		            ]
		        }
		    ]
		};
		myChart.setOption(option); 
    }
});