<template>
  <el-card v-loading="loading">
    <div slot="header">
      <el-button size="small" type="primary" plain round icon="el-icon-arrow-left" @click="back">返回</el-button>
    </div>
    <el-avatar :src="profile.avatar_url" @error="() => true">
      <el-avatar icon="el-icon-user-solid"></el-avatar>
    </el-avatar>
    <h4>{{ profile.loginname }}</h4>
    <div>{{ profile.score }} 积分</div>
  </el-card>
</template>

<script>
  export default {
    name: 'Profile',
    data () {
      return {
        loading: false,
        profile: {
          create_at: '',
          loginname: '',
          avatar_url: '',
          githubUsername: '',
          score: 0,
          recent_topics: [],
          recent_replies: []
        }
      }
    },
    created () {
      let name = this.$route.params.id
      this.getData(name)
    },
    methods: {
      async getData (name) {
        this.loading = true
        let url = 'https://cnodejs.org/api/v1/user/' + name
        let res = await this.$http(url)
        console.log(res.data)
        this.profile = res.data.data
        this.loading = false
      },
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped></style>
