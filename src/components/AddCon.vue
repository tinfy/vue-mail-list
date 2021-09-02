<template>
  <div class="addcon_container">
    <h2 class="header">添加联系人</h2>
    <el-form class="addcon_form" label-position="right" label-width="120px" :model="addConForm">
      <el-form-item label="姓名">
        <el-input v-model="addConForm.name" suffix-icon="iconfont icon-yonghu2" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="addConForm.mobile" suffix-icon="iconfont icon-shouji" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="addConForm.email" suffix-icon="iconfont icon-youjian" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="addConForm.remark" suffix-icon="iconfont icon-beizhu" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="关系">
        <el-select class="sel_rel" prefix-icon="iconfont icon-mima" v-model="addConForm.relation" placeholder="请选择关系">
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
    return {
      addConForm: {
        name: '',
        mobile: '',
        email: '',
        remark: '',
        relation: ''
      }
    }
  },
  methods: {
    addCon () {

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
    margin-left: -150px;
    font-size: 38px;
    letter-spacing: 1px;
    color: #606266;
    font-family: "\5E7C\5706";
  }
}
.addcon_form {
  width: 400px;
  height: 300px;
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
    width: 140px;
    font-size: 16px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
