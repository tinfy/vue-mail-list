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
      <el-form-item class="register_btn">
        <el-button type="success" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[3|4|5|8][0-9]\d{4,8}$/
      if (regMobile.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的手机号'))
    }
    return {
      registerForm: {
        name: '',
        password: '',
        mobile: ''
      },
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
    register () {
      this.$refs.registerForm.validate(valid => {
        if (!valid) {
          return false
        }
        this.$message.success('注册成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.register_box {
  width: 380px;
  height: 280px;
  border-radius: 8px;
  background-color: #fff;
}

.register_form {
  padding: 20px;
}

.register_btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
</style>
