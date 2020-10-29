<template>
  <el-tabs type="border-card">
    <el-tab-pane label="云主机">
      <div class="search-main">
        <div>
          <el-button size="small" :disabled="!multipleSelection.length">部署策略</el-button>
          <el-button size="small" :disabled="!multipleSelection.length">分配到组</el-button>
        </div>
        <div class="search-input">
          <!--<el-select v-model="value" size="small" style="width: 120px" value="">-->
            <!--<el-option-->
              <!--v-for="item in options"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
          <!--<el-input v-model="input" placeholder="请输入关键字" size="small" style="width: 200px"></el-input>-->
          <!--<el-button type="primary" icon="el-icon-search" size="small"></el-button>-->
          <!--<el-button size="small" style="margin-left: 10px" @click="dialogVisible = true">高级搜索<i class="el-icon-caret-bottom"></i></el-button>-->
          <!--<el-button size="small" style="margin-left: 10px; margin-right: 0"><i class="el-icon-refresh"></i></el-button>-->
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
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :cell-style="{ 'font-weight': 300 }"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="agent_id"
          label="Agent ID"
          align="center"
          show-overflow-tooltip
          header-align="center">
          <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column
          prop="ip"
          label="IP"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="os"
          label="操作系统"
          align="center"
          header-align="center"
          show-overflow-tooltip>
        </el-table-column>
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
          prop="server_status"
          label="服务器状态"
          width="100"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              :type="scope.row.server_status === 'ok'? 'success': 'info'"
              :icon="scope.row.server_status === 'ok'? 'el-icon-check': 'el-icon-close'"
              circle
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="res"
          label="检测结果"
          width="100"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <span :class="scope.row.res === '有风险'? 'chFtColor': ''">{{ scope.row.res }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="version"
          label="版本"
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
              @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="虚拟机">虚拟机</el-tab-pane>
    <el-tab-pane label="分组">分组</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'Terminal',
  data () {
    return {
      tableData: [{
        agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        ip: 'xxx.xx.xx.xxx',
        os: 'Linux',
        server_status: 'ok',
        agent_status: 'ok',
        res: '有风险',
        version: '旗舰版'
      },
      {
        agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        ip: 'xxx.xx.xx.xxx',
        os: 'Linux',
        server_status: 'off',
        agent_status: 'off',
        res: '无风险',
        version: '专业版'
      },
      {
        agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        ip: 'xxx.xx.xx.xxx',
        os: 'Ubuntu',
        server_status: 'ok',
        agent_status: 'ok',
        res: '有风险',
        version: '普通版'
      },
      {
        agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        ip: 'xxx.xx.xx.xxx',
        os: 'CentOS',
        server_status: 'off',
        agent_status: 'off',
        res: '无风险',
        version: '旗舰版'
      },
      {
        agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        ip: 'xxx.xx.xx.xxx',
        os: 'RedHat',
        server_status: 'ok',
        agent_status: 'ok',
        res: '有风险',
        version: '旗舰版'
      },
      {
        agent_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        ip: 'xxx.xx.xx.xxx',
        os: 'Linux',
        server_status: 'ok',
        agent_status: 'ok',
        res: '无风险',
        version: '专业版'
      }
      ],
      multipleSelection: [],
      options: [{
        value: '服务器名称',
        label: '服务器名称'
      }, {
        value: 'IP地址',
        label: 'IP地址'
      }],
      value: '服务器名称',
      input: '',
      dialogVisible: false,
      detailVisible: false
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
