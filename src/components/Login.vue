<template>
  <div class="login_box">
    <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" class="login_form">
      <el-form-item prop="name">
        <el-input placeholder="用户名" prefix-icon="iconfont icon-yonghuming" v-model="loginForm.name">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" prefix-icon="iconfont icon-mima" v-model="loginForm.password" show-password>
        </el-input>
      </el-form-item>
      <el-form-item class="login_btn">
        <el-button type="success" @click="register">前往注册</el-button>
        <div class="btn_right">
          <el-button :plain="true" type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        name: '',
        password: ''
      },
      loginFormRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { max: 8, message: '用户名长度不超过8个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register () {
      this.$router.push('/home/register')
    },
    login () {
      this.$refs.loginForm.validate(valid => {
        if (!valid) {
          return false
        }
        this.$message.success('登录成功')
      })
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login_box {
  width: 380px;
  height: 210px;
  border-radius: 8px;
  background-color: #fff;
}

.login_form {
  padding: 20px;
}

.login_btn {
  margin-top: 30px;

  .btn_right {
    float: right;
  }
}
</style>
