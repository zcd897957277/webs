// 时间
$(document).ready(function () {
    // datetimepicker插件
    var dateArrS = ['#startDate', '#endDate']
    var dateArrG = ['#startDate2', '#endDate2'];
    var dateArr = ['#setStart_date', '#setEnd_date'];
    dateArrS.forEach(function (elm) {
        $(elm).datetimepicker({
            lang: 'ch', endDate: "Today",
            format: 'Y-m',
            datepicker: true,
            timepicker: false
        });
        $(elm).val(new Date().format("yyyy-MM"));
    });
    dateArrG.forEach(function (elm) {
        $(elm).datetimepicker({
            lang: 'ch', endDate: "Today",
            format: 'Y',
            datepicker: true,
            timepicker: false
        });
        $(elm).val(new Date().format("yyyy"));
    });
    dateArr.forEach(function (elm) {
        $(elm).datetimepicker({
            lang: 'ch', endDate: "Today",
            format: 'Y-m-d',
            datepicker: true,
            timepicker: false
        });
        $(elm).val(new Date().format("yyyy-MM-dd"));
    });

    charts();
});

// Charts
function charts() {
    // 初始时间
    function getChuShiDate() {
        var startDate = ($('#startDate').val()).toString();
        var starti = startDate.indexOf('-');
        var startY = startDate.substring(0, starti);
        var startM = startDate.substring(starti + 1);

        var date = [];

        for (var p = startM; p <= (startM + 11); p++) {
            var str = (p > 12 ? (parseInt(startY) + 1) : startY) + '-' + (parseInt(p) < 10 ? ('0' + parseInt(p)) : (parseInt(p) > 12 ? ('0' + (parseInt(p) - 12)) : parseInt(p)))
            date.push(str);
        }

        return date;
    }
    // 随机数据
    function randomData(smallNum, bigNum, length) {
        var len = 12,
            sn = 0,
            bn = 100;
        if (length) {
            len = length
        }

        if (smallNum) {
            sn = smallNum;
        }

        if (bigNum) {
            bn = bigNum;
        }
        var arr = [];
        for (var i = 0; i < len; i++) {
            var val = parseInt(sn + Math.random() * bn);
            arr.push(val);
        }

        return arr;
    }
    // 数组求和
    function arrSum(arr) {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }
    // 100组合数
    function random100(len) {
        var arr = [];

        for (var i = 0; i < len; i++) {
            arr[i] = Math.round(1 + Math.random() * 34);
        }
        var sum = arrSum(arr);
        for (var j = 0; j < len; j++) {
            arr[j] = Math.floor((arr[j] / sum) * 100)
        }

        var newSum = arrSum(arr);
        if (newSum < 100) {
            arr[len - 1] = arr[len - 1] + (100 - newSum);
            return arr;
        } else {
            return arr;
        }
    }
    // 获取所有的范围内的年月总和
    function getAllMouths(startY, startM, endY, endM) {
        var he = 0,
            end, start;
        if (startY > endY) {
            end = startY;
            start = endY;
        } else if (startY < endY) {
            end = endY;
            start = startY;
        } else {
            he = Math.abs(startM - endM);
            return he;
        }

        he = (13 - startM) + parseInt(endM);
        for (var i = 1; i < (end - start); i++) {
            he += 12;
        }

        return he;
    }
    // 时间周期
    function getDateZhouQi(startY, startM, endY, endM) {
        var xinfangDate = [],
            datesmall = [],
            dateMiddle = [],
            dateBig = [],
            end, start;
        if (startY < endY) {
            end = parseInt(endY);
            start = parseInt(startY);
        } else if (startY > endY) {
            end = parseInt(startY);
            start = parseInt(endY);
        } else {
            if (startM < endM) {
                for (var p = parseInt(startM); p <= endM; p++) {
                    var str = startY + '-' + (p < 10 ? (p = '0' + p) : p)
                    date.push(str);
                }
            } else if (startM > endM) {
                for (var p = parseInt(endM); p <= startM; p++) {
                    var str = startY + '-' + (p < 10 ? (p = '0' + p) : p)
                    date.push(str);
                }
            } else {
                date = getChuShiDate();
            }
            xinfangDate = date;

            return xinfangDate;
        }

        for (var q = parseInt(startM); q <= 12; q++) {
            var str = start + '-' + (q < 10 ? (q = '0' + q) : q);
            datesmall.push(str);
        }
        xinfangDate = datesmall;
        if ((end - start) > 0) {
            for (var r = 1; r < (end - start); r++) {
                for (var t = 1; t < 13; t++) {
                    var str = (start + 1) + '-' + (t < 10 ? (t = '0' + t) : t)
                    dateMiddle.push(str);
                }
                xinfangDate = xinfangDate.concat(dateMiddle);
            }
        }
        for (var p = 1; p <= endM; p++) {
            var str = end + '-' + (p < 10 ? (p = '0' + p) : p)
            dateBig.push(str);
        }
        xinfangDate = xinfangDate.concat(dateBig);

        return xinfangDate;
    }
    // 新房月度成交走势
    var xinfangDate = getChuShiDate();
    var xinfangshangArea = [75, 45, 100, 190, 165, 100, 95, 125, 50, 65, 55, 60];
    var xinfangchenArea = [100, 50, 200, 155, 153, 151, 152, 195, 148, 85, 90, 60];
    var xinfangchenPrice = [15500, 15600, 15700, 14500, 16500, 15100, 15200, 15900, 16800, 16400, 15200, 15000];
    var xinfangChart = echarts.init(document.getElementById('xinfang'));
    var xinfangOption = {
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
            x: '70%'
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
        legend: {
            x: 'center',
            textStyle: { color: '#fff' },
            data: ['上市面积', '成交面积', '成交均价'],
            y: 10
        },
        xAxis: {
            type: 'category',
            data: xinfangDate,
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
                name: '上市面积',
                min: 0,
                max: 300,
                //强制设置坐标轴分割间隔。
                splitNumber: '6',
                axisLabel: {
                    formatter: '{value} 万方',
                    textStyle: { color: 'rgba(255, 255, 255, 0.8)' },
                },
                axisTick: {
                    lineStyle: { color: 'rgba(255, 255, 255, 0.8)' }
                },
                splitLine: { show: false },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                }
            }, {
                type: 'value',
                name: '成交均价',
                min: 0,
                max: 25000,
                //强制设置坐标轴分割间隔。
                splitNumber: '5',
                axisLabel: {
                    formatter: '{value} (元/m²)',
                    textStyle: { color: 'rgba(255, 255, 255, 0.8)' },
                },
                axisTick: {
                    lineStyle: { color: 'rgba(255, 255, 255, 0.8)' }
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
                name: '上市面积',
                type: 'bar',
                data: xinfangshangArea
            },
            {
                name: '成交面积',
                type: 'bar',
                data: xinfangchenArea
            },
            {
                name: '成交均价',
                type: 'line',
                //设置控制的y轴
                yAxisIndex: 1,
                data: xinfangchenPrice
            }
        ]
    }
    xinfangChart.setOption(xinfangOption);

    // 住宅2009-2015年供应面积结构
    var gongyingChart = echarts.init(document.getElementById("gongyingmianji"));
    var gongyingYears = ['2009', '2010', '2011', '2012', '2013', '2014'];
    var gongyingDatas = [
        [24, 25, 22, 25, 32, 35], [15, 12, 10, 10, 10, 15], [35, 32, 27, 22, 22, 20], [0, 0, 2, 2, 4, 8], [8, 10, 9, 9, 6, 4], [10, 10, 13, 13, 14, 15], [8, 11, 17, 19, 12, 3]
    ]
    var gongyingOption = {
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: true,
                    readOnly: true
                },
                saveAsImage: {
                    show: true,
                    backgroundColor: 'rgb(54,88,100)'
                }
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            },
            formatter: '在{b}年: {a}<br />所占{c}%'
        },
        legend: {
            x: 'right',
            y: 'center',
            orient: 'vertical',
            textStyle: { color: '#fff' },
            data: ['>250', '180-250', '144-180', '120-144', '90-120', '70-90', '<70']
        },
        xAxis: [
            {
                name: '年份',
                gridIndex: 0,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: { color: 'rgba(255, 255, 255, 0.8)' }
                },
                axisTick: {
                    lineStyle: { color: 'rgba(255, 255, 255, 0.8)' }
                },
                axisLine: {
                    lineStyle: {
                        width: 3,
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                data: gongyingYears
            }
        ],
        yAxis: [
            {
                name: '所占比率',
                gridIndex: 0,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: { color: 'rgba(255, 255, 255, 0.8)' }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    lineStyle: { color: 'rgba(255, 255, 255, 0.8)' }
                },
                axisLabel: {
                    textStyle: { color: 'rgba(255, 255, 255, 0.8)' }
                },
                min: 0,
                max: 100
            }
        ],
        series: [
            {
                name: '>250',
                type: 'bar',
                barWidth: 70,
                itemStyle: {
                    normal: {
                        color: '#5E92A7',
                    }
                },
                stack: 1,
                barCategoryGap: '30%',
                data: gongyingDatas[0]
            },
            {
                name: '>250 2',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#5E92A7',
                    }
                },
                lineStyle: {
                    normal: {
                        width: 2, //设置线宽
                        shadowColor: 'rgba(0,0,0,0.4)'
                    }
                },
                stack: 2,
                data: gongyingDatas[0]
            },
            {
                name: '180-250',
                type: 'bar',
                barWidth: 70,
                itemStyle: {
                    normal: {
                        color: '#00516D',
                    }
                },
                stack: 1,
                barCategoryGap: '30%',
                data: gongyingDatas[1]
            },
            {
                name: '180-250 2',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#00516D',
                    }
                },
                lineStyle: {
                    normal: {
                        width: 2, //设置线宽
                        shadowColor: 'rgba(0,0,0,0.4)'
                    }
                },
                stack: 2,
                data: gongyingDatas[1]
            },
            {
                name: '144-180',
                type: 'bar',
                barWidth: 70,
                itemStyle: {
                    normal: {
                        color: '#00A4DC',
                    }
                },
                stack: 1,
                barCategoryGap: '30%',
                data: gongyingDatas[2]
            },
            {
                name: '144-180 2',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#00A4DC',
                    }
                },
                lineStyle: {
                    normal: {
                        width: 2, //设置线宽
                        shadowColor: 'rgba(0,0,0,0.4)'
                    }
                },
                stack: 2,
                data: gongyingDatas[2]
            },
            {
                name: '120-144',
                type: 'bar',
                barWidth: 70,
                itemStyle: {
                    normal: {
                        color: '#F15940',
                    }
                },
                stack: 1,
                barCategoryGap: '30%',
                data: gongyingDatas[3]
            },
            {
                name: '120-144 2',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#F15940',
                    }
                },
                lineStyle: {
                    normal: {
                        width: 2, //设置线宽
                        shadowColor: 'rgba(0,0,0,0.4)'
                    }
                },
                stack: 2,
                data: gongyingDatas[3]
            },
            {
                name: '90-120',
                type: 'bar',
                barWidth: 70,
                itemStyle: {
                    normal: {
                        color: '#EDA288',
                    }
                },
                stack: 1,
                barCategoryGap: '30%',
                data: gongyingDatas[4]
            },
            {
                name: '90-120 2',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#EDA288',
                    }
                },
                lineStyle: {
                    normal: {
                        width: 2, //设置线宽
                        shadowColor: 'rgba(0,0,0,0.4)'
                    }
                },
                stack: 2,
                data: gongyingDatas[4]
            },
            {
                name: '70-90',
                type: 'bar',
                barWidth: 70,
                itemStyle: {
                    normal: {
                        color: '#DBBFA6',
                    }
                },
                stack: 1,
                barCategoryGap: '30%',
                data: gongyingDatas[5]
            },
            {
                name: '70-90 2',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#DBBFA6',
                    }
                },
                lineStyle: {
                    normal: {
                        width: 2, //设置线宽
                        shadowColor: 'rgba(0,0,0,0.4)'
                    }
                },
                stack: 2,
                data: gongyingDatas[5]
            },
            {
                name: '<70',
                type: 'bar',
                barWidth: 70,
                itemStyle: {
                    normal: {
                        color: '#A8A9AD',
                    }
                },
                stack: 1,
                barCategoryGap: '30%',
                data: gongyingDatas[6]
            },
            {
                name: '<70 2',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#A8A9AD',
                    }
                },
                lineStyle: {
                    normal: {
                        width: 2, //设置线宽
                        shadowColor: 'rgba(0,0,0,0.4)'
                    }
                },
                stack: 2,
                data: gongyingDatas[6]
            }
        ]
    };
    gongyingChart.setOption(gongyingOption);

    // 新房的自定义数据变化
    function xinfang() {
        var endDate = ($('#endDate').val()).toString();
        var endi = endDate.indexOf('-');
        var endY = parseInt(endDate.substring(0, endi));
        var endM = parseInt(endDate.substring(endi + 1));

        var startDate = ($('#startDate').val()).toString();
        var starti = startDate.indexOf('-');
        var startY = parseInt(startDate.substring(0, starti));
        var startM = parseInt(startDate.substring(starti + 1));

        // 总月
        var he = getAllMouths(startY, startM, endY, endM);
        // 时间周期
        var xinfangDate = getDateZhouQi(startY, startM, endY, endM);

        if (he > 1) {
            xinfangshangAreaNew = randomData(45, 155, he);
            xinfangchenAreaNew = randomData(50, 150, he);
            xinfangchenPriceNew = randomData(14500, 2500, he);
            xinfangChart.setOption({
                xAxis: {
                    data: xinfangDate,
                },
                series: [
                    {
                        data: xinfangshangAreaNew
                    },
                    {
                        data: xinfangchenAreaNew
                    },
                    {
                        data: xinfangchenPriceNew
                    }
                ]
            });
        } else {
            xinfangChart.setOption(xinfangOption);
        }
    }
    // 住宅2009-2015年供应面积结构
    function gongying() {
        var endY = parseInt($('#endDate2').val());
        var startY = parseInt($('#startDate2').val());

        // 时间的跨度
        var len = Math.abs(endY - startY + 1);

        // len决定数据条数
        if (len > 0) {
            var gongyingYears = [];
            if (startY > endY) {
                for (var j = endY; j <= startY; j++) {
                    gongyingYears.push(j);
                }
            } else if (startY < endY) {
                for (var j = startY; j <= endY; j++) {
                    gongyingYears.push(j);
                }
            } else {
                return;
            }

            var gongyingDatas = [[0], [0], [0], [0], [0], [0], [0]]
            for (var i = 0; i < len; i++) {
                // 随机产生数字 7表示每一条数据数是7
                var arr = random100(7);
                arr.forEach(function (elm, index) {
                    gongyingDatas[index][i] = elm;
                })
            }
            var Series = [];
            for (var j = 0; j < 7; j++) {
                Series.push({
                    stack: 1,
                    data: gongyingDatas[j]
                }, {
                        stack: 2,
                        data: gongyingDatas[j]
                    });
            }
            gongyingChart.setOption({
                xAxis: [
                    {
                        data: gongyingYears
                    }
                ],
                series: Series
            })
        }
    }

    // 获取时间
    $('#xinfang_sure_btn').on('click', function (e) {
        e.preventDefault();
        // 新房月度成交走势
        xinfang();
    });
    // 获取时间
    $('#gongying_sure_btn').on('click', function (e) {
        e.preventDefault();
        // 住宅2009-2015年供应面积结构
        gongying();
    });

    // 超过阈值的建筑体量
    var tiliangChart = echarts.init(document.getElementById('jianzhutiliang'));
    var tiliangOption = {
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: true,
                    readOnly: true
                },
                saveAsImage: {
                    show: true,
                    backgroundColor: 'rgb(54,88,100)'
                }
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}的建筑体量占总比的({d}%)",
            textStyle: { color: '#fff' }
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'center',
            data: ['羽林街道', '南明街道', '七星街道', '沙溪镇', '儒岙镇', '回山镇', '澄潭镇', '小将镇', '镜岭镇', '梅渚镇', '大市聚镇', '双彩乡', '巧英乡', '东茗乡', '新林乡', '城南乡'],
            textStyle: { color: '#fff' }
        },
        series: [
            {
                name: '',
                type: 'pie',
                center: ['40%', '50%'],
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        show: true,
                        formatter: '{b}的\n建筑体量为{c}',
                        position: 'outside',
                        textStyle: {
                            color: 'rgba(255,255,255,.8)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: [
                    { value: 15, name: '羽林街道' },
                    { value: 20, name: '南明街道' },
                    { value: 32, name: '七星街道' },
                    { value: 17, name: '沙溪镇' },
                    { value: 5, name: '儒岙镇' },
                    { value: 29, name: '回山镇' },
                    { value: 16, name: '澄潭镇' },
                    { value: 9, name: '小将镇' },
                    { value: 13, name: '镜岭镇' },
                    { value: 36, name: '梅渚镇' },
                    { value: 24, name: '大市聚镇' },
                    { value: 3, name: '双彩乡' },
                    { value: 31, name: '巧英乡' },
                    { value: 29, name: '东茗乡' },
                    { value: 8, name: '新林乡' },
                    { value: 28, name: '城南乡' }
                ],
            }
        ]
    };
    tiliangChart.setOption(tiliangOption);
}

// 浏览器大小调整时调用
window.onresize = function () {
    charts();
};