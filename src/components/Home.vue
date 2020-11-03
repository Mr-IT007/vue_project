<template>
    <el-container class="menu_container">
      <el-aside width="auto">
        <el-menu
          background-color="#304156"
          text-color="rgb(191, 203, 217)"
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath"
          class="el-menu-vertical"
          router
        >
          <el-menu-item
            v-for="item in menuData"
            :index="item.path"
            :key="item.id"
            @click="saveNavPath"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
          <!--<el-menu-item index="/terminal">-->
            <!--<i class="el-icon-s-platform"></i>-->
            <!--<span slot="title">终端管理</span>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="/thread">-->
            <!--<i class="el-icon-warning"></i>-->
            <!--<span slot="title">威胁警告</span>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="/response">-->
            <!--<i class="el-icon-s-help"></i>-->
            <!--<span slot="title">响应中心</span>-->
          <!--</el-menu-item>-->
          <!--<el-submenu index="">-->
            <!--<template slot="title">-->
              <!--<i class="el-icon-s-data"></i>-->
              <!--<span>一级菜单</span>-->
            <!--</template>-->
            <!--<el-menu-item index="/overview" disabled>-->
              <!--<template slot="title">-->
                <!--<i class="el-icon-s-promotion"></i>-->
                <!--<span>二级菜单</span>-->
              <!--</template>-->
            <!--</el-menu-item>-->
          <!--</el-submenu>-->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="toggle-btn" @click="toggleCollapse">
            <i :class="isCollapse? 'el-icon-s-unfold': 'el-icon-s-fold'"></i>
          </div>
          <el-breadcrumb separator="/" style="margin-left: 20px">
            <el-breadcrumb-item :to="{ path: '/overview' }" @click.native.prevent="breadClick">首页</el-breadcrumb-item>
<!--            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>-->
<!--            <el-breadcrumb-item v-for="(item, index) in this.breadHead" :key="index">{{ item }}</el-breadcrumb-item>-->
            <el-breadcrumb-item>{{ breadHead }}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-dropdown trigger="click" @command="handleCommand" style="right: 20px; position: absolute">
            <el-button type="info" icon="el-icon-user-solid" circle></el-button>
            <i class="el-icon-arrow-down el-icon--right" id="arrow-down"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="usercenter">个人中心</el-dropdown-item>
              <el-dropdown-item command="settings">设置</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view @getActivePath="getPath" @getCurrentBread="getBread"/>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'Home',
  created () {
    this.getMenuData()
    this.activePath = this.$route.path
  },
  data () {
    return {
      // menuData: this.$store.state.data.menuArray,
      menuData: [],
      isCollapse: false,
      activePath: '/overview',
      breadHead: '主机概览'
      // breadHead: this.$store.state.breadHead
    }
  },
  methods: {
    getPath (val) {
      this.activePath = val
    },
    getBread (val) {
      this.breadHead = val
    },
    handleCommand (command) {
      if (command === 'logout') {
        window.sessionStorage.clear()
        // const dataClear = {
        //   token: '',
        //   menuArray: []
        // }
        // this.$store.dispatch('updateDataAsync', dataClear)
        this.$router.push('/login')
      }
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    breadClick () {
      // console.log('6666666')
      this.activePath = '/overview'
    },
    getMenuData () {
      this.$http.get('/menu').then(res => {
        if (res.status === 200) {
          const resData = res.data
          // console.log(resData)
          // console.log(this.$route.path)
          this.menuData = resData.msg.data
        }
      }).catch(err => {
        console.log(err)
        this.$confirm('登录已超时，请重新登录！', '会话过期', {
          showCancelButton: false,
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$router.push('/login')
        })
      })
    },
    saveNavPath () {
      // window.sessionStorage.setItem('activePath', path)
      // console.log(this.$route.path)
      const pathHead = {
        '/terminal': '终端管理',
        '/overview': '主机概览',
        '/thread': '风险预防',
        '/protect': '高级防御'
      }
      this.breadHead = pathHead[this.$route.path]
      this.activePath = this.$route.path
    }
  }
}
</script>

<style lang="less" scoped>
  .menu_container {
    height: 100%;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 160px;
    /*min-height: 400px;*/
  }

  .el-header {
    /*background-color: #eaedf1;*/
    /*padding-left: 0;*/
    /*padding-right: 0;*/
    /*align-items: center;*/
    /*padding: 0;*/
    display: flex;
    //justify-content: space-between;
    padding-left: 10px;
    align-items: center;
    /*box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.15);*/
  }

  .el-aside {
    background-color: #304156;

    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #eaedf1;
    /*padding: 20px 20px 0 20px;*/
    /*padding: 0;*/
  }

  .toggle-btn {
    cursor: pointer;
    font-size: 20px;
    line-height: 24px;
  }

  #arrow-down {
    display: none;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
  /*.btn {*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*!*padding-right: 30px;*!*/
    /*!*padding-top: 10px;*!*/
    /*font-size: larger;*/
  /*}*/

  /*.el-button {*/
    /*!*font-size: 16px;*!*/
  /*}*/

</style>
