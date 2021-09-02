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
        <span class="link_text">
          首次使用？<el-link type="primary" :underline="false" @click="toRegister">点我注册</el-link>
        </span>
        <div class="btn_right">
          <el-button type="primary" size="small" @click="login">登录</el-button>
          <el-button type="info" size="small" @click="resetForm">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单对象
      loginForm: {
        name: 'tom',
        password: '123456'
      },
      // 登录表单校验规则对象
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
    // 使用编程式导航跳转到 Register 组件
    toRegister () {
      this.$router.push('/home/register')
    },
    // 点击注册按钮执行的操作
    login () {
      // 进行表单校验，只有校验成功才执行后续操作
      this.$refs.loginForm.validate(valid => {
        // 校验失败，直接返回
        if (!valid) {
          return false
        }
        // 使用setTimeout模拟异步获取数据的操作
        setTimeout(() => {
          const userlist = JSON.parse(localStorage.getItem('userlist') || '[]')
          // 判断用户名是否已经注册，没有注册的话，index的值为-1
          const index = userlist.findIndex(item => {
            return item.name === this.loginForm.name
          })
          // 如果用户名没有注册，则提示用户用户名不存在，并返回
          if (index < 0) {
            return this.$message.warning('用户名不存在，请先注册')
          }
          // 找到userlist数组中对应的用户对象
          const userObject = userlist[index]
          // 如果用户对象中的密码和表单中的密码不同，则提示用户
          if (userObject.password !== this.loginForm.password) {
            return this.$message.warning('密码错误')
          }
          // 记录一个token值，关闭页面后token值会自动删掉
          sessionStorage.setItem('token', new Date().toString())
          sessionStorage.setItem('userInfo', JSON.stringify(userObject))
          this.$message.success('登录成功')
          // 使用编程式导航到主页面
          this.$router.push('/main')
        }, 0)
      })
    },
    // 重置表单信息
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

.el-link {
  vertical-align: top;
}
</style>
