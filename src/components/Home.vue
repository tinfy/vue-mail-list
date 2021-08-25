<template>
  <div class="login_container">
    <div class="login_header">
      <h1 class="login_title">速讯</h1>
      <h2 class="login_subtitle">拉近我们心灵的距离，感知爱与牵绊</h2>
    </div>
    <router-view></router-view>
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
      this.$router.push('/register')
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
.login_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-width: 420px;
  background: url("../assets/img/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  flex-wrap: wrap;
  align-content: center;
}

.login_header {
  width: 100%;
  margin-top: -150px;

  .login_title {
    height: 40px;
    font-size: 50px;
    letter-spacing: 10px;
    color: #409eff;
    font-family: "Times New Roman", Times, serif;
    text-align: center;
  }

  .login_subtitle {
    height: 20px;
    font-size: 16px;
    font-weight: normal;
    letter-spacing: 2px;
    font-family: "Microsoft YaHei", sans-serif;
    text-align: center;
  }
}
</style>
