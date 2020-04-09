<template>
  <el-card class="box-card" ref="boxCard" v-loading="loading">
    <template v-for="(o, i) in list">
      <div class="list-item" :key="o.id">
        <ListItem :item="o" />
        <div class="list-item-divider">
          <el-divider v-if="i===(list.length-1)" content-position="center">已加载全部</el-divider>
          <el-divider v-else></el-divider>
        </div>
      </div>
    </template>
    <div v-if="!list.length && !loading">暂无数据</div>
  </el-card>
</template>

<script>
import ListItem from '@/components/ListItem.vue'
let tab = ''
export default {
  name: 'List',
  components: { ListItem },
  data () {
    return {
      loading: false,
      list: []
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     let tab = to.params.id
  //     vm.tab = tab
  //     vm.getData(tab)
  //   })
  // },
  beforeRouteUpdate (to, from, next) {
    const boxCard = this.$refs.boxCard
    boxCard.$el.scrollTop = 0
    tab = to.params.id
    console.log('beforeRouteUpdate--', tab)
    this.getData(tab)
    next()
  },
  created () {
    tab = this.$route.params.id
    this.getData(tab)
  },
  methods: {
    async getData (tab) {
      // let r = await this.$store.dispatch('List/getList', tab)
      // console.log('结果：', r)
      this.loading = true
      let url = `https://cnodejs.org/api/v1/topics?tab=${tab}&mdrender=false&page=1&limit=10`
      let res = await this.$http(url)
      this.loading = false
      this.list = res.data.data
      console.log('结果：', this.list)
    }
  },
  computed: {
    noMore () {
      return this.list.length
    }
    // list () { return this.$store.state.List.list }
    // loading () { return this.$store.state.List.loading }
  }
}
</script>

<style scoped>
.box-card {
  height: 100%;
  overflow-y: auto;
}
.box-card .el-divider__text.is-center {
  color: #DCDFE6; font-weight: 400;
}
</style>