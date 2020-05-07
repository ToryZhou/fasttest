<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo bgnone" mode="horizontal" @select="handleSelect">
          <el-menu-item index="fast">Fast</el-menu-item>
          <el-menu-item index="movie">Movie</el-menu-item>
          <el-menu-item index="novel">Novel</el-menu-item>

          <!-- <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->

        </el-menu>
        <div class="line"></div>
      </el-header>
      <el-main>
        <div id="v-content" v-bind:style="{minHeight: Height+'px'}"><router-view /></div>
        <!-- <router-view/> -->
      </el-main>
      <el-footer>©2020-2021 toryzhoy</el-footer>
    </el-container>

  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      activeIndex: '1',
      Height: 0
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$router.push({path: key})
      console.log('keyPath' + keyPath)
      console.log('this.$route.path' + this.$route.path)
    }
  },
  mounted () {
    this.activeIndex = this.$route.path.substring(1, this.$route.path.length)
    // 动态设置内容高度 让footer始终居底   header+footer的高度是100
    this.Height = document.documentElement.clientHeight - 100
    // 监听浏览器窗口变化
    window.onresize = () => { this.Height = document.documentElement.clientHeight - 100 }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
  }
html,body:{margin:auto}

.bgnone {
  background-color: transparent
}
  .el-header, .el-footer {
    background-color: #f2f6fc;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
