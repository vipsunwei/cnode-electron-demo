<template>
  <el-container>
    <Aside :route="$route" />
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>

</template>

<script>
import Aside from '@/components/Aside'
export default {
  name: 'Index',
  components: { Aside },
  data () {
    return {

    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let routeName = to.name
      if (routeName === 'index') {
        vm.$router.push({ name: 'list', params: { id: 'all' } })
      }
    })
  }
}
</script>

<style scoped>
.el-container {
  height: 100%;
  padding: 0;
}
.el-container .el-aside, .el-container .el-menu {
  background-color: #f8f8f8;
}
.el-container .el-main {
  padding: 0;
}
</style>