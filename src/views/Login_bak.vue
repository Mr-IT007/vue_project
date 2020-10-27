<template>
  <div class="login_container">
    <vue-particles />
    <div class="login_box">
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
          <el-button type="primary" icon="el-icon-cloudy" @click.native.prevent="handleLogin">登录</el-button>
          <!--<el-button type="info" @click.native.prevent="handleTest">Test</el-button>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
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
          const path = 'http://localhost:5000/api/v1/login'
          const payload = {
            account: this.loginForm.username,
            password: this.loginForm.password
          }
          axios({
            method: 'post',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            url: path,
            data: payload
          }).then(response => {
            console.log(response.data)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleTest () {
      axios({
        method: 'post',
        url: 'http://localhost:5000/api/v1/register',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
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
  }

  .login_box {
    width: 350px;
    height: 400px;
    background-color: #2e527bb3;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      height: 150px;
      width: 150px;
      /*border: 1px solid #eee;*/
      border-radius: 50%;
      padding: 5px;
      /*box-shadow: 0 0 10px #ddd;*/
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
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
