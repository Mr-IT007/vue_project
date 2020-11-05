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
                  <el-link style="font-size: 30px; font-weight: 500; color: #526ecc" @click="assetRiskLink">
                    <count-to :start-val="0" :end-val="assetRiskNum" :duration="2600"/>
                  </el-link>
                  <div style="font-size: 15px; color: black; font-weight: normal; align-self: center; margin-left: 5px">个</div>
                </div>
                <div style="font-size: 15px; padding-top: 10px; display: flex; justify-content: flex-start">
                  较昨日
                  <i v-if="assetRiskState === '持平'" class="el-icon-right" style="color: #1989fa; margin-left: 5px"></i>
                  <i v-else-if="assetRiskState === '上升'" class="el-icon-top" style="color: #f56c6c; margin-left: 5px"></i>
                  <i v-else class="el-icon-bottom" style="color: #67c23a; margin-left: 5px"></i>
                  <div v-if="assetRiskState === '持平'" style="color: #1989fa; margin-left: 5px">{{ assetRiskState }}</div>
                  <div v-else-if="assetRiskState === '上升'" style="color: #f56c6c; margin-left: 5px">{{ assetRiskState }}</div>
                  <div v-else style="color: #67c23a; margin-left: 5px">{{ assetRiskState }}</div>
                </div>
              </div>
              <div class="inner-text-1">
                基线检查
                <div class="inner-number" style="font-size: 30px; color: #526ecc; font-weight: bold">
                  <el-link style="font-size: 30px; font-weight: 500; color: #526ecc" @click="baseCheckLink">
                    <count-to :start-val="0" :end-val="baseCheckNum" :duration="2600"/>
                  </el-link>
                  <div style="font-size: 15px; color: black; font-weight: normal; align-self: center; margin-left: 5px">个</div>
                </div>
                <div style="font-size: 15px; padding-top: 10px; display: flex; justify-content: flex-start">
                  较昨日
                  <i v-if="baseCheckState === '持平'" class="el-icon-right" style="color: #1989fa; margin-left: 5px"></i>
                  <i v-else-if="baseCheckState === '上升'" class="el-icon-top" style="color: #f56c6c; margin-left: 5px"></i>
                  <i v-else class="el-icon-bottom" style="color: #67c23a; margin-left: 5px"></i>
                  <div v-if="baseCheckState === '持平'" style="color: #1989fa; margin-left: 5px">{{ baseCheckState }}</div>
                  <div v-else-if="baseCheckState === '上升'" style="color: #f56c6c; margin-left: 5px">{{ baseCheckState }}</div>
                  <div v-else style="color: #67c23a; margin-left: 5px">{{ baseCheckState }}</div>
                </div>
              </div>
              <div class="inner-text-1">
                入侵检测
                <div class="inner-number" style="font-size: 30px; color: #526ecc; font-weight: bold">
                  <el-link style="font-size: 30px; font-weight: 500; color: #526ecc" @click="hackCheckLink">
                    <count-to :start-val="0" :end-val="hackCheckNum" :duration="2600"/>
                  </el-link>
                  <div style="font-size: 15px; color: black; font-weight: normal; align-self: center; margin-left: 5px">个</div>
                </div>
                <div style="font-size: 15px; padding-top: 10px; display: flex; justify-content: flex-start">
                  较昨日
                  <i v-if="hackCheckState === '持平'" class="el-icon-right" style="color: #1989fa; margin-left: 5px"></i>
                  <i v-else-if="hackCheckState === '上升'" class="el-icon-top" style="color: #f56c6c; margin-left: 5px"></i>
                  <i v-else class="el-icon-bottom" style="color: #67c23a; margin-left: 5px"></i>
                  <div v-if="hackCheckState === '持平'" style="color: #1989fa; margin-left: 5px">{{ hackCheckState }}</div>
                  <div v-else-if="hackCheckState === '上升'" style="color: #f56c6c; margin-left: 5px">{{ hackCheckState }}</div>
                  <div v-else style="color: #67c23a; margin-left: 5px">{{ hackCheckState }}</div>
                </div>
              </div>
              <div class="inner-text-1">
                漏洞风险
                <div class="inner-number" style="font-size: 30px; color: #526ecc; font-weight: bold">
                  <el-link style="font-size: 30px; font-weight: 500; color: #526ecc" @click="bugRiskLink">
                    <count-to :start-val="0" :end-val="bugRiskNum" :duration="2600"/>
                  </el-link>
                  <div style="font-size: 15px; color: black; font-weight: normal; align-self: center; margin-left: 5px">个</div>
                </div>
                <div style="font-size: 15px; padding-top: 10px; display: flex; justify-content: flex-start">
                  较昨日
                  <i v-if="bugRiskState === '持平'" class="el-icon-right" style="color: #1989fa; margin-left: 5px"></i>
                  <i v-else-if="bugRiskState === '上升'" class="el-icon-top" style="color: #f56c6c; margin-left: 5px"></i>
                  <i v-else class="el-icon-bottom" style="color: #67c23a; margin-left: 5px"></i>
                  <div v-if="bugRiskState === '持平'" style="color: #1989fa; margin-left: 5px">{{ bugRiskState }}</div>
                  <div v-else-if="bugRiskState === '上升'" style="color: #f56c6c; margin-left: 5px">{{ bugRiskState }}</div>
                  <div v-else style="color: #67c23a; margin-left: 5px">{{ bugRiskState }}</div>
                </div>
              </div>
              <div class="inner-text-1">
                行为基线
                <div class="inner-number" style="font-size: 30px; color: #526ecc; font-weight: bold">
                  <el-link style="font-size: 30px; font-weight: 500; color: #526ecc" @click="behaviorLink">
                    <count-to :start-val="0" :end-val="0" :duration="2600"/>
                  </el-link>
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
          <div style="display: flex; justify-content: space-between">
            <div style="font-size: 20px">安全风险趋势</div>
            <div>
              <el-button size="small" type="primary" plain style="width: 100px">最近7天</el-button>
              <el-button size="small" type="primary" plain style="width: 100px">最近30天</el-button>
              <el-button size="small"><i class="el-icon-refresh"></i></el-button>
            </div>
          </div>
          <risk-safe/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <div style="font-size: 20px; height: 32px">安全风险趋势</div>
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
          <div style="display: flex; justify-content: space-between">
            <div style="font-size: 20px">入侵事件统计</div>
            <div>
              <el-button size="small" type="primary" plain style="width: 100px">最近7天</el-button>
              <el-button size="small" type="primary" plain style="width: 100px">最近30天</el-button>
              <el-button size="small"><i class="el-icon-refresh"></i></el-button>
            </div>
          </div>
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <div style="font-size: 20px; height: 32px;">TOP5风险主机</div>
          <bar-chart />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="chart-wrapper">
          <div style="padding: 0 16px; font-size: 25px; margin-bottom: 16px">
            实时入侵事件
          </div>
          <el-table
            :data="hackData"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            :cell-style="{ 'font-weight': 400 }"
          >
            <el-table-column
              prop="warning_name"
              width="200"
              label="告警名称"
              align="center"
              header-align="center">
              <template slot-scope="scope">
                <el-link type="primary" :underline="false" @click="hackDetail(scope.$index, scope.row)">{{ scope.row.warning_name }}</el-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="affected_server"
              label="受影响的服务器"
              align="center"
              header-align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="server_type"
              width="100"
              label="服务器类型"
              align="center"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              prop="content"
              label="简述"
              align="center"
              header-align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="happened"
              width="150"
              label="发生时间"
              align="center"
              header-align="center"
            />
            <el-table-column
              prop="dealt"
              width="150"
              label="解决时间"
              align="center"
              header-align="center"
            />
            <el-table-column
              prop="status"
              width="100"
              label="状态"
              align="center"
              header-align="center"
            />
            <el-table-column
              prop="disposal"
              width="150"
              label="处理方式"
              align="center"
              header-align="center"
            />
            <el-table-column
              width="100"
              label="操作"
              align="center"
              header-align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  plain
                  icon="el-icon-s-cooperation"
                  @click="handleDisposal(scope.$index, scope.row)">处理</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="处理告警事件"
      :visible.sync="disposalVisible"
      width="40%"
    >
      <el-table
        :data="dealData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :cell-style="{ 'font-weight': 400 }"
      >
        <el-table-column
          prop="warning_name"
          width="200"
          label="告警名称"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="status"
          width="100"
          label="状态"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="ip"
          width="120"
          label="IP"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="content"
          label="简述"
          align="center"
          header-align="center"
          show-overflow-tooltip
        />
      </el-table>
      <div style="margin-top: 25px">
        处理方式：
        <el-radio style="margin-left: 80px" v-model="radio" label="手动处理">手动处理</el-radio>
        <el-radio v-model="radio" label="忽略">忽略</el-radio>
      </div>
      <div style="margin-top: 50px; display: flex; justify-content: flex-start">
        <span style="width: 80px">备注：</span>
        <el-input
          type="textarea"
          style="width: 80%"
          :autosize="{ minRows: 4 }"
          v-model="remark"
          resize="none"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="disposalVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="disposalCertain">确 定</el-button>
      </span>
    </el-dialog>
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
  created () {
    this.getHostRiskData()
  },
  data () {
    return {
      disposalVisible: false,
      remark: '',
      radio: '手动处理',
      hackData: [
        {
          warning_name: '账户暴力破解',
          affected_server: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          server_type: '云主机',
          content: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          happened: 'xxxx-xx-xx xx:xx:xx',
          dealt: 'xxxx-xx-xx xx:xx:xx',
          status: '未处理',
          disposal: null
        },
        {
          warning_name: '账户暴力破解',
          affected_server: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          server_type: '虚拟机',
          content: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          happened: 'xxxx-xx-xx xx:xx:xx',
          dealt: 'xxxx-xx-xx xx:xx:xx',
          status: '未处理',
          disposal: null
        },
        {
          warning_name: '账户暴力破解',
          affected_server: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          server_type: '云主机',
          content: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          happened: 'xxxx-xx-xx xx:xx:xx',
          dealt: 'xxxx-xx-xx xx:xx:xx',
          status: '未处理',
          disposal: null
        },
        {
          warning_name: '账户暴力破解',
          affected_server: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          server_type: '云主机',
          content: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          happened: 'xxxx-xx-xx xx:xx:xx',
          dealt: 'xxxx-xx-xx xx:xx:xx',
          status: '未处理',
          disposal: null
        },
        {
          warning_name: '账户暴力破解',
          affected_server: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          server_type: '云主机',
          content: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          happened: 'xxxx-xx-xx xx:xx:xx',
          dealt: 'xxxx-xx-xx xx:xx:xx',
          status: '未处理',
          disposal: null
        }
      ],
      dealData: [{
        warning_name: '账户暴力破解',
        status: '未处理',
        ip: 'xxx.xxx.xxx.xxx',
        content: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      }],
      assetRiskNum: 0,
      assetRiskState: '',
      bugRiskNum: 0,
      bugRiskState: '',
      baseCheckNum: 0,
      baseCheckState: '',
      hackCheckNum: 0,
      hackCheckState: ''
    }
  },
  methods: {
    hackDetail (index, row) {
      const h = this.$createElement
      this.$msgbox({
        title: row.warning_name,
        message: h('div', null, [
          h('p', null, [
            h('span', null, '服务器名称： '),
            h('span', null, row.affected_server)
          ]),
          h('br'),
          h('p', null, [
            h('span', null, 'IP地址： '),
            h('span', null, 'xxx.xx.xx.xxx')
          ]),
          h('br'),
          h('p', null, [
            h('span', null, '攻击源IP： '),
            h('span', null, 'xxx.xx.xx.xxx')
          ]),
          h('br'),
          h('p', null, [
            h('span', null, '攻击类型： '),
            h('span', null, 'ssh')
          ]),
          h('br'),
          h('p', null, [
            h('span', null, '尝试破解次数： '),
            h('span', null, 15)
          ]),
          h('br'),
          h('p', null, [
            h('span', null, '状态： '),
            h('span', null, row.status)
          ])
        ]),
        confirmButtonText: '处理'
      }).then(action => {
        // this.$message({
        //   type: 'info',
        //   message: row.server_type
        // })
        this.disposalVisible = true
      })
    },
    handleDisposal (index, row) {
      this.disposalVisible = true
    },
    disposalCertain () {
      console.log(this.radio)
      console.log(this.remark)
      this.disposalVisible = false
    },
    getHostRiskData () {
      this.$http.get('http://172.16.30.78:8019/host_risk_total').then(res => {
        if (res.status === 200) {
          const getData = res.data
          // console.log(getData)
          this.assetRiskNum = getData.riskhost_count
          this.assetRiskState = getData.rh_state
          this.bugRiskNum = getData.gscan_count
          this.bugRiskState = getData.gs_state
          this.baseCheckNum = getData.baseline_count
          this.baseCheckState = getData.bl_state
          this.hackCheckNum = getData.vuln_count
          this.hackCheckState = getData.vuln_state
        }
      })
    },
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
    },
    assetRiskLink () {
      this.$router.push('/thread')
      this.$store.dispatch('updateRiskTabAsync', '资产管理')
      this.$emit('getActivePath', '/thread')
      this.$emit('getCurrentBread', '风险预防')
    },
    baseCheckLink () {
      this.$router.push('/thread')
      this.$store.dispatch('updateRiskTabAsync', '基线检查')
      this.$emit('getActivePath', '/thread')
      this.$emit('getCurrentBread', '风险预防')
    },
    hackCheckLink () {
      this.$router.push('/thread')
      this.$store.dispatch('updateRiskTabAsync', '入侵检测')
      this.$emit('getActivePath', '/thread')
      this.$emit('getCurrentBread', '风险预防')
    },
    bugRiskLink () {
      this.$router.push('/thread')
      this.$store.dispatch('updateRiskTabAsync', '漏洞管理')
      this.$emit('getActivePath', '/thread')
      this.$emit('getCurrentBread', '风险预防')
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
    font-size: 20px;
    //font-weight: bold;
    .inner-panel-1{
      display: flex;
      justify-content: space-between;
      padding: 16px;
      .inner-text-1 {
        font-size: 18px;
        padding-top: 20px;
        font-weight: 300;
      }
    }
    .inner-panel-2{
      display: flex;
      justify-content: space-around;
      padding: 16px;
      .inner-text-2 {
        font-size: 18px;
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

.el-button--small, .el-button--small.is-round {
  padding: 9px 10px;
  border: 1px solid gray
}

//.el-button--primary.is-plain.is-active,
//.el-button--primary.is-plain:active {
//  background: #20B2AA;
//  border-color: #20B2AA;
//  color: #fff;
//}

.el-button--primary.is-plain:focus,
.el-button--primary.is-plain:hover {
  background: #526ecc;
  border-color: #526ecc;
  //color: #fff;
}

.el-button--primary.is-plain {
  color: #526ecc;
  border-color: #526ecc;
}
</style>
