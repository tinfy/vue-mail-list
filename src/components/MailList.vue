<template>
  <div class="maillist_container">
    <el-card>
      <el-input placeholder="请输入搜索联系人" v-model="queryParam" clearable class="query_input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryParam: ''
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
