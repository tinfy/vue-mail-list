<template>
  <div class="container">
    <img src="../assets/img/headicon.jpg" class="contact-headicon" alt="headicon" />
    <div class="content">
      <p class="content-name">{{name}}</p>
      <p class="content-phone">{{phone}}</p>
    </div>
    <i class="iconfont icon-xiugai"></i>
    <i class="iconfont icon-shanchu"></i>
  </div>
</template>

<script>
export default {
  name: 'ContactInfo',
  props: {
    name: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

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
  border: 1px solid #000;
  .contact-headicon {
    width: 60px;
    height: 60px;
    margin-right: 3px;
  }
  .content {
      width: 115px;
      height: 60px;
      border: 1px solid #000;
      p {
          margin: 0;
      }
  }
}
.iconfont {
    font-size: 18px;
}
.icon-xiugai {
  color: #0f88eb;
}
.icon-shanchu {
  color: #d81111;
}
</style>
