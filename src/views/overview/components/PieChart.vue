<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// import resize from './mixins/resize'

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
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        // title: {
        //   text: '入侵事件统计',
        //   textStyle: {
        //     fontSize: 25,
        //     color: 'black'
        //   }
        // },
        legend: {
          orient: 'vertical',
          icon: 'circle',
          right: '10%',
          top: 'center',
          data: [
            '账户破解源IP',
            '恶意程序',
            '进程异常行为',
            '关键文件变更',
            '网站后门',
            '反弹Shell',
            '异常Shell',
            '高危命令执行',
            '自启动检测',
            '提权操作',
            'Rootkit程序',
            '风险账户'
          ]
        },
        series: [
          {
            // name: '访问来源',
            type: 'pie',
            radius: ['50%', '65%'],
            center: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
              formatter: '{b}\n{c}'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',
                color: 'black'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 11, name: '账户破解源IP' },
              { value: 6, name: '恶意程序' },
              { value: 28, name: '进程异常行为' },
              { value: 2, name: '关键文件变更' },
              { value: 8, name: '网站后门' },
              { value: 4, name: '反弹Shell' },
              { value: 2, name: '异常Shell' },
              { value: 10, name: '高危命令执行' },
              { value: 22, name: '自启动检测' },
              { value: 36, name: '提权操作' },
              { value: 15, name: 'Rootkit程序' },
              { value: 20, name: '风险账户' }
            ]
          }
        ]
      })
      // 设置默认选中高亮部分
      const myChart = this.chart
      const index = 0
      // myChart.dispatchAction({
      //   type: 'highlight',
      //   seriesIndex: 0,
      //   dataIndex: 0
      // })
      // myChart.on('mouseover', function (e) {
      //   // 当检测到鼠标悬停事件，取消默认选中高亮
      //   if (e.dataIndex !== index) {
      //     myChart.dispatchAction({
      //       type: 'downplay',
      //       seriesIndex: 0,
      //       dataIndex: index
      //     })
      //   }
      // })
      // // 检测鼠标移出后显示之前默认高亮的那块
      // myChart.on('mouseout', function (e) {
      //   this.chart.dispatchAction({
      //     type: 'highlight',
      //     seriesIndex: 0,
      //     dataIndex: 0
      //   })
      // })
      myChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 0 })
      // 当鼠标移入时，如果不是第一项，则把当前项置为选中，如果是第一项，则设置第一项为当前项
      myChart.on('mouseover', function (e) {
        myChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: 0 })
        if (e.dataIndex !== index) {
          myChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: index })
        }
        if (e.dataIndex === 0) {
          myChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: e.dataIndex })
        }
      })

      // 当鼠标离开时，把当前项置为选中
      myChart.on('mouseout', function (e) {
        // index = e.dataIndex
        myChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 0 })
      })
    }
  }
}
</script>
