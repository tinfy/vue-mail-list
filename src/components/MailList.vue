<template>
  <div class="maillist_container">
    <el-card>
      <el-input placeholder="请输入搜索联系人" v-model="queryParam" clearable class="query_input" @clear="getContactList">
        <el-button slot="append" icon="el-icon-search" @click="getContactList"></el-button>
      </el-input>
      <p>共有 {{contactNum}} 个联系人</p>
      <div>
        <el-radio v-model="radio" label="all" @change="getContactList">所有联系人</el-radio>
        <el-radio v-model="radio" label="qr" @change="getContactList">亲人</el-radio>
        <el-radio v-model="radio" label="py" @change="getContactList">朋友</el-radio>
        <el-radio v-model="radio" label="tx" @change="getContactList">同学</el-radio>
      </div>
      <div class="list-content">
        <!-- 子组件定义了一个 transfer-getcontactlist 方法 -->
        <contact-info v-for="item in contactlist" :key="item.id" :id="item.id" :name="item.name" :mobile="item.mobile" @transfer-getcontactlist="getContactList"></contact-info>
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
      // 搜索框中的查询参数
      queryParam: '',
      // 联系人数量
      contactNum: 0,
      // 单选按钮选中的值
      radio: 'all',
      // 联系人列表
      contactlist: []
    }
  },
  created () {
    this.getContactList()
  },
  methods: {
    // 获取联系人列表
    getContactList () {
      let contactlist = JSON.parse(window.localStorage.getItem('contactlist') || '[]')
      // 按照搜索框中的参数过滤
      if (this.queryParam !== '') {
        contactlist = contactlist.filter(item => item.name.includes(this.queryParam.trim()))
      }
      // 按照单选按钮选中的值过滤
      if (this.radio !== 'all') {
        contactlist = contactlist.filter(item => item.relation === this.radio)
      }
      this.contactlist = contactlist
      this.contactNum = this.contactlist.length
    }
  }
}
</script>

<style lang="scss" scoped>
.query_input {
  width: 600px;
}
.list-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  // align-content: space-around;
  margin-top: 30px;
}
</style>
