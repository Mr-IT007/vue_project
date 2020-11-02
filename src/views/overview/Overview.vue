<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="15" class="panel-group">
      <el-col :xs="24" :sm="24" :lg="12" class="card-panel-col">
        <div class="card-panel-description">
          主机风险统计
          <div class="inner-panel-1">
              <div class="inner-text-1">
                资产风险
                <div class="inner-number" style="font-size: 30px; color: #526ecc; font-weight: bold">
                  <count-to :start-val="0" :end-val="20" :duration="2600"/>
                  <div style="font-size: 15px; color: black; font-weight: normal; align-self: center; margin-left: 5px">个</div>
                </div>
                <div style="font-size: 15px; padding-top: 10px; display: flex; justify-content: flex-start">较昨日 <i class="el-icon-right" style="color: #1989fa; margin-left: 5px"></i>
                  <div style="color: #1989fa; margin-left: 5px">持平</div>
                </div>
              </div>
              <div class="inner-text-1">
                基线检查
                <div class="inner-number" style="font-size: 30px; color: #526ecc; font-weight: bold">
                  <count-to :start-val="0" :end-val="18" :duration="2600"/>
                  <div style="font-size: 15px; color: black; font-weight: normal; align-self: center; margin-left: 5px">个</div>
                </div>
                <div style="font-size: 15px; padding-top: 10px; display: flex; justify-content: flex-start">较昨日 <i class="el-icon-right" style="color: #1989fa; margin-left: 5px"></i>
                  <div style="color: #1989fa; margin-left: 5px">持平</div>
                </div>
              </div>
              <div class="inner-text-1">
                入侵检测
                <div class="inner-number" style="font-size: 30px; color: #526ecc; font-weight: bold">
                  <count-to :start-val="0" :end-val="15" :duration="2600"/>
                  <div style="font-size: 15px; color: black; font-weight: normal; align-self: center; margin-left: 5px">个</div>
                </div>
                <div style="font-size: 15px; padding-top: 10px; display: flex; justify-content: flex-start">较昨日 <i class="el-icon-top" style="color: #f56c6c; margin-left: 5px"></i>
                  <div style="color: #f56c6c; margin-left: 5px">升高</div>
                </div>
              </div>
              <div class="inner-text-1">
                漏洞风险
                <div class="inner-number" style="font-size: 30px; color: #526ecc; font-weight: bold">
                  <count-to :start-val="0" :end-val="10" :duration="2600"/>
                  <div style="font-size: 15px; color: black; font-weight: normal; align-self: center; margin-left: 5px">个</div>
                </div>
                <div style="font-size: 15px; padding-top: 10px; display: flex; justify-content: flex-start">较昨日 <i class="el-icon-bottom" style="color: #67c23a; margin-left: 5px"></i>
                  <div style="color: #67c23a; margin-left: 5px">降低</div>
                </div>
              </div>
              <div class="inner-text-1">
                行为基线
                <div class="inner-number" style="font-size: 30px; color: #526ecc; font-weight: bold">
                  <count-to :start-val="0" :end-val="9" :duration="2600"/>
                  <div style="font-size: 15px; color: black; font-weight: normal; align-self: center; margin-left: 5px">个</div>
                </div>
                <div style="font-size: 15px; padding-top: 10px; display: flex; justify-content: flex-start">较昨日 <i class="el-icon-right" style="color: #1989fa; margin-left: 5px"></i>
                  <div style="color: #1989fa; margin-left: 5px">持平</div>
                </div>
              </div>
          </div>
        </div>
<!--          <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />-->
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12" class="card-panel-col">
        <div class="card-panel-description">
          资产统计
          <div class="inner-panel-2">
            <div class="inner-text-2">
              宿主机
              <div class="inner-number" style="font-size: 30px; font-weight: 500">
                <el-link style="font-size: 30px; font-weight: 500; color: #526ecc" @click="hostNumLink">
                  <count-to :start-val="0" :end-val="98" :duration="2600"/>
                </el-link>
                <div style="font-size: 15px; font-weight: normal; align-self: center; margin-left: 5px">台</div>
              </div>
            </div>
            <div class="inner-text-2">
              虚拟机
              <div class="inner-number" style="font-size: 30px; font-weight: 500">
                <el-link style="font-size: 30px; font-weight: 500; color: #526ecc" @click="vmNumLink">
                  <count-to :start-val="0" :end-val="206" :duration="2600"/>
                </el-link>
                <div style="font-size: 15px; font-weight: normal; align-self: center; margin-left: 5px">台</div>
              </div>
            </div>
            <div class="inner-text-2">
              容器
              <div class="inner-number" style="font-size: 30px; font-weight: 500">
                <el-link style="font-size: 30px; font-weight: 500; color: #526ecc">
                  <count-to :start-val="0" :end-val="0" :duration="2600"/>
                </el-link>
                <div style="font-size: 15px; font-weight: normal; align-self: center; margin-left: 5px">个</div>
              </div>
            </div>
            <div class="inner-text-2">
              分组
              <div class="inner-number" style="font-size: 30px; font-weight: 500">
                <el-link style="font-size: 30px; font-weight: 500; color: #526ecc" @click="groupNumLink">
                  <count-to :start-val="0" :end-val="9" :duration="2600"/>
                </el-link>
                <div style="font-size: 15px; font-weight: normal; align-self: center; margin-left: 5px">组</div>
              </div>
            </div>
          </div>
<!--          <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />-->
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <risk-safe/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <risk-operation/>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="15">
<!--      <el-col :xs="24" :sm="24" :lg="8">-->
<!--        <div class="chart-wrapper">-->
<!--          <raddar-chart />-->
<!--        </div>-->
<!--      </el-col>-->
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RiskSafe from './components/RiskSafe'
import RiskOperation from './components/RiskOperation'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
// import PanelGroup from './components/PanelGroup'
import CountTo from 'vue-count-to'

export default {
  name: 'Overview',
  components: {
    RiskSafe,
    RiskOperation,
    PieChart,
    BarChart,
    // PanelGroup
    CountTo
  },
  methods: {
    vmNumLink () {
      this.$router.push('/terminal')
      // console.log(this.$store.state.activeTab)
      this.$store.dispatch('updateTabDataAsync', '虚拟机')
      // console.log(this.$store.state.activeTab)
      this.$emit('getActivePath', '/terminal')
      this.$emit('getCurrentBread', '终端管理')
    },
    groupNumLink () {
      this.$router.push('/terminal')
      // console.log(this.$store.state.activeTab)
      this.$store.dispatch('updateTabDataAsync', '分组')
      // console.log(this.$store.state.activeTab)
      this.$emit('getActivePath', '/terminal')
      this.$emit('getCurrentBread', '终端管理')
    },
    hostNumLink () {
      this.$router.push('/terminal')
      // console.log(this.$store.state.activeTab)
      this.$store.dispatch('updateTabDataAsync', '云主机')
      // console.log(this.$store.state.activeTab)
      this.$emit('getActivePath', '/terminal')
      this.$emit('getCurrentBread', '终端管理')
    }
  }
}
</script>

<style lang="less" scoped>
.dashboard-editor-container {
  padding: 0;
  //background-color: rgb(240, 242, 245);
  background-color: #eaedf1;
  position: relative;

  .card-panel-description {
    background: #fff;
    padding: 16px;
    margin-bottom: 15px;
    //text-align: center;
    height: 200px;
    font-size: 25px;
    //font-weight: bold;
    .inner-panel-1{
      display: flex;
      justify-content: space-between;
      padding: 16px;
      .inner-text-1 {
        font-size: 20px;
        padding-top: 20px;
        font-weight: 300;
      }
    }
    .inner-panel-2{
      display: flex;
      justify-content: space-around;
      padding: 16px;
      .inner-text-2 {
        font-size: 20px;
        padding-top: 20px;
        font-weight: 300;
      }
    }
  }
  .inner-number {
    display: flex;
    justify-self: flex-start;
    padding-top: 10px;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 15px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
