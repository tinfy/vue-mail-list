<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="showEditDialog">编辑信息</el-button>
      </div>
      <el-table :data="userInfo" border style="width: 100%">
        <el-table-column prop="name" label="用户名" width="200">
        </el-table-column>
        <el-table-column prop="password" label="密码" width="200">
        </el-table-column>
        <el-table-column prop="mobile" label="手机" width="200">
        </el-table-column>
        <el-table-column prop="signature" label="个性签名">
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="编辑信息" :visible.sync="dialogVisible" width="30%" @close="handleClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="个性签名" prop="signature">
          <el-input v-model="editForm.signature"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      dialogVisible: false,
      userInfo: [],
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
      }
    }
  },
  created () {
    const { name } = JSON.parse(window.sessionStorage.getItem('userInfo'))
    const userlist = JSON.parse(window.localStorage.getItem('userlist'))
    const user = userlist.find(item => {
      return item.name === name
    })
    this.userInfo.push(user)
  },
  methods: {
    showEditDialog () {
      const userlist = JSON.parse(window.localStorage.getItem('userlist'))
      this.editForm = userlist.find(item => {
        return item.name === this.userInfo[0].name
      })
      this.dialogVisible = true
    },
    handleClose () {
      console.log()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
