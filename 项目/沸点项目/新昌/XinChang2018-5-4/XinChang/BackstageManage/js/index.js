var map;
var zoomNormal = 14;
var zoomZone = 16;
var zoomMax = 18;
var XClng = 120.90385;
var XClat = 29.49983;
// 获取元素
function fGetElement() {
    var c = new Array();
    for (var b = 0; b < arguments.length; b++) {
        var a = arguments[b];
        // 判断是否是字符串类型
        if (typeof a == "string") {
            // 获取a
            a = document.getElementById(a)
        }
        if (arguments.length == 1) {
            return a;
        }
        c.push(a);
    }
    return c;
} 
//布局控制
var TLayoutControl = {
    // nMapH 地图的高度
    // nMapW地图宽度
    oMap: null, oFullScreen: null, nMapH: 0
    , nMapW: 0, aDomAry: []
    , fInitLayout: function () {//初始化布局
        var b = this;
        // 获取元素
        if (this.aDomAry.length < 2) {
            this.aDomAry = fGetElement("absoluteArea");
        }
        this.oMap = this.aDomAry;
        // 地图宽度设置
        this.oMap.style.width = '100%';
        this.oMap.style.height = '500px';
        this.oMap.style.marginTop = '20px';
    },
    fWinResizeHandle: function () {//调整可视框大小
        this.fInitLayout();//初始化
    }
};
// 初始化布局
TLayoutControl.fInitLayout();
// 地图大小调整时调用
window.onresize = function () {
    charts();
    TLayoutControl.fWinResizeHandle();
};

function loadindexmap() {
    //初始化地图对象 
    map = new T.Map("absoluteArea");
    //设置显示地图的中心点和级别 
    map.centerAndZoom(new T.LngLat(XClng, XClat), zoomNormal);
    // 缩放控件的配置
    var config={
        position:T_ANCHOR_BOTTOM_RIGHT,//  控件初始位置，在四角位置之一。
        zoomInText:"+",// 放大层级按钮的文字显示。
        zoomOutText:"-",// 缩小层级按钮的文字显示。
        zoomInTitle:"放大",// 放大层级按钮的标题显示。
        zoomOutTitle:"缩小"
    };
    //创建一个地图缩放控件。
    var control=new T.Control.Zoom(config);
    // // 添加控件
    map.addControl(control);
}

$(document).ready(function () {
    charts();
});

// Charts 
function charts(){
    // 随机数据
    function randomData(num) {
        var n = 1;
        if (num) {
            n = num;
        }

        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 * n - 10;
        return {
            name: now.toString(),
            value: [
                [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                Math.round(value)
            ]
        }
    }
    // 数据量
    function dataNumbers(num) {
        var n = 1000;
        if (num) {
            n = num;
        }
        var data = [];
        for (var i = 0; i < n; i++) {
            data.push(randomData());
        }

        return data;
    }
    // line Charts id:lineone
    // 新昌2017年各类土地平均楼面价
    var tudixData = ['住宅', '商住', '商业', '其他', '工业'];
    var tuditData = [4500, 2000, 2500, 1250, 1000];
    var tudiChart = echarts.init(document.getElementById('lineone'));
    var tudiOption = {
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: true,
                    readOnly: true
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar']
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true,
                    backgroundColor: 'rgb(54,88,100)'
                }
            },
            y: 10,
        },
        grid:{
            left:'15%',
            right:'5%',
            bottom:'15%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        xAxis: {
            type: 'category',
            data: tudixData,
            axisLabel: {
                textStyle: { color: 'rgba(255, 255, 255, 0.8)' },
            },
            splitLine: { show: false },
            axisTick: {
                lineStyle: { color: 'rgba(255, 255, 255, 0.8)' }
            },
            axisLine: {
                lineStyle: {
                    width: 3,
                    color: 'rgba(255, 255, 255, 0.8)'
                }
            }
        },
        yAxis: [
            {
                type: 'value',
                name: '平均楼面价(万元)',
                min: 0,
                max: 5000,
                interval: 1000,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: { color: 'rgba(255, 255, 255, 0.8)' },
                },
                axisTick: {
                    lineStyle: { opacity: 0 }
                },
                splitLine: { show: false },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                }
            }
        ],
        series: [
            {
                name: '平均楼面价(万元)',
                type: 'line',
                data: tuditData,
                lineStyle: {
                    normal: {
                        color: 'rgba(255,255,255,1)'
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(255,255,255,.5)'
                    }
                }
            }
        ]
    }
    tudiChart.setOption(tudiOption);

    // Bar Chart id: barone
    // 新昌2017年人口数（万人）
    //'羽林街道', '南明街道', '七星街道', '沙溪镇', '儒岙镇', '回山镇', '澄潭镇', '小将镇', '镜岭镇', '梅渚镇', '大市聚镇', '双彩乡', '巧英乡', '东茗乡', '新林乡', '城南乡'
    var renkouxData = ['羽林街道', '南明街道', '七星街道', '沙溪镇', '儒岙镇', '回山镇', '澄潭镇', '小将镇', '镜岭镇', '梅渚镇', '大市聚镇', '双彩乡', '巧英乡', '东茗乡', '新林乡', '城南乡'];
    var renkouyData = [1000, 1200, 1500, 1900, 2500, 3700, 2000, 3750, 3500, 4200, 4800, 4700, 5900, 5850, 6800, 4800];
    var renkouChart = echarts.init(document.getElementById('barone'));
    var renkouOption = {
        tooltip: {
            trigger: 'axis',
            textStyle: { color: 'rgba(255, 255, 255, 0.8)' }
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: { readOnly: false },
                magicType: {
                    type: ['line', 'bar'],
                    option: {
                        line: {
                            lineStyle: {
                                normal: {
                                    color: 'rgba(255, 255, 255, 0.8)'
                                }
                            }
                        }
                    }
                },
                restore: {},
                saveAsImage: {
                    show: true,
                    backgroundColor: 'rgb(54,88,100)'
                }
            }
        },
        grid: {
            left: '4%',
            right: '10%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: [
            {
                name: '乡镇街道',
                type: 'category',
                data: renkouxData,
                splitLine: { show: false },
                axisLabel: {
                    textStyle: { color: 'rgba(255, 255, 255, 0.8)' },
                    rotate:45,
                    interval:0,  
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                axisTick: {
                    lineStyle: { color: 'rgba(255, 255, 255, 0.8)' }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
            }
        ],
        yAxis: [
            {
                name: '平均楼面价(元/m²)',
                nameLocation: 'end',
                type: 'value',
                max: 8000,
                min: 0,
                splitNumber: '8',
                axisLabel: {
                    formatter: '{value}',
                    textStyle: { color: 'rgba(255, 255, 255, 0.8)' }
                },
                axisTick: {
                    lineStyle: { color: 'rgba(255, 255, 255, 0.8)' }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                }
            }
        ],
        series: [
            {
                name: '平均楼面价',
                type: 'bar',
                data: renkouyData,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0',
                                '#C1232B', '#ffffff'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}'
                        }
                    }
                }
            }
        ]
    };
    renkouChart.setOption(renkouOption);

    // Pie Chart id:pieone pietwo
    // 新昌2017年低年龄段人口数（万人）
    var dilingChart = echarts.init(document.getElementById('pieone'));
    var dilingOption = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: <br/>占总比({d}%)",
            textStyle: { color: 'rgba(255, 255, 255, 0.8)' }
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { readOnly: false },
                saveAsImage: {
                    show: true,
                    backgroundColor: 'rgb(54,88,100)'
                }
            }
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'center',
            data: ['4岁以下', '4~6岁', '7~12岁', '12~15岁', '15~18岁', '18岁以上'],
            textStyle: { color: 'rgba(255, 255, 255, 0.8)' }
        },
        series: [
            {
                name: '',
                type: 'pie',
                center: ['45%', '50%'],
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        show: true,
                        formatter: "{b}：{c}(万人)",
                        position: 'outside',
                        textStyle: {
                            color: 'rgba(255,255,255,.8)',
                        }
                    },
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: [
                    { value: 55, name: '4岁以下' },
                    { value: 5, name: '4~6岁' },
                    { value: 12, name: '7~12岁' },
                    { value: 9, name: '12~15岁' },
                    { value: 19, name: '15~18岁' },
                    { value: 25, name: '18岁以上' },
                ]
            }
        ]
    };
    dilingChart.setOption(dilingOption);

    // 新昌2017年中年龄段人口数（万人）
    var zhonglingChart = echarts.init(document.getElementById('pietwo'));
    var zhonglingOption = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: <br/>占总比({d}%)",
            textStyle: { color: 'rgba(255, 255, 255, 0.8)' }
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { readOnly: false },
                saveAsImage: {
                    show: true,
                    backgroundColor: 'rgb(54,88,100)'
                }
            }
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'center',
            data: ['20岁以下', '20~30岁', '30~40岁', '40~50岁', '50岁以上'],
            textStyle: { color: 'rgba(255, 255, 255, 0.8)' }
        },
        series: [
            {
                type: 'pie',
                radius:['50%','70%'],
                center: ['45%', '50%'],
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        show: true,
                        formatter: "{b}：{c}(万人)",
                        position: 'outside',
                        textStyle: {
                            color: 'rgba(255,255,255,.8)',
                        }
                    },
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: [
                    { value: 30, name: '20岁以下' },
                    { value: 26, name: '20~30岁' },
                    { value: 35, name: '30~40岁' },
                    { value: 21, name: '40~50岁' },
                    { value: 23, name: '50岁以上' },
                ]
            }
        ]
    };
    zhonglingChart.setOption(zhonglingOption);

    // Dynamic Chart id:dynamicone
    // 新昌2017年乡镇街道平均楼面价
    var startY = (new Date()).getFullYear();
    var startM = (parseInt((new Date()).getMonth()) + 1);
    var startD = (new Date()).getDate();
    var now = +new Date(startY, startM, startD);
    // 一天的毫秒数
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    // 加载1000条数据 === 运行1000天 
    var loumianjiaData = dataNumbers();
    var loumianjiaChart = echarts.init(document.getElementById("dynamicone"));
    var loumianjiaOption = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
                type:'cross',
                crossStyle:{
                    color:'rgba(255, 255, 255, 0.8)'
                }
            }
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {
                    show:true,
                    backgroundColor: 'rgb(54,88,100)'
                }
            }
        },
        grid: {
            left: '4%',
            right: '4%',
            bottom: '4%',
            containLabel: true
        },
        xAxis: {
            type: 'time',
            axisLabel: {
                textStyle: { color: 'rgba(255, 255, 255, 0.8)' },
            },
            splitLine: { show: false },
            axisTick: {
                lineStyle: { color: 'rgba(255, 255, 255, 0.8)' }
            },
            axisLine: {
                lineStyle: {
                    width: 3,
                    color: 'rgba(255, 255, 255, 0.8)'
                }
            }
        },
        yAxis: {
            name: '数据变化',
            type: 'value',
            boundaryGap: [0, '100%'],
            axisLabel: {
                textStyle: { color: 'rgba(255, 255, 255, 0.8)' },
            },
            splitLine: { show: false },
            axisTick: {
                lineStyle: { color: 'rgba(255, 255, 255, 0.8)' }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.8)'
                }
            }
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(255, 158, 68)'
                    }, {
                        offset: 1,
                        color: 'rgb(255, 70, 131)'
                    }])
                }
            },
            data: loumianjiaData
        }]
    };
    loumianjiaChart.setOption(loumianjiaOption);
    var timer1 = setInterval(function () {
        for (var i = 0; i < 5; i++) {
            loumianjiaData.shift();
            loumianjiaData.push(randomData());
        }
        loumianjiaChart.setOption({
            series: [{
                data: loumianjiaData
            }]
        });
    }, 1000);
}