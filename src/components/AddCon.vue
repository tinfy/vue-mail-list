<template>
  <div class="addcon_container">
    <h2 class="header">添加联系人</h2>
    <el-form class="addcon_form" :model="addConForm" :rules="addConFormRules" ref="addConFormRef" label-position="right" label-width="120px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="addConForm.name" suffix-icon="iconfont icon-yonghu2" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="addConForm.mobile" suffix-icon="iconfont icon-shouji" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addConForm.email" suffix-icon="iconfont icon-youjian" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="addConForm.remark" suffix-icon="iconfont icon-beizhu" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="与我的关系" prop="relation">
        <el-select class="sel_rel" prefix-icon="iconfont icon-mima" v-model="addConForm.relation" placeholder="请选择">
          <el-option label="亲人" value="qr"></el-option>
          <el-option label="朋友" value="py"></el-option>
          <el-option label="同学" value="tx"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="add_btn" type="primary" @click="addCon">添加</el-button>
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
    // 自定义校验规则，判断邮箱是否符合规范
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/
      if (value === '' || regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的邮箱'))
    }
    return {
      addConForm: {
        name: '',
        mobile: '',
        email: '',
        remark: '',
        relation: ''
      },
      addConFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '姓名长度为2-10个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        remark: [
          { max: 20, message: '备注长度不超过20个字符', trigger: 'blur' }
        ],
        relation: [
          { required: true, message: '请选择', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    addCon () {
      this.$refs.addConFormRef.validate(valid => {
        if (!valid) {
          return false
        }
        const contactlist = JSON.parse(window.localStorage.getItem('contactlist') || '[]')
        // 判断姓名是否重复，重复的话，isRepeat的值为true
        const isRepeat = contactlist.some(item => {
          return item.name === this.addConForm.name
        })
        // 如果用户名重复，则提示用户注册失败，并返回
        if (isRepeat) {
          return this.$message.warning('添加失败，姓名重复')
        }
        // 不重复则把表单中填的信息存到localSession中，并提示用户添加成功
        contactlist.push(this.addConForm)
        localStorage.setItem('contactlist', JSON.stringify(contactlist))
        this.$message.success('添加成功')
        this.$refs.addConFormRef.resetFields()
      })
    }
  }
}
</script>

<style lang="scss">
.el-main {
  background-color: #f7fafc;
}
.addcon_container {
  position: relative;
  .header {
    width: 400px;
    position: relative;
    left: 50%;
    margin-left: -260px;
    font-size: 38px;
    letter-spacing: 1px;
    color: #606266;
    font-family: "\5E7C\5706";
    text-align: center;
  }
}
.addcon_form {
  width: 400px;
  // height: 300px;
  position: relative;
  left: 50%;
  margin-left: -300px;
  .el-form-item__label {
    font-size: 18px;
  }
  .sel_rel {
    width: 140px;
  }
  .add_btn {
    width: 160px;
    font-size: 16px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 20px;
  }
}
</style>
