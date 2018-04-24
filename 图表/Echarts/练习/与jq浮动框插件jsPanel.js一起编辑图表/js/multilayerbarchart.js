$.jsPanel({
  //定位
  position: { my: "center-top", at: "center-top", offsetY: 15 },
  //主题
  theme: "rebeccapurple",
  contentSize: { width: 600, height: 450 },
  headerTitle: "柱状图",
  //content:     "<div id='wrap1' style='height:450px'></div>",中间height必须加因为图表canvas不能从浮动面板内拿到height
  content: "<div id='wrap1' style='height:450px'></div>",
  //插入document后操作面板
  callback: function () {
    var myChart = echarts.init(document.getElementById("wrap1"));
    option = {
      title: {
        text: 'Ins and Outs',
        //subtext副标题文本
        subtext: 'United States merchandise',
        //主副标题之间的间距。
        itemGap: 20,
        left: '2%',
        textStyle: {
          fontSize: 32
        },
        subtextStyle: {
          color: '#3A4750',
          fontSize: 17
        }
      },
      backgroundColor: '#CDDDE6',
      //dataZoom 组件 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响。
      dataZoom: {
        show: false
      },
      //直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。可以在网格上绘制折线图，柱状图，散点图（气泡图）。
      grid: [
        {
          show: true,
          x: '7%',
          y: '25%',
          width: '38%',
          borderWidth: 70,
          borderColor: '#B9D0DD',
          backgroundColor: '#B9D0DD',
          height: '58%'
        },
        {
          show: true,
          x2: '7%',
          y: '25%',
          width: '38%',
          borderWidth: 70,
          borderColor: '#B9D0DD',
          backgroundColor: '#B9D0DD',
          height: '58%'
        }
      ],
      tooltip: {
      },
      legend: {
        right: '3%',
        top: '6%',
        //图例列表的布局朝向。
        orient: 'vertical',
        data: ['Canada and Mexico', 'Latin America', '', 'Europe', 'China', '', 'Japan', 'Other Asia', '', 'Rest of the world']
      },
      //直角坐标系 grid 中的 x 轴，一般情况下单个 grid 组件最多只能放上下两个 x 轴，
      //多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠。
      xAxis: [
        {
          //x 轴所在的 grid 的索引，默认位于第一个 grid。
          gridIndex: 0,
          z: 2,
          //坐标轴在 grid 区域中的分隔线。
          splitLine: {
            show: false
          },
          //坐标轴刻度相关设置。
          axisTick: {
            show: false
          },
          //坐标轴轴线相关设置。
          axisLine: {
            lineStyle: {
              width: 3
            }
          },
          data: ['1963', '73', '83', '93', '2003', '11']
        },
        {
          gridIndex: 1,
          z: 2,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 3
            }
          },
          data: ['1963', '73', '83', '93', '2003', '11']
        }
      ],
      yAxis: [
        {
          gridIndex: 0,
          z: 2,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#E8ECF1',
              width: 3
            }
          },
          position: 'right',
          min: 0,
          max: 100
        },
        {
          gridIndex: 1,
          //组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
          //z相比zlevel优先级更低，而且不会创建新的 Canvas。
          z: 2,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#E8ECF1',
              width: 3
            }
          },
          position: 'right',
          min: 0,
          max: 100
        }
      ],
      series: [{//ins
        name: 'Canada and Mexico',
        type: 'bar',
        xAxisIndex: 0,
        yAxisIndex: 0,
        //图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；
        //emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
        itemStyle: {
          normal: {
            color: '#5E92A7',
          }
        },
        //数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置。
        stack: 1,
        //类目间柱形距离，默认为类目间距的20%，可设固定值
        barCategoryGap: '30%',
        data: [24, 25, 22, 25, 32, 35]
      },
      {
        name: 'Latin America',
        type: 'bar',
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          normal: {
            color: '#00516D',
          }
        },
        stack: 1,
        barCategoryGap: '30%',
        data: [15, 12, 10, 10, 10, 15]
      },
      {
        name: 'Europe',
        type: 'bar',
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          normal: {
            color: '#00A4DC',
          }
        },
        stack: 1,
        barCategoryGap: '30%',
        data: [35, 32, 27, 22, 22, 20]
      },
      {
        name: 'China',
        type: 'bar',
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          normal: {
            color: '#F15940',
          }
        },
        stack: 1,
        barCategoryGap: '30%',
        data: [0, 0, 2, 2, 4, 8]
      },
      {
        name: 'Japan',
        type: 'bar',
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          normal: {
            color: '#EDA288',
          }
        },
        stack: 1,
        barCategoryGap: '30%',
        data: [8, 10, 9, 9, 6, 4]
      },
      {
        name: 'Other Asia',
        type: 'bar',
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          normal: {
            color: '#DBBFA6',
          }
        },
        stack: 1,
        barCategoryGap: '30%',
        data: [10, 10, 13, 13, 14, 15]
      },
      {
        name: 'Rest of the world',
        type: 'bar',
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          normal: {
            color: '#A8A9AD',
          }
        },
        stack: 1,
        barCategoryGap: '30%',
        data: [8, 11, 17, 19, 12, 3]
      },
      //outs
      {
        name: 'Canada and Mexico',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#5E92A7',
          }
        },
        stack: 2,
        barCategoryGap: '30%',
        data: [24, 26, 24, 24, 23, 24]
      },
      {
        name: 'Latin America',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#00516D',
          }
        },
        stack: 2,
        barCategoryGap: '30%',
        data: [20, 14, 14, 12, 12, 14]
      },
      {
        name: 'Europe',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#00A4DC',
          }
        },
        stack: 2,
        barCategoryGap: '30%',
        data: [23, 24, 20, 20, 20, 18]
      },
      {
        name: 'China',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#F15940',
          }
        },
        stack: 2,
        barCategoryGap: '30%',
        data: [0, 0, 1, 5, 10, 20]
      },
      {
        name: 'Japan',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#EDA288',
          }
        },
        stack: 2,
        barCategoryGap: '30%',
        data: [8, 10, 12, 15, 6, 6]
      },
      {
        name: 'Other Asia',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#DBBFA6',
          }
        },
        stack: 2,
        barCategoryGap: '30%',
        data: [10, 12, 15, 15, 14, 10]
      },
      {
        name: 'Rest of the world',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#A8A9AD',
          }
        },
        stack: 2,
        barCategoryGap: '30%',
        data: [15, 14, 14, 9, 15, 8]
      }],

    };
    myChart.setOption(option);
  }
});