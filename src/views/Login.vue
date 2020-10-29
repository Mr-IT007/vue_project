<template>
  <div class="login_container">
    <vue-particles />
    <div class="login_box">
      <div class="title_container">
        <h3 class="title">NARI主机监测系统</h3>
      </div>
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <el-form label-width="0px" class="login_form" ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-form-item class="login_button">
          <el-button type="primary" icon="el-icon-cloudy" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
          <!--<el-button type="info" @click.native.prevent="handleTest">Test</el-button>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'jimmy',
        password: '123456'
      },
      loginRules: {
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        // password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        username: [{ required: true, trigger: 'blur', message: '请输入用户名！' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码！' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const path = '/login'
          const payload = {
            account: this.loginForm.username,
            password: this.loginForm.password
          }
          this.$http({
            method: 'post',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            url: path,
            data: payload
          }).then(response => {
            // console.log(this.$store.state.token)
            // console.log(getData)
            // console.log(response)
            if (response.status === 200) {
              const getData = response.data
              window.sessionStorage.setItem('token', getData.token)
              // this.$store.dispatch('updateDataAsync', getData.data)
              this.loading = false
              // this.$notify({
              //   title: '登录成功',
              //   // message: '这是一条成功的提示消息',
              //   type: 'success'
              // })
              this.$router.push('/home')
            }
          }).catch(error => {
            // console.log(this.$store)
            console.log(error)
            this.$notify.error({
              title: '登录失败',
              message: '请确认账号密码后重新登录！'
            })
            this.loginForm.username = ''
            this.loginForm.password = ''
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    handleTest () {
      this.$http({
        method: 'get',
        url: 'http://172.16.30.173:5000/api/v1/test',
        // headers: {
        //   Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDM3NzkxMzQsIm5iZiI6MTYwMzc3OTEzNCwianRpIjoiZTVjNmMyNzEtOTU3MS00MTkwLTljMjktNzQzY2Q0MTBmMWUwIiwiZXhwIjoxNjAzNzgwMDM0LCJpZGVudGl0eSI6ImppbW15IiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.eFX98wVRjyiqrymVKJY02LsuQX92POS82OYcczFk08w'
        // },
        data: {
          account: this.loginForm.username,
          password: this.loginForm.password
        }
      }).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  #particles-js {
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .login_container {
    background-image: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%);
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;

    .title_container {
      width: 350px;
      position: absolute;
      left: 50%;
      top: -10%;
      transform: translate(-50%, -50%);

      .title {
        font-size: 30px;
        color: #086161;
        margin: 0 auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }
  }

  .login_box {
    width: 350px;
    height: 450px;
    background-color: #2e527bb3;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      height: 300px;
      width: 300px;
      /*border: 1px solid #eee;*/
      border-radius: 50%;
      /*padding: 5px;*/
      /*box-shadow: 0 0 10px #ddd;*/
      position: absolute;
      left: 50%;
      transform: translate(-50%, -10%);
      /*background-color: #fff;*/
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        /*background-color: #eee;*/
      }
    }
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px 15px;
    box-sizing: border-box;
  }

  .el-button {
    width: 100%;
  }

  /*.login_button {*/
  /*padding-bottom: 0px;*/
  /*}*/

</style>
