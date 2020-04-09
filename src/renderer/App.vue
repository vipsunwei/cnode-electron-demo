<template>
  <div id="app">
    <el-container class="container">
      <el-header><Header /></el-header>
      <el-main class="main-content"><router-view></router-view></el-main>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'cnode-electron-demo',
  components: {Header}
}
</script>

<style>
/* CSS */
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app, .container {
  width: 100%;
  height: 100%;
}
.container .el-header, .container .main-content {
  padding: 0;
}
</style>
