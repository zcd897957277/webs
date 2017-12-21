$.jsPanel({
	//定位
    position:    {my: "center-top", at: "center-top", offsetY: 15},
    //主题
    theme:       "rebeccapurple",
    contentSize: {width: 600, height: 450},
    headerTitle: "仪表盘",
    content: "<div id='wrap1' style='height:450px'></div>",
    //插入document后操作面板
    callback:    function () {
    	var myChart=echarts.init(document.getElementById("wrap1"));
    	//data 为随机数字
		function data(){
		    var d = [];
		    for (var i = 0; i < 24; i++) {
		        d.push({name:i+'~'+(i+1),value:Math.random()*100});
		    }
		    return d;
		}
		
		option = {
		    title : {
		        text: '某站点用户访问来源',
		        subtext: '纯属虚构',
		        //x title水平位置
		        x:'center'
		    },
		    //提示框组件
		    tooltip: {
		    	//触发类型。
		        trigger: 'item',
		        //提示的位置
		        position: ['48.5%', '49.2%'],
		        backgroundColor: 'rgba(50,50,50,0)',
		        textStyle : {
		            color: 'yellow',
		            fontWeight: 'bold'
		        },
		        //提示框浮层内容格式器，支持字符串模板和回调函数两种形式。
		        //饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
		        formatter: "{d}%"
		    },
		    //系列列表。每个系列通过 type 决定自己的图表类型
		    series : [
		        {
		            name: '上网时间',
		            //饼图主要用于表现不同类目的数据在总和中的占比。每个的弧度表示数据数量的比例
		            type: 'pie',
		            //饼图的半径，数组的第一项是内半径，第二项是外半径。
					//支持设置成百分比，相对于容器高宽中较小的一项的一半。
					//可以将内半径设大显示成圆环图（Donut chart）。
		            radius : ['5%', '70%'],
		            //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
		            //'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
		            //'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
		            roseType: 'area',
		            color:['#3fa7dc'],
		            data:data(),
		            //标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线。
		            labelLine: {
		            	//普通状态下视觉引导线的样式。
		                normal: {
		                    show: false
		                }
		            },
		            //饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
		            label: {
		                normal: {
		                    show: false
		                }
		            },
		            //图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
		            itemStyle: {
		                normal: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                },
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        },
		        {
		            name: '',
		            //仪表盘
		            type: 'gauge',
		            //最小的数据值
		            min: 0,
		            //最大的数据值
		            max: 24,
		            //仪表盘起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
		            startAngle: 90,
		            //仪表盘结束角度。
		            endAngle: 449.9,
		            //仪表盘半径，可以是相对于容器高宽中较小的一项的一半的百分比，也可以是绝对的数值。
		            radius: '82%',
		            //仪表盘刻度的分割段数。
		            splitNumber: 24,
		            //仪表盘刻度是否是顺时针增长。
		            clockwise: false,
		            //是否开启动画。
		            animation: false,
		            //仪表盘详情，用于显示数据。
		            detail: {
		            	//格式化函数或者字符串
		                formatter: '{value}',
		                textStyle: {
		                    color: '#63869e'
		                }
		            },
		            detail:{
		                show: false
		            },
		            //刻度样式。
		            axisTick: {
		                show: false
		            },
		            //仪表盘刻度的分割段数。
		            axisLine: {
		                lineStyle: {
		                    color: [
		                        [0.25, '#63869e'],
		                        [0.75, '#ffffff'],
		                        [1, '#63869e']
		                    ],
		                    width: '40%',
		                    shadowColor: '#0d4b81', //默认透明
		                    shadowBlur: 40,
		                    opacity: 1
		                }
		            },
		            //分隔线样式。
		            splitLine: {
		            	//分隔线线长。支持相对半径的百分比。
		                length: 5,
		                lineStyle: {
		                    color: '#ffffff',
		                    width: 2
		                }
		            },
		            //刻度标签。
		            axisLabel: {
		                formatter: function(v){
		                    return v?v:'';
		                },
		                textStyle: {
		                    color: "red",
		                    fontWeight: 700
		                }
		            },
		            itemStyle: {
		                normal: {
		                    color: 'green',
		                    width: 2
		                }
		            }
		        },
		        {
		            name: '',
		            type: 'gauge',
		            min: 0,
		            max: 24,
		            startAngle: 90,
		            endAngle: 449.9,
		            radius: '72%',
		            //仪表盘刻度的分割段数。
		            splitNumber: 24,
		            //仪表盘刻度是否是顺时针增长
		            clockwise: false,
		            animation: false,
		            //仪表盘详情，用于显示数据。
		            detail: {
		                formatter: '{value}',
		                textStyle: {
		                    color: '#63869e'
		                }
		            },
		            detail:{
		                show: false
		            },
		            //刻度样式。
		            axisTick: {
		                show: false
		            },
		            axisLine: {
		                lineStyle: {
		                    color: [
		                        [1, '#E8E8E8']
		                    ],
		                    width: '10%',
		                    opacity:0.8
		                }
		            },
		            splitLine: {
		                show:true,
		                length: '92%',
		                lineStyle: {
		                    color: 'grey',
		                    width: '1'
		                }
		            },
		            axisLabel: {
		                show:false,
		                formatter: function(v){
		                    return v?v:'';
		                },
		                textStyle: {
		                    color: "#fb5310",
		                    fontWeight: 700
		                }
		            },
		            itemStyle: {
		                normal: {
		                    color: 'green',
		                    width: 2,
		                    borderWidth: 3,
		                }
		            }
		        }
		    ]
		};
		myChart.setOption(option);
    }
});