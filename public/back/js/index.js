// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('myChart1'));

// 指定图表的配置项和数据
var option1 = {
  title: {
    text: '2018-11-15晚上好!'
  },
  tooltip: {},
  legend: {
    data: ['个数']
  },
  xAxis: {
    data: ["2B", "傻X", "呆逼", "脑残", "神经病", "二货", "白痴", "奇葩"]
  },
  yAxis: {},
  series: [{
    name: '个数',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20, 40, 35]
  }]
};

// 使用刚指定的配置项和数据显示图表。
myChart1.setOption(option1);
//第二个
var myChart2 = echarts.init(document.getElementById('myChart2'));
var xAxisData = [];
var data1 = [];
var data2 = [];
for (var i = 0; i < 100; i++) {
  xAxisData.push('类目' + i);
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
}

option2 = {
  title: {
    text: '柱状图动画延迟'
  },
  legend: {
    data: ['渣男', '渣女'],
    align: 'left'
  },
  toolbox: {
    // y: 'bottom',
    feature: {
      magicType: {
        type: ['stack', 'tiled']
      },
      dataView: {},
      saveAsImage: {
        pixelRatio: 2
      }
    }
  },
  tooltip: {
    trigger:"axis"
  },
  xAxis: {
    data: xAxisData,
    silent: false,
    splitLine: {
      show: false
    }
  },
  yAxis: {
  },
  series: [{
    name: '渣男',
    type: 'line',
    data: data1,
    animationDelay: function (idx) {
      return idx * 10;
    }
  }, {
    name: '渣女',
    type: 'line',
    data: data2,
    animationDelay: function (idx) {
      return idx * 10 + 100;
    }
  }],
  animationEasing: 'elasticOut',
  animationDelayUpdate: function (idx) {
    return idx * 5;
  }
};
myChart2.setOption(option2);