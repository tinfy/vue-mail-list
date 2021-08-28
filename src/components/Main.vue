<template>
  <div class="main_container">
    <el-container>
      <el-header>
        <span class="head_title">速讯</span>
        <div class="head_pic">
          <span>{{userInfo.name}}，你好</span>
          <img class="head_pic" src="../assets/img/headpic.jpg" alt="headpic">
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="selectedTabIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1" @click="changeTab(1)">
              <i class="iconfont icon-tongxunlu"></i>
              <span slot="title">通讯录</span>
            </el-menu-item>
            <el-menu-item index="2" @click="changeTab(2)">
              <i class="iconfont icon-bianji"></i>
              <span slot="title">添加信息</span>
            </el-menu-item>
            <el-menu-item index="3" @click="changeTab(3)">
              <i class="iconfont icon-gerenzhongxin"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        name: '',
        password: '',
        mobile: ''
      },
      selectedTabIndex: '1'
    }
  },
  created () {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    changeTab (index) {
      if (index === 1) {
        this.selectedTabIndex = '1'
        this.$router.push('/maillist')
      } else if (index === 2) {
        this.selectedTabIndex = '2'
        this.$router.push('/addcon')
      } else {
        this.selectedTabIndex = '3'
        this.$router.push('/userinfo')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main_container {
  height: 100%;
}

.el-header {
  // line-height: 100px;
  height: 100px !important;
  background-image: url("../assets/img/bg.png");
  background-size: cover;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 400px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
}

.head_title {
  font-size: 50px;
  color: #409eff;
}
.head_pic {
  vertical-align: middle;

  span {
    font-size: 20px;
    display: inline-block;
    margin-right: 15px;
    color: #555;
  }

  img {
    width: 75px;
    height: 75px;
    border-radius: 50%;
  }
}
</style>
