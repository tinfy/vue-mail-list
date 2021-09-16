<template>
  <div class="maillist_container">
    <el-card>
      <el-input placeholder="请输入搜索联系人" v-model="queryParam" clearable class="query_input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <p>共有 {{contactNum}} 个联系人</p>
      <div>
        <el-radio v-model="radio" label="1">所有联系人</el-radio>
        <el-radio v-model="radio" label="2">亲人</el-radio>
        <el-radio v-model="radio" label="3">朋友</el-radio>
        <el-radio v-model="radio" label="4">同学</el-radio>
      </div>
      <div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryParam: '',
      contactNum: 0,
      radio: '1'
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.query_input {
  width: 600px;
}
</style>
