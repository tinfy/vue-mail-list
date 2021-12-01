<template>
  <div class="userinfo_container">
    <h2 class="header">个人信息</h2>
    <el-form class="userinfo_form" :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px" :disabled="disabledFlag">
      <el-form-item label="用户名">
        <el-input v-model="editForm.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="editForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="editForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="个性签名" prop="signature">
        <el-input v-model="editForm.signature"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn" v-show="disabledFlag">
      <el-button class="edit_btn" type="primary" @click="editInfo">编辑信息</el-button>
    </div>
    <div class="btn" v-show="!disabledFlag">
      <el-button class="save_btn" type="primary" @click="saveInfo">保存</el-button>
      <el-button class="back_btn" type="info" @click="goback">返回</el-button>
    </div>
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
      editForm: {},
      editFormRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      disabledFlag: true
    }
  },
  created () {
    const { name } = JSON.parse(window.sessionStorage.getItem('userInfo'))
    const userlist = JSON.parse(window.localStorage.getItem('userlist'))
    const user = userlist.find(item => {
      return item.name === name
    })
    this.editForm = user
  },
  methods: {
    editInfo () {
      this.disabledFlag = false
    },
    saveInfo () {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) {
          return false
        }
        const userlist = JSON.parse(window.localStorage.getItem('userlist'))
        const index = userlist.findIndex(item => {
          return item.name === this.editForm.name
        })
        userlist.splice(index, 1, this.editForm)
        window.localStorage.setItem('userlist', JSON.stringify(userlist))
        this.$message.success('修改成功')
        this.disabledFlag = true
      })
    },
    goback () {
      this.disabledFlag = true
    }
  }
}
</script>

<style lang="scss">
.userinfo_container {
  position: relative;
  .header {
    position: relative;
    left: 50%;
    margin-left: -250px;
    width: 400px;
    text-align: center;
    font-size: 38px;
    font-family: "\5E7C\5706";
    color: #606266;
    letter-spacing: 1px;
  }
  .userinfo_form {
    width: 400px;
    position: relative;
    left: 50%;
    margin-left: -250px;
    .el-form-item__label {
      font-size: 18px;
    }
  }
  .btn {
    // border: 1px solid #000;
    position: relative;
    left: 50%;
    margin-left: -150px;
    width: 300px;
    font-size: 16px;
    .edit_btn {
      width: 300px;
    }
    .save_btn {
      width: 145px;
    }
    .back_btn {
      width: 145px;
    }
  }
}
</style>
