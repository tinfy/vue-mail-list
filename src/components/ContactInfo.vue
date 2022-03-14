<template>
  <div class="container">
    <img src="../assets/img/headicon.jpg" class="contact-headicon" alt="headicon" />
    <div class="content">
      <p class="content-name">{{name}}</p>
      <p class="content-mobile">{{mobile}}</p>
    </div>
    <i class="iconfont icon-xiugai" @click="openUpdateItemDialog(id)"></i>
    <el-popover placement="top" width="160" v-model="popoverVisible">
      <p>确定删除此联系人？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="popoverVisible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="deleteItem(id)">确定</el-button>
      </div>
      <i class="iconfont icon-shanchu" slot="reference"></i>
    </el-popover>
    <el-dialog title="联系人信息" :visible.sync="dialogVisible" width="25%" @close="closeDialog">
      <el-form :model="contactinfo" :rules="contactinfoRules" ref="contactinfoRef" label-width="60px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="contactinfo.name"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="contactinfo.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="contactinfo.email"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="contactinfo.remark"></el-input>
        </el-form-item>
        <el-form-item label="分组" prop="relation">
          <el-select v-model="contactinfo.relation" placeholder="请选择">
            <el-option label="亲人" value="qr"></el-option>
            <el-option label="朋友" value="py"></el-option>
            <el-option label="同学" value="tx"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveContactinfo(id)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ContactInfo',
  props: {
    id: {
      type: Number
    },
    name: {
      type: String,
      default: ''
    },
    mobile: {
      type: String,
      default: ''
    }
  },
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
      popoverVisible: false,
      dialogVisible: false,
      contactinfo: {},
      contactinfoRules: {
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
    deleteItem (id) {
      const contactlist = this.getLocationConcatlist()
      const index = contactlist.findIndex(item => item.id === id)
      // console.log(index)
      contactlist.splice(index, 1)
      window.localStorage.setItem('contactlist', JSON.stringify(contactlist))
      this.$emit('transfer-getcontactlist')
      this.popoverVisible = false
    },
    openUpdateItemDialog (id) {
      this.dialogVisible = true
      const contactlist = this.getLocationConcatlist()
      this.contactinfo = contactlist.find(item => item.id === id)
    },
    closeDialog () {
      this.$refs.contactinfoRef.clearValidate()
    },
    saveContactinfo (id) {
      this.$refs.contactinfoRef.validate(valid => {
        if (!valid) return false
        const contactlist = this.getLocationConcatlist()
        const index = contactlist.findIndex(item => item.id === id)
        const currentItem = contactlist[index]
        // 判断姓名是否重复，重复的话，isRepeat的值为true
        const isRepeat = contactlist.some(item => {
          return item.name === this.contactinfo.name && item.name !== currentItem.name
        })
        // 如果姓名重复，则提示修改失败，并返回
        if (isRepeat) {
          return this.$message.warning('修改失败，姓名重复')
        }
        // 不重复则把表单中修改的信息存到localSession中
        contactlist.splice(index, 1, this.contactinfo)
        localStorage.setItem('contactlist', JSON.stringify(contactlist))
        this.$emit('transfer-getcontactlist')
      })
      this.dialogVisible = false
    },
    getLocationConcatlist () {
      return JSON.parse(window.localStorage.getItem('contactlist'))
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  width: 220px;
  height: 65px;
  border: 1px solid #aaa;
  border-radius: 8px;
  margin: 12px 0 12px 30px;
  .contact-headicon {
    width: 60px;
    height: 60px;
    margin: 0 3px;
  }
  .content {
    width: 115px;
    height: 60px;
    // border: 1px solid #000;
    p {
      margin: 0;
    }
    .content-name {
      margin-top: 2px;
    }
    .content-mobile {
      margin-top: 8px;
    }
  }
}
.iconfont {
  cursor: pointer;
  font-size: 18px;
  margin: 0 3px;
}
.icon-xiugai {
  color: #0f88eb;
}
.icon-shanchu {
  color: #d81111;
}
</style>
