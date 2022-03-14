<template>
  <div class="maillist_container">
    <el-card>
      <el-input placeholder="请输入搜索联系人" v-model="queryParam" clearable class="query_input" @clear="getContactList">
        <el-button slot="append" icon="el-icon-search" @click="getContactList"></el-button>
      </el-input>
      <p>共有 {{contactNum}} 个联系人</p>
      <div>
        <el-radio v-model="radio" label="1">所有联系人</el-radio>
        <el-radio v-model="radio" label="2">亲人</el-radio>
        <el-radio v-model="radio" label="3">朋友</el-radio>
        <el-radio v-model="radio" label="4">同学</el-radio>
      </div>
      <div class="list-content">
        <contact-info v-for="item in contactlist" :key="item.id" :name="item.name" :mobile="item.mobile"></contact-info>
      </div>
    </el-card>
  </div>
</template>

<script>
import ContactInfo from './ContactInfo.vue'

export default {
  components: { ContactInfo },
  data () {
    return {
      queryParam: '',
      contactNum: 0,
      radio: '1',
      contactlist: []
    }
  },
  created () {
    this.getContactList()
  },
  methods: {
    getContactList () {
      const contactlist = JSON.parse(window.localStorage.getItem('contactlist') || '[]')
      if (this.queryParam !== '') {
        this.contactlist = contactlist.filter(item => item.name.includes(this.queryParam.trim()))
      } else {
        this.contactlist = contactlist
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.query_input {
  width: 600px;
}
.list-content {
  margin-top: 30px;
}
</style>
