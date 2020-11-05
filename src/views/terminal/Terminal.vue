<template>
  <el-tabs type="border-card" v-model="activeTab">
    <el-tab-pane label="云主机" name="云主机">
      <div class="search-main">
        <div>
          <el-button type="primary" size="small" :disabled="!multipleSelection.length">部署策略</el-button>
          <el-button type="primary" size="small" :disabled="!multipleSelection.length">分配到组</el-button>
        </div>
        <div class="search-input">
          <div class="input-select">
            <el-input placeholder="输入关键字" v-model="input" size="small">
              <el-select v-model="value" slot="prepend" placeholder="请选择" style="width: 120px">
                <el-option label="服务器名称" value="1"></el-option>
                <el-option label="IP地址" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div>
            <el-button size="small" style="margin-left: 10px" @click="dialogVisible = true">高级搜索<i class="el-icon-caret-bottom"></i></el-button>
            <el-button size="small" style="margin-left: 10px; margin-right: 0"><i class="el-icon-refresh"></i></el-button>
          </div>
        </div>
      </div>
      <el-dialog
        title="高级搜索"
        :visible.sync="dialogVisible"
        width="30%">
        <span>搜索内容</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">搜索</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="详情"
        :visible.sync="detailVisible"
        width="30%">
        <span>详情内容</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="detailVisible = false">确定</el-button>
        </span>
      </el-dialog>
      <el-table
        ref="multipleTable"
        :data="cloudHostData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :cell-style="{ 'font-weight': 400 }"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="host_name"
          label="主机名称"
          width="100"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="agent_id"
          label="Agent ID"
          align="center"
          header-align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="ip"
          label="IP"
          width="200"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="res"
          label="检测结果"
          width="100"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-link v-if="scope.row.res === '有风险'" type="danger" :underline="false" @click="warningDetail">{{ scope.row.res }}</el-link>
            <span v-else>{{ scope.row.res }}</span>
<!--            <span :class="scope.row.res === '有风险'? 'chFtColor': ''">{{ scope.row.res }}</span>-->
          </template>
        </el-table-column>
        <el-table-column
          prop="os"
          label="操作系统"
          width="100"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="agent_status"
          label="Agent状态"
          width="100"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              :type="scope.row.agent_status === 'ok'? 'success': 'info'"
              :icon="scope.row.agent_status === 'ok'? 'el-icon-check': 'el-icon-close'"
              circle
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="server_group"
          label="服务器组"
          width="100"
          align="center"
          header-align="center"
        />
        <el-table-column
          width="200"
          label="操作"
          align="center"
          header-align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :type="scope.row.res === '有风险'? 'danger': 'primary'"
              plain
              icon="el-icon-s-order"
              @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            <el-button
              size="mini"
              :type="scope.row.res === '有风险'? 'danger': 'primary'"
              plain
              icon="el-icon-s-tools"
              @click="handleDetail(scope.$index, scope.row)">配置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="虚拟机" name="虚拟机">
      <div class="search-main">
        <div></div>
        <div class="search-input">
          <div class="input-select">
            <el-input placeholder="输入关键字" v-model="input" size="small">
              <el-select v-model="value" slot="prepend" placeholder="请选择" style="width: 120px">
                <el-option label="服务器名称" value="1"></el-option>
                <el-option label="IP地址" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div>
            <el-button size="small" style="margin-left: 10px" @click="dialogVisible = true">高级搜索<i class="el-icon-caret-bottom"></i></el-button>
            <el-button size="small" style="margin-left: 10px; margin-right: 0"><i class="el-icon-refresh"></i></el-button>
          </div>
        </div>
      </div>
      <el-table
        :data="vmData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :cell-style="{ 'font-weight': 400 }">
        <el-table-column
          prop="host_ip"
          label="所属主机IP"
          align="center"
          width="200"
          header-align="center">
          <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column
          prop="host_id"
          label="所属主机ID"
          align="center"
          header-align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="vm_name"
          label="虚拟机名称"
          width="100"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="agent_id"
          label="Agent ID"
          align="center"
          header-align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="ip"
          label="IP"
          width="200"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="res"
          label="检测结果"
          width="100"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-link v-if="scope.row.res === '有风险'" type="danger" :underline="false" @click="warningDetail">{{ scope.row.res }}</el-link>
            <span v-else>{{ scope.row.res }}</span>
<!--            <span :class="scope.row.res === '有风险'? 'chFtColor': ''">{{ scope.row.res }}</span>-->
          </template>
        </el-table-column>
        <el-table-column
          prop="os"
          label="操作系统"
          width="100"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="agent_status"
          label="Agent状态"
          width="100"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              :type="scope.row.agent_status === 'ok'? 'success': 'info'"
              :icon="scope.row.agent_status === 'ok'? 'el-icon-check': 'el-icon-close'"
              circle
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="server_group"
          label="服务器组"
          width="100"
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
              :type="scope.row.res === '有风险'? 'danger': 'primary'"
              plain
              icon="el-icon-s-order"
              @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="分组" name="分组">
      <div class="search-main">
        <div>
          <el-button type="primary" size="small" @click.native.prevent="createGroup">创建服务器组</el-button>
          <el-dialog
            title="创建服务器组"
            width="60%"
            :visible.sync="createVisible"
            :close-on-click-modal="false"
            :show-close = "false"
            :close-on-press-escape = "false"
          >
            <div>
              <el-form :model="ruleGroup" :rules="rules" ref="ruleGroup" label-width="150px">
                <el-form-item label="服务器组名称" prop="name">
                  <el-input v-model="ruleGroup.name" size="small" style="width: 200px"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="table-box" style="display: flex; justify-content: space-around">
              <div class="table-container">
<!--                <el-scrollbar style="height: 100%">-->
                <el-table
                  ref="leftTab"
                  :data="leftTableData"
                  tooltip-effect="dark"
                  style="width: 100%; border: 1px solid lightgray"
                  height="300"
                  :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                  @selection-change="tableTransfer"
                >
                  <el-table-column
                    type="selection"
                    :reserve-selection="true"
                    width="45"
                    align="center"
                    header-align="center"
                  />
                  <el-table-column
                    prop="server_name"
                    label="服务器名称"
                    width="150"
                    align="center"
                    header-align="center"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    prop="ip"
                    label="IP"
                    width="120"
                    align="center"
                    header-align="center"
                  />
                  <el-table-column
                    prop="os"
                    label="操作系统"
                    width="100"
                    align="center"
                    header-align="center"
                  />
                </el-table>
<!--                </el-scrollbar>-->
              </div>
              <div class="table-container">
                <el-table
                  ref="rightTab"
                  :data="rightTableData"
                  tooltip-effect="dark"
                  style="width: 100%; border: 1px solid lightgray"
                  height="300"
                  :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                >
                  <el-table-column
                    prop="server_name"
                    label="服务器名称"
                    width="150"
                    align="center"
                    header-align="center"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    prop="ip"
                    label="IP"
                    width="120"
                    align="center"
                    header-align="center"
                  />
                  <el-table-column
                    prop="os"
                    label="操作系统"
                    width="100"
                    align="center"
                    header-align="center"
                  />
                </el-table>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button size="small" type="primary" :disabled="!rightTableData.length" @click="createCertain('ruleGroup')">确 定</el-button>
              <el-button size="small" @click="createCancle('ruleGroup')">取 消</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="search-input">
          <div class="input-select">
            <el-input placeholder="输入服务器组名" v-model="input" size="small">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div>
            <el-button size="small" style="margin-left: 10px; margin-right: 0"><i class="el-icon-refresh"></i></el-button>
          </div>
        </div>
      </div>
      <el-table
        :data="groupData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :cell-style="{ 'font-weight': 400 }"
      >
        <el-table-column
          prop="server_group"
          label="服务器组"
          align="center"
          show-overflow-tooltip
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="server_counts"
          label="云主机数量"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="vm_counts"
          label="虚拟机数量"
          align="center"
          header-align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="risk_server"
          label="有风险云主机数量"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="risk_vm"
          label="有风险虚拟机数量"
          align="center"
          header-align="center"
        />
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'Terminal',
  data () {
    return {
      activeTab: this.$store.state.activeTab,
      cloudHostData: [
        {
          host_name: 'xxxx',
          agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xx.xx.xxx',
          os: 'Linux',
          agent_status: 'ok',
          res: '无风险',
          server_group: 'B'
        },
        {
          host_name: 'xxxx',
          agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xx.xx.xxx',
          os: 'Ubuntu',
          agent_status: 'ok',
          res: '有风险',
          server_group: 'B'
        },
        {
          host_name: 'xxxx',
          agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xx.xx.xxx',
          os: 'CentOS',
          agent_status: 'off',
          res: '有风险',
          server_group: 'C'
        },
        {
          host_name: 'xxxx',
          agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xx.xx.xxx',
          os: 'RedHat',
          agent_status: 'ok',
          res: '无风险',
          server_group: 'A'
        },
        {
          host_name: 'xxxx',
          agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xx.xx.xxx',
          os: 'Linux',
          agent_status: 'ok',
          res: '无风险',
          server_group: 'B'
        },
        {
          host_name: 'xxxx',
          agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xx.xx.xxx',
          os: 'Ubuntu',
          agent_status: 'off',
          res: '无风险',
          server_group: 'C'
        },
        {
          host_name: 'xxxx',
          agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xx.xx.xxx',
          os: 'Linux',
          agent_status: 'ok',
          res: '有风险',
          server_group: 'D'
        }
      ],
      groupData: [
        {
          server_group: 'A',
          server_counts: 2,
          vm_counts: 3,
          risk_server: 1,
          risk_vm: 1
        },
        {
          server_group: 'B',
          server_counts: 2,
          vm_counts: 2,
          risk_server: 0,
          risk_vm: 1
        },
        {
          server_group: 'C',
          server_counts: 1,
          vm_counts: 2,
          risk_server: 0,
          risk_vm: 0
        },
        {
          server_group: 'D',
          server_counts: 3,
          vm_counts: 1,
          risk_server: 1,
          risk_vm: 0
        }
      ],
      vmData: [
        {
          host_ip: 'xxx.xx.xx.xxx',
          host_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          vm_name: 'xxxx',
          agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xx.xx.xxx',
          os: 'Linux',
          agent_status: 'ok',
          res: '无风险',
          server_group: 'A'
        },
        {
          host_ip: 'xxx.xx.xx.xxx',
          host_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          vm_name: 'xxxx',
          agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xx.xx.xxx',
          os: 'Ubuntu',
          agent_status: 'ok',
          res: '无风险',
          server_group: 'B'
        },
        {
          host_ip: 'xxx.xx.xx.xxx',
          host_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          vm_name: 'xxxx',
          agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xx.xx.xxx',
          os: 'CentOS',
          agent_status: 'off',
          res: '有风险',
          server_group: 'D'
        },
        {
          host_ip: 'xxx.xx.xx.xxx',
          host_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          vm_name: 'xxxx',
          agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xx.xx.xxx',
          os: 'RedHat',
          agent_status: 'ok',
          res: '无风险',
          server_group: 'C'
        },
        {
          host_ip: 'xxx.xx.xx.xxx',
          host_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          vm_name: 'xxxx',
          agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xx.xx.xxx',
          os: 'Linux',
          agent_status: 'ok',
          res: '有风险',
          server_group: 'B'
        },
        {
          host_ip: 'xxx.xx.xx.xxx',
          host_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          vm_name: 'xxxx',
          agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xx.xx.xxx',
          os: 'Ubuntu',
          agent_status: 'off',
          res: '有风险',
          server_group: 'C'
        },
        {
          host_ip: 'xxx.xx.xx.xxx',
          host_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          vm_name: 'xxxx',
          agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xx.xx.xxx',
          os: 'Linux',
          agent_status: 'ok',
          res: '无风险',
          server_group: 'D'
        },
        {
          host_ip: 'xxx.xx.xx.xxx',
          host_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          vm_name: 'xxxx',
          agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xx.xx.xxx',
          os: 'CentOS',
          agent_status: 'ok',
          res: '无风险',
          server_group: 'A'
        },
        {
          host_ip: 'xxx.xx.xx.xxx',
          host_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          vm_name: 'xxxx',
          agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xx.xx.xxx',
          os: 'RetHat',
          agent_status: 'off',
          res: '有风险',
          server_group: 'A'
        }
      ],
      multipleSelection: [],
      options: [
        {
          value: '服务器名称',
          label: '服务器名称'
        },
        {
          value: 'IP地址',
          label: 'IP地址'
        }
      ],
      value: '服务器名称',
      input: '',
      dialogVisible: false,
      detailVisible: false,
      createVisible: false,
      ruleGroup: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      },
      rightTableData: [],
      leftTableData: [
        {
          server_name: 'xxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xxx.xxx.xxx',
          os: 'Linux'
        },
        {
          server_name: 'xxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xxx.xxx.xxx',
          os: 'CentOS'
        },
        {
          server_name: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xxx.xxx.xxx',
          os: 'Linux'
        },
        {
          server_name: 'xxxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xxx.xxx.xxx',
          os: 'Redhat'
        },
        {
          server_name: 'xxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xxx.xxx.xxx',
          os: 'Linux'
        },
        {
          server_name: 'xxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xxx.xxx.xxx',
          os: 'CentOS'
        },
        {
          server_name: 'xxxxxxxxxxxxxxxxxxxxxxx',
          ip: 'xxx.xxx.xxx.xxx',
          os: 'Linux'
        }
      ],
      creatSelection: []
      // op: true
    }
  },

  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      // console.log(this.multipleSelection)
      // this.op = !!this.multipleSelection.length
      // console.log(this.op)
    },
    handleDetail (index, row) {
      this.detailVisible = true
    },
    warningDetail () {
      this.$router.push('/thread')
      this.$emit('getActivePath', '/thread')
      this.$emit('getCurrentBread', '风险预防')
    },
    createGroup () {
      console.log('create')
      this.createVisible = true
    },
    tableTransfer (val) {
      console.log(val)
      this.rightTableData = val
    },
    createCancle (val) {
      this.createVisible = false
      this.$refs[val].resetFields()
      this.$refs.leftTab.clearSelection()
      this.rightTableData = []
    },
    createCertain (val) {
      this.createVisible = false
      this.$refs[val].resetFields()
      this.$refs.leftTab.clearSelection()
      this.rightTableData = []
    }
  }
}
</script>

<style lang="less" scoped>
  .search-main {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    padding-top: 20px;

    .search-input {
      /*width: 100%;*/
      display: flex;
      justify-content: space-between;
      /*margin-bottom: 15px;*/
      /*padding-top: 20px;*/
    }
  }

  .chFtColor {
    color: red;
  }

  .el-button--small, .el-button--small.is-round {
    padding: 9px 10px;
  }
</style>
