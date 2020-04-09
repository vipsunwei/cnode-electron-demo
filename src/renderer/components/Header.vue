<template>
  <div class="header">
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="index">
        <i class="el-icon-s-home"></i>
        <span slot="title">Home</span>
      </el-menu-item>
      <el-menu-item index="book">
        <i class="el-icon-s-management"></i>
        <span slot="title">Book</span>
      </el-menu-item>
      <el-menu-item index="about">
        <i class="el-icon-user-solid"></i>
        <span slot="title">About</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      activeIndex: 'index'
    }
  },
  methods: {
    handleSelect (index) {
      if (this.activeIndex === index) return
      this.activeIndex = index
      this.$router.push({ name: index })
    }
  },
  created () {
    let hash = window.location.hash.split('/')[1]
    hash = hash || 'index'
    this.activeIndex = hash
  },
  mounted () {
  }
}
</script>

<style scoped>
.header .el-menu{
  display: flex;
  justify-content: center;
}
</style>
