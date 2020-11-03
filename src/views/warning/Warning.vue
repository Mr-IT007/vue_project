<template>
  <div class="warning-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="资产管理" name="资产管理">
        <el-tabs v-model="innerActiveName" type="card">
          <el-tab-pane label="开放端口" name="开放端口">
            <div class="warning-search">
              <div class="port-select">
                <el-select v-model="portValue" size="small" style="width: 150px" @change="portSelect">
                  <el-option
                    v-for="item in portOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="deal-select" style="margin-left: 10px">
                <el-select v-model="dealValue" size="small" style="width: 150px" @change="dealSelect">
                  <el-option
                    v-for="item in dealOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div>
                <el-button size="small" style="margin-left: 10px; margin-right: 0"><i class="el-icon-refresh"></i></el-button>
              </div>
            </div>
            <el-table
              :data="portData"
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :cell-style="{ 'font-weight': 400 }"
            >
              <el-table-column
                prop="local_port"
                width="100"
                label="本地端口"
                align="center"
                header-align="center">
              </el-table-column>
              <el-table-column
                prop="port_type"
                width="100"
                label="端口类型"
                align="center"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="ip"
                label="绑定IP"
                align="center"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="situation"
                width="200"
                label="危险情况"
                align="center"
                header-align="center"
              />
              <el-table-column
                prop="status"
                width="100"
                label="状态"
                align="center"
                header-align="center"
              >
                <template slot-scope="scope">
                  <span :class="scope.row.status === '未处理' ? 'port-color' : ''">{{ scope.row.status }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="description"
                label="端口描述"
                align="center"
                header-align="center"
                show-overflow-tooltip
              />
              <el-table-column
                prop="pid"
                width="100"
                label="PID"
                align="center"
                header-align="center"
              />
              <el-table-column
                prop="file"
                label="程序文件"
                align="center"
                header-align="center"
                show-overflow-tooltip
              />
              <el-table-column
                width="100"
                label="操作"
                align="center"
                header-align="center">
<!--                <template slot-scope="scope">-->
<!--                  <el-button-->
<!--                    size="mini"-->
<!--                    type="primary"-->
<!--                    plain-->
<!--                    icon="el-icon-s-cooperation"-->
<!--                    @click="handleDisposal(scope.$index, scope.row)">处理</el-button>-->
<!--                </template>-->
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="进程信息" name="进程信息">
            <div class="warning-search">
              <div>
                <el-button size="small" style="margin-left: 10px; margin-right: 0"><i class="el-icon-refresh"></i></el-button>
              </div>
            </div>
            <el-table
              :data="processData"
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :cell-style="{ 'font-weight': 400 }"
            >
              <el-table-column
                prop="path"
                label="进程路径"
                align="center"
                header-align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="process"
                width="200"
                label="进程名"
                align="center"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="user"
                width="100"
                label="运行用户"
                align="center"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="pid"
                width="100"
                label="PID"
                align="center"
                header-align="center"
              />
              <el-table-column
                prop="arguments"
                label="启动参数"
                align="center"
                header-align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="start_time"
                width="200"
                label="启动时间"
                align="center"
                header-align="center"
              />
              <el-table-column
                prop="scan_time"
                width="200"
                label="扫描时间"
                align="center"
                header-align="center"
              />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="软件信息" name="软件信息">
            <div class="warning-search">
              <div class="soft-input">
                <el-input placeholder="输入软件名称" v-model="softInput" size="small">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <div>
                <el-button size="small" style="margin-left: 10px; margin-right: 0"><i class="el-icon-refresh"></i></el-button>
              </div>
            </div>
            <el-table
              :data="softData"
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :cell-style="{ 'font-weight': 400 }"
            >
              <el-table-column
                prop="soft_name"
                label="软件名称"
                align="center"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="manufacturer"
                label="厂商"
                align="center"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="format"
                label="格式"
                align="center"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="parts"
                label="部件"
                align="center"
                header-align="center"
              />
              <el-table-column
                prop="version"
                label="版本"
                align="center"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="framework"
                label="架构"
                align="center"
                header-align="center"
              />
              <el-table-column
                prop="size"
                label="大小Bytes"
                align="center"
                header-align="center"
              />
              <el-table-column
                prop="description"
                label="描述"
                align="center"
                header-align="center"
                show-overflow-tooltip
              />
              <el-table-column
                prop="scan_time"
                width="200"
                label="扫描时间"
                align="center"
                header-align="center"
              />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="漏洞管理" name="漏洞管理">
        <el-tabs v-model="activeBug" type="card">
          <el-tab-pane label="Linux软件漏洞" name="Linux软件漏洞">
            <div class="warning-search">
              <div class="urg-select">
                <el-select v-model="urgLinuxValue" size="small" style="width: 120px" @change="urgLinuxSelect">
                  <el-option
                    v-for="item in urgLinuxOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="bug-input" style="margin-left: 10px">
                <el-input placeholder="输入关键字" v-model="bugLinuxInput" size="small">
                  <el-select v-model="bugLinuxSelect" slot="prepend" placeholder="请选择" style="width: 120px">
                    <el-option label="漏洞名称" value="漏洞名称"></el-option>
                    <el-option label="漏洞编号" value="漏洞编号"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <div>
                <el-button size="small" style="margin-left: 10px; margin-right: 0"><i class="el-icon-refresh"></i></el-button>
              </div>
            </div>
            <el-table
              :data="bugLinuxData"
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :cell-style="{ 'font-weight': 400 }"
            >
              <el-table-column
                prop="bug_name"
                width="250"
                label="漏洞名称"
                align="center"
                header-align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="bug_id"
                width="100"
                label="漏洞编号"
                align="center"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="urgent"
                width="110"
                label="紧急程度"
                align="left"
                header-align="left"
              >
                <template slot-scope="scope">
                  <i v-if="scope.row.urgent === '可延后修复'" style="width: 12px; height: 12px; display: inline-block; border-radius: 50%; background-color: #E6A23C"></i>
                  <i v-else-if="scope.row.urgent === '立即修复'" style="width: 12px; height: 12px; display: inline-block; border-radius: 50%; background-color: red"></i>
                  <i v-else style="width: 12px; height: 12px; display: inline-block; border-radius: 50%; background-color: #67C23A"></i>
                  <span style="margin-left: 5px">{{ scope.row.urgent }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="info"
                label="软件信息"
                align="center"
                header-align="center"
                show-overflow-tooltip
              />
              <el-table-column
                prop="bug_detail"
                label="漏洞详情"
                align="center"
                header-align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="solution"
                label="解决方案"
                align="center"
                header-align="center"
                show-overflow-tooltip
              />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Windows漏洞" name="Windows漏洞">
            <div class="warning-search">
              <div class="urg-select">
                <el-select v-model="urgLinuxValue" size="small" style="width: 120px" @change="urgLinuxSelect">
                  <el-option
                    v-for="item in urgLinuxOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="bug-input" style="margin-left: 10px">
                <el-input placeholder="输入关键字" v-model="bugLinuxInput" size="small">
                  <el-select v-model="bugLinuxSelect" slot="prepend" placeholder="请选择" style="width: 120px">
                    <el-option label="漏洞名称" value="漏洞名称"></el-option>
                    <el-option label="漏洞编号" value="漏洞编号"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <div>
                <el-button size="small" style="margin-left: 10px; margin-right: 0"><i class="el-icon-refresh"></i></el-button>
              </div>
            </div>
            <el-table
              :data="bugLinuxData"
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :cell-style="{ 'font-weight': 400 }"
            >
              <el-table-column
                prop="bug_name"
                width="250"
                label="漏洞名称"
                align="center"
                header-align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="bug_id"
                width="100"
                label="漏洞编号"
                align="center"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="urgent"
                width="110"
                label="紧急程度"
                align="left"
                header-align="left"
              >
                <template slot-scope="scope">
                  <i v-if="scope.row.urgent === '可延后修复'" style="width: 12px; height: 12px; display: inline-block; border-radius: 50%; background-color: #E6A23C"></i>
                  <i v-else-if="scope.row.urgent === '立即修复'" style="width: 12px; height: 12px; display: inline-block; border-radius: 50%; background-color: red"></i>
                  <i v-else style="width: 12px; height: 12px; display: inline-block; border-radius: 50%; background-color: #67C23A"></i>
                  <span style="margin-left: 5px">{{ scope.row.urgent }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="info"
                label="软件信息"
                align="center"
                header-align="center"
                show-overflow-tooltip
              />
              <el-table-column
                prop="bug_detail"
                label="漏洞详情"
                align="center"
                header-align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="solution"
                label="解决方案"
                align="center"
                header-align="center"
                show-overflow-tooltip
              />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="虚拟化漏洞" name="虚拟化漏洞">
            <div class="warning-search">
              <div class="urg-select">
                <el-select v-model="urgLinuxValue" size="small" style="width: 120px" @change="urgLinuxSelect">
                  <el-option
                    v-for="item in urgLinuxOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="bug-input" style="margin-left: 10px">
                <el-input placeholder="输入关键字" v-model="bugLinuxInput" size="small">
                  <el-select v-model="bugLinuxSelect" slot="prepend" placeholder="请选择" style="width: 120px">
                    <el-option label="漏洞名称" value="漏洞名称"></el-option>
                    <el-option label="漏洞编号" value="漏洞编号"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <div>
                <el-button size="small" style="margin-left: 10px; margin-right: 0"><i class="el-icon-refresh"></i></el-button>
              </div>
            </div>
            <el-table
              :data="bugLinuxData"
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :cell-style="{ 'font-weight': 400 }"
            >
              <el-table-column
                prop="bug_name"
                width="250"
                label="漏洞名称"
                align="center"
                header-align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="bug_id"
                width="100"
                label="漏洞编号"
                align="center"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="urgent"
                width="110"
                label="紧急程度"
                align="left"
                header-align="left"
              >
                <template slot-scope="scope">
                  <i v-if="scope.row.urgent === '可延后修复'" style="width: 12px; height: 12px; display: inline-block; border-radius: 50%; background-color: #E6A23C"></i>
                  <i v-else-if="scope.row.urgent === '立即修复'" style="width: 12px; height: 12px; display: inline-block; border-radius: 50%; background-color: red"></i>
                  <i v-else style="width: 12px; height: 12px; display: inline-block; border-radius: 50%; background-color: #67C23A"></i>
                  <span style="margin-left: 5px">{{ scope.row.urgent }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="info"
                label="软件信息"
                align="center"
                header-align="center"
                show-overflow-tooltip
              />
              <el-table-column
                prop="bug_detail"
                label="漏洞详情"
                align="center"
                header-align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="solution"
                label="解决方案"
                align="center"
                header-align="center"
                show-overflow-tooltip
              />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="中间件漏洞" name="中间件漏洞">
            <div class="warning-search">
              <div class="urg-select">
                <el-select v-model="urgLinuxValue" size="small" style="width: 120px" @change="urgLinuxSelect">
                  <el-option
                    v-for="item in urgLinuxOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="bug-input" style="margin-left: 10px">
                <el-input placeholder="输入关键字" v-model="bugLinuxInput" size="small">
                  <el-select v-model="bugLinuxSelect" slot="prepend" placeholder="请选择" style="width: 120px">
                    <el-option label="漏洞名称" value="漏洞名称"></el-option>
                    <el-option label="漏洞编号" value="漏洞编号"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <div>
                <el-button size="small" style="margin-left: 10px; margin-right: 0"><i class="el-icon-refresh"></i></el-button>
              </div>
            </div>
            <el-table
              :data="bugLinuxData"
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :cell-style="{ 'font-weight': 400 }"
            >
              <el-table-column
                prop="bug_name"
                width="250"
                label="漏洞名称"
                align="center"
                header-align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="bug_id"
                width="100"
                label="漏洞编号"
                align="center"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="urgent"
                width="110"
                label="紧急程度"
                align="left"
                header-align="left"
              >
                <template slot-scope="scope">
                  <i v-if="scope.row.urgent === '可延后修复'" style="width: 12px; height: 12px; display: inline-block; border-radius: 50%; background-color: #E6A23C"></i>
                  <i v-else-if="scope.row.urgent === '立即修复'" style="width: 12px; height: 12px; display: inline-block; border-radius: 50%; background-color: red"></i>
                  <i v-else style="width: 12px; height: 12px; display: inline-block; border-radius: 50%; background-color: #67C23A"></i>
                  <span style="margin-left: 5px">{{ scope.row.urgent }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="info"
                label="软件信息"
                align="center"
                header-align="center"
                show-overflow-tooltip
              />
              <el-table-column
                prop="bug_detail"
                label="漏洞详情"
                align="center"
                header-align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="solution"
                label="解决方案"
                align="center"
                header-align="center"
                show-overflow-tooltip
              />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="基线检查" name="基线检查">
        <el-tabs v-model="activeBase" type="card">
          <el-tab-pane label="系统风险" name="系统风险">
            <el-table
              :data="sysBaseData"
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :cell-style="{ 'font-weight': 400 }"
            >
              <el-table-column
                prop="check_rules"
                label="检测规则"
                align="center"
                header-align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="thread_lv"
                label="威胁等级"
                align="center"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="scan_res"
                label="扫描结果"
                align="center"
                header-align="center"
              >
                <template slot-scope="scope">
                  <span :class="scope.row.scan_res === '未通过' ? 'scan-res' : ''">{{ scope.row.scan_res }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="scan_time"
                label="扫描时间"
                align="center"
                header-align="center"
              />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="虚拟化风险" name="虚拟化风险">
            <el-table
              :data="vmBaseData"
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :cell-style="{ 'font-weight': 400 }"
            >
              <el-table-column
                prop="check_rules"
                label="检测规则"
                align="center"
                header-align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="thread_lv"
                label="威胁等级"
                align="center"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="scan_res"
                label="扫描结果"
                align="center"
                header-align="center"
              >
                <template slot-scope="scope">
                  <span :class="scope.row.scan_res === '未通过' ? 'scan-res' : ''">{{ scope.row.scan_res }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="scan_time"
                label="扫描时间"
                align="center"
                header-align="center"
              />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="入侵检测" name="入侵检测">
        <div class="warning-search">
          <div class="input-select">
            <el-select v-model="value" size="small" style="width: 200px" @change="warningSelect">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <el-button size="small" style="margin-left: 10px; margin-right: 0"><i class="el-icon-refresh"></i></el-button>
          </div>
        </div>
        <el-table
          :data="warningData"
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
              <el-link type="primary" :underline="false" @click="warningDeal(scope.$index, scope.row)">{{ scope.row.warning_name }}</el-link>
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Warning',
  data () {
    return {
      value: '全部',
      portValue: '所有端口类型',
      urgLinuxValue: '所有紧急度',
      dealValue: '未处理',
      activeName: '入侵检测',
      activeBug: 'Linux软件漏洞',
      innerActiveName: '开放端口',
      activeBase: '系统风险',
      softInput: '',
      bugLinuxInput: '',
      bugLinuxSelect: '漏洞名称',
      warningData: [
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
      options: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '账户破解源IP',
          label: '账户破解源IP'
        },
        {
          value: '恶意程序',
          label: '恶意程序'
        },
        {
          value: '进程异常行为',
          label: '进程异常行为'
        },
        {
          value: '关键文件变更',
          label: '关键文件变更'
        },
        {
          value: '网站后门',
          label: '网站后门'
        },
        {
          value: '反弹Shell',
          label: '反弹Shell'
        },
        {
          value: '异常Shell',
          label: '异常Shell'
        },
        {
          value: '高危命令执行',
          label: '高危命令执行'
        },
        {
          value: '自启动检测',
          label: '自启动检测'
        },
        {
          value: '提权操作',
          label: '提权操作'
        },
        {
          value: 'Rootkit程序',
          label: 'Rootkit程序'
        },
        {
          value: '风险账户',
          label: '风险账户'
        }
      ],
      portOptions: [
        {
          value: '所有端口类型',
          label: '所有端口类型'
        },
        {
          value: 'TCP',
          label: 'TCP'
        },
        {
          value: 'UDP',
          label: 'UDP'
        }
      ],
      dealOptions: [
        {
          value: '所有状态',
          label: '所有状态'
        }, {
          value: '未处理',
          label: '未处理'
        }, {
          value: '已忽略',
          label: '已忽略'
        }, {
          value: '无需处理',
          label: '无需处理'
        }
      ],
      urgLinuxOptions: [
        {
          value: '所有紧急度',
          label: '所有紧急度'
        },
        {
          value: '立即修复',
          label: '立即修复'
        },
        {
          value: '可延后修复',
          label: '可延后修复'
        },
        {
          value: '暂不修复',
          label: '暂不修复'
        }
      ],
      portData: [
        {
          local_port: 'xxxx',
          port_type: 'TCP',
          ip: 'xxx.xx.xx.xxx',
          status: '验证中'
        },
        {
          local_port: 'xxxx',
          port_type: 'UDP',
          ip: 'xxx.xx.xx.xxx',
          status: '验证中'
        },
        {
          local_port: 'xxxx',
          port_type: 'TCP',
          ip: 'xxx.xx.xx.xxx',
          status: '未处理'
        },
        {
          local_port: 'xxxx',
          port_type: 'TCP',
          ip: 'xxx.xx.xx.xxx',
          status: '已忽略'
        },
        {
          local_port: 'xxxx',
          port_type: 'UDP',
          ip: 'xxx.xx.xx.xxx',
          status: '未处理'
        }
      ],
      processData: [
        {
          path: 'xxxx/xxx/xx/xxx',
          process: 'xxxxxxxxx',
          user: 'root',
          pid: 'xxxx',
          arguments: 'xxx-xxx-xxx-xxxxx',
          start_time: 'xxxx-xx-xx xx:xx:xx',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        },
        {
          path: 'xxxx/xxx/xx/xxx',
          process: 'xxxxxxxxx',
          user: 'root',
          pid: 'xxxx',
          arguments: 'xxx-xxx-xxx-xxxxx',
          start_time: 'xxxx-xx-xx xx:xx:xx',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        },
        {
          path: 'xxxx/xxx/xx/xxx',
          process: 'xxxxxxxxx',
          user: 'root',
          pid: 'xxxx',
          arguments: 'xxx-xxx-xxx-xxxxx',
          start_time: 'xxxx-xx-xx xx:xx:xx',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        },
        {
          path: 'xxxx/xxx/xx/xxx',
          process: 'xxxxxxxxx',
          user: 'root',
          pid: 'xxxx',
          arguments: 'xxx-xxx-xxx-xxxxx',
          start_time: 'xxxx-xx-xx xx:xx:xx',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        },
        {
          path: 'xxxx/xxx/xx/xxx',
          process: 'xxxxxxxxx',
          user: 'root',
          pid: 'xxxx',
          arguments: 'xxx-xxx-xxx-xxxxx',
          start_time: 'xxxx-xx-xx xx:xx:xx',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        }
      ],
      softData: [
        {
          soft_name: 'xxxxxxxxx',
          manufacturer: 'xxxxxxxx',
          format: 'xxxxxx',
          parts: 'xxxxxx',
          version: 'xxxx',
          framework: 'xxxxxxxx',
          size: 'xxxx',
          description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        },
        {
          soft_name: 'xxxxxxxxx',
          manufacturer: 'xxxxxxxx',
          format: 'xxxxxx',
          parts: 'xxxxxx',
          version: 'xxxx',
          framework: 'xxxxxxxx',
          size: 'xxxx',
          description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        },
        {
          soft_name: 'xxxxxxxxx',
          manufacturer: 'xxxxxxxx',
          format: 'xxxxxx',
          parts: 'xxxxxx',
          version: 'xxxx',
          framework: 'xxxxxxxx',
          size: 'xxxx',
          description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        },
        {
          soft_name: 'xxxxxxxxx',
          manufacturer: 'xxxxxxxx',
          format: 'xxxxxx',
          parts: 'xxxxxx',
          version: 'xxxx',
          framework: 'xxxxxxxx',
          size: 'xxxx',
          description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        },
        {
          soft_name: 'xxxxxxxxx',
          manufacturer: 'xxxxxxxx',
          format: 'xxxxxx',
          parts: 'xxxxxx',
          version: 'xxxx',
          framework: 'xxxxxxxx',
          size: 'xxxx',
          description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        }
      ],
      bugLinuxData: [
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '可延后修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '可延后修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '立即修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '暂不修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '立即修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        }
      ],
      bugWindowsData: [
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '可延后修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '可延后修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '立即修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '暂不修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '立即修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        }
      ],
      bugVmData: [
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '可延后修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '可延后修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '立即修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '暂不修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '立即修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        }
      ],
      bugMiddleData: [
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '可延后修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '可延后修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '立即修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '暂不修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        {
          bug_name: 'xxxxxxxxxxxxxxx',
          bug_id: 'xxxx',
          urgent: '立即修复',
          info: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          bug_detail: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          solution: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        }
      ],
      sysBaseData: [
        {
          check_rules: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          thread_lv: '高危',
          scan_res: '未通过',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        },
        {
          check_rules: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          thread_lv: '低危',
          scan_res: '未通过',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        },
        {
          check_rules: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          thread_lv: '高危',
          scan_res: '未通过',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        },
        {
          check_rules: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          thread_lv: '中危',
          scan_res: '未通过',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        },
        {
          check_rules: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          thread_lv: '中危',
          scan_res: '未通过',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        }
      ],
      vmBaseData: [
        {
          check_rules: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          thread_lv: '高危',
          scan_res: '未通过',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        },
        {
          check_rules: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          thread_lv: '低危',
          scan_res: '未通过',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        },
        {
          check_rules: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          thread_lv: '高危',
          scan_res: '未通过',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        },
        {
          check_rules: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          thread_lv: '中危',
          scan_res: '未通过',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        },
        {
          check_rules: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          thread_lv: '中危',
          scan_res: '未通过',
          scan_time: 'xxxx-xx-xx xx:xx:xx'
        }
      ]
    }
  },
  methods: {
    warningDeal (index, row) {
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
            h('span', null, row.status ? '已处理' : '未处理')
          ])
        ]),
        confirmButtonText: '处理'
      }).then(action => {
        this.$message({
          type: 'info',
          message: row.server_type
        })
      })
    },
    warningSelect () {
      console.log(this.value)
    },
    portSelect () {
      console.log(this.portValue)
    },
    dealSelect () {
      console.log(this.portValue)
    }
  }
}
</script>

<style lang="less" scoped>
  .warning-container {
    background-color: #fff;

    .el-tabs {
      padding: 20px;
    }
  }

  .warning-search {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
    align-items: center;
  }

  .el-button--small, .el-button--small.is-round {
    padding: 9px 10px;
  }

  .port-color {
    color: red;
  }

  .scan-res {
    color: red;
  }
</style>
