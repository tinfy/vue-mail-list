<template>
  <div class="register_box">
    <el-form :model="registerForm" status-icon :rules="registerFormRules" ref="registerForm" class="register_form">
      <el-form-item prop="name">
        <el-input placeholder="用户名" prefix-icon="iconfont icon-yonghuming" v-model="registerForm.name"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" prefix-icon="iconfont icon-mima" v-model="registerForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input placeholder="手机" prefix-icon="el-icon-date" v-model="registerForm.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-link type="primary" :underline="false" @click="toLogin" class="login-link">返回登录></el-link>
        <el-button type="success" size="small" @click="register" class="register_btn">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    // 自定义校验规则，判断手机号是否符合规范
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[3|4|5|8][0-9]\d{4,8}$/
      if (regMobile.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的手机号'))
    }
    return {
      // 注册表单对象
      registerForm: {
        name: '',
        password: '',
        mobile: ''
      },
      // 注册表单校验规则对象
      registerFormRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { max: 8, message: '用户名长度不超过8个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 使用编程式导航跳转到 Login 组件
    toLogin () {
      this.$router.push('/home/login')
    },
    // 点击注册按钮执行的操作
    register () {
      // 进行表单校验，只有校验成功才执行后续操作
      this.$refs.registerForm.validate(valid => {
        // 校验失败，直接返回
        if (!valid) {
          return false
        }
        const userlist = JSON.parse(localStorage.getItem('userlist') || '[]')
        // 判断用户名是否重复，重复的话，isRepeat的值为true
        const isRepeat = userlist.some(item => item.name === this.registerForm.name)
        // 如果用户名重复，则提示用户注册失败，并返回
        if (isRepeat) {
          return this.$message.warning('注册失败，用户名重复')
        }
        // 不重复则把用户填的信息存到localSession中，并提示用户注册成功
        userlist.push(this.registerForm)
        localStorage.setItem('userlist', JSON.stringify(userlist))
        this.$message.success('注册成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.register_box {
  width: 380px;
  height: 265px;
  border-radius: 8px;
  background-color: #fff;
}

.register_form {
  padding: 20px;
}

.link {
  float: left;
}

.register_btn {
  float: right;
}
</style>
