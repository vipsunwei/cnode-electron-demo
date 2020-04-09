<template>
  <el-menu
    :default-active="activeIndex"
    :class="{'collapse' : !isCollapse}"
    :collapse="isCollapse"
    @select="handleSelect"
  >
    <el-menu-item index="all">
      <i class="el-icon-s-data"></i>
      <span slot="title">全部</span>
    </el-menu-item>
    <el-menu-item index="good">
      <i class="el-icon-star-on"></i>
      <span slot="title">精华</span>
    </el-menu-item>
    <el-menu-item index="ask">
      <i class="el-icon-question"></i>
      <span slot="title">问答</span>
    </el-menu-item>
    <el-menu-item index="share">
      <i class="el-icon-share"></i>
      <span slot="title">分享</span>
    </el-menu-item>
    <el-menu-item index="job">
      <i class="el-icon-s-cooperation"></i>
      <span slot="title">招聘</span>
    </el-menu-item>
    <el-menu-item index="dev">
      <i class="el-icon-s-marketing"></i>
      <span slot="title">测试</span>
    </el-menu-item>
    <div class="aside_wide_switch" @click="isCollapse = !isCollapse">
      <i v-show="!isCollapse" class="el-icon-arrow-left"></i>
      <i v-show="isCollapse" class="el-icon-arrow-right"></i>
    </div>
    
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '',
      isCollapse: false
    }
  },
  props: {
    route: {
      type: Object
    }
  },
  created () {
    let hash = window.location.hash.split('/')[3]
    hash = hash || 'all'
    this.activeIndex = hash
  },
  methods: {
    handleSelect (index) {
      if (this.activeIndex === index) return
      this.activeIndex = index
      this.$router.replace({ name: 'list', params: { id: index } })
    }
  }
}
</script>

<style scoped>
.el-menu-item.is-active {
  background-color: #ecf5ff;
  outline: 0;
}
.collapse {
  width: 200px;
}
.el-menu {
  border: none;
  outline: none;
  position: relative;
  flex-shrink: 0;
}
.el-menu .el-menu-item {
  text-align: center;
}
.aside_wide_switch {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0px;
  width: 9px;
  height: 59px;
  cursor: pointer;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: white;
}
.aside_wide_switch i {
  transform: translate(-2px, 18px);
  color: #303133;
}
.aside_wide_switch:hover {
  background-color: #ecf5ff;
}
.aside_wide_switch:hover i {
  color: #409EFF;
}
.aside_wide_switch .btn_switch_bg .svg_icon {
  display: inline-block;
  width: 100%;
  height: 100%;
  vertical-align: top;
  pointer-events: none;
}
</style>
