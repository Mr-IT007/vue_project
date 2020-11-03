<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// import resize from './mixins/resize'

// const animationDuration = 6000

export default {
  // mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          text: 'TOP5风险主机',
          textStyle: {
            fontSize: 25,
            color: 'black'
          }
        },
        grid: {
          top: '20%',
          left: 10,
          right: 10,
          // bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['172.16.30.78', '172.16.30.173', '172.16.30.130', '172.16.30.108', '172.16.30.150'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        legend: {
          data: ['风险A', '风险B', '风险C'],
          left: 'center',
          bottom: '10'
        },
        series: [{
          name: '风险A',
          type: 'bar',
          stack: 'vistors',
          barWidth: '40%',
          data: [79, 52, 200, 334, 390]
          // animationDuration
        }, {
          name: '风险B',
          type: 'bar',
          stack: 'vistors',
          barWidth: '40%',
          data: [80, 52, 200, 300, 350]
          // animationDuration
        }, {
          name: '风险C',
          type: 'bar',
          stack: 'vistors',
          barWidth: '40%',
          data: [30, 150, 200, 350, 300]
          // animationDuration
        }]
      })
    }
  }
}
</script>
