<template>
    <div class="test_logout">
      <el-button type="primary" @click.native.prevent="handleLogout">退出</el-button>
    </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    handleLogout () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
