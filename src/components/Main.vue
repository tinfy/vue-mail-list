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
        <el-aside width="280px">
          <el-menu :default-active="activeIndex" background-color="#fff" text-color="#555" active-text-color="#fff" router>
            <el-menu-item :class="{active: isActive('/' + item.path)}" :index="'/' + item.path" v-for="item in menulist" :key="item.id" @click="saveActiveIndex('/' + item.path)">
              <i :class="iconlist[item.id]"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
          <div class="logout_btn" @click="logout">
            <i class="iconfont icon-shezhi"></i>
            退出登录
          </div>
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
      activeIndex: '/maillist',
      menulist: [
        { id: 1, name: '通讯录', path: 'maillist' },
        { id: 2, name: '添加信息', path: 'addcon' },
        { id: 3, name: '个人中心', path: 'userinfo' }
      ],
      iconlist: {
        1: 'iconfont icon-tongxunlu',
        2: 'iconfont icon-bianji',
        3: 'iconfont icon-gerenzhongxin'
      }
    }
  },
  created () {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    // this.activeIndex = window.sessionStorage.getItem('activeIndex')
  },
  computed: {

  },
  methods: {
    // 保存当前激活的菜单对应的index
    saveActiveIndex (path) {
      window.sessionStorage.setItem('activeIndex', path)
      this.activeIndex = path
    },
    isActive (path) {
      return this.activeIndex === path
    },
    // 退出登录
    logout () {
      // 清除掉所有的sessionStorage
      window.sessionStorage.clear()
      this.$router.push('/home/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.main_container {
  height: 100%;
}

.el-header {
  height: 100px !important;
  background-image: url("../assets/img/bg.png");
  background-size: cover;
}

.el-container {
  height: 100%;
  .el-aside {
    position: relative;
    background-color: #eee;
  }
}

// .el-main {
//   background-color: #e9eef3;
//   color: #333;
//   text-align: center;
//   line-height: 160px;
// }

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

.el-menu-item {
  font-size: 18px;
  padding-left: 20px;
  border: 1.2px solid #eee;
  .iconfont {
    font-size: 18px;
    margin-right: 10px;
  }
}

.active {
  background-color: #0f88eb !important;
}

.logout_btn {
  position: absolute;
  right: 15px;
  bottom: 30px;
  color: #555;
  cursor: pointer;
}
</style>
