<template>
  <el-card v-loading="loading">
    <div slot="header" class="clearfix">
      <el-button size="small" type="primary" plain round icon="el-icon-arrow-left" @click="back">返回</el-button>
    </div>
    <h2>{{ details.title }}</h2>
    <div style="padding-top:20px">
      <span>作者：<el-link type="info" :underline="false" @click="navToProfile(details.author.loginname)">{{ details.author.loginname }}</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span>发布于：{{ details.create_at|fmt }}</span>
      <el-divider direction="vertical"></el-divider>
      <span>{{ details.visit_count }} 次浏览</span>
      <el-divider direction="vertical"></el-divider>
      <span>来自：{{ tab }}</span>
    </div>
    <el-divider></el-divider>
    <div class="content" v-html="details.content"></div>
  </el-card>
</template>

<script>
const tabs = {
  share: '分享',
  ask: '问答',
  job: '招聘',
  dev: '测试'
}
export default {
  name: 'Details',
  data () {
    return {
      loading: false,
      details: {
        author: {},
        create_at: ''
      }
    }
  },
  created () {
    let id = this.$route.params.id
    console.log(id)
    this.getData(id)
  },
  methods: {
    async getData (id) {
      this.loading = true
      let url = `https://cnodejs.org/api/v1/topic/${id}`
      let res = await this.$http(url)
      console.log(res.data.data)
      this.details = res.data.data
      this.loading = false
    },

    navToProfile (id) {
      this.$router.push({ name: 'profile', params: { id } })
    },
    back () {
      this.$router.go(-1)
    }
  },
  filters: {
    fmt: function (value) {
      return value.split('T')[0]
    }
  },
  computed: {
    tab () {
      return tabs[this.details.tab]
    }
  }
}
</script>

<style>
.content img {
  width: 100%;
}
</style>