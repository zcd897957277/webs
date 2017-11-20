$.jsPanel({
	//定位
    position:    {my: "center-top", at: "center-top", offsetY: 15},
    //主题
    theme:       "rebeccapurple",
    contentSize: {width: 600, height: 450},
    headerTitle: "Example jsPanel",
    //content:     "<div id='wrap1' style='height:450px'></div>",中间height必须加因为图表canvas不能从浮动面板内拿到height
    content:     "<div id='wrap1' style='height:450px'></div>",
    //插入document后操作面板
    callback:    function () {
        var myChart=echarts.init(document.getElementById("wrap1"));
        var option = {
            title : {
                text: '国贸商场商品进出数量对比',
                subtext: '(单位：元)'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['售货数','进货数']
            },
            color:['blue', 'green'],
            toolbox: {
                show : true,  
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['扳手','牛奶','电脑','显示器','牛肉','手机','牛奶','电风扇','鼠标','自行车','空调']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'售货数',
                    type:'bar',
                    data:[39,89,29,19,99,89,89,52,39,89,88],
                },
                {
                    name:'进货数',
                    type:'bar',
                    data:[70,100,50,71,69,10,100,68,59,189,88],
                }
            ]
        };
        myChart.setOption(option); 
    }
});