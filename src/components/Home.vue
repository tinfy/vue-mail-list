<template>
  <div class="login_container">
    <div class="login_header">
      <h1 class="login_title">速讯</h1>
      <h2 class="login_subtitle">拉近我们心灵的距离，感知爱与牵绊</h2>
    </div>
    <!-- 路由匹配到的组件渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  display: flex;
  justify-content: center;
  // align-items: center;
  height: 100%;
  min-width: 420px;
  background: url("../assets/img/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  flex-wrap: wrap;
  align-content: flex-start;
}

.login_header {
  width: 100%;
  margin-top: 100px;

  .login_title {
    height: 40px;
    font-size: 50px;
    letter-spacing: 10px;
    color: #409eff;
    font-family: "Times New Roman", Times, serif;
    text-align: center;
  }

  .login_subtitle {
    height: 20px;
    font-size: 16px;
    font-weight: normal;
    letter-spacing: 2px;
    font-family: "Microsoft YaHei", sans-serif;
    text-align: center;
  }
}
</style>
