<template>
  <div class="list-item-text">
    <div @click="navToProfile(item.author.loginname)">
      <el-avatar style="flex-shrink:0;cursor:pointer;" :src="item.author.avatar_url" @error="() => true">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
      </el-avatar>
    </div>
    
    <div style="flex: 1;padding: 0 20px;">
      <div style="display:flex;flex-wrap:nowrap;">
        <el-tag size="mini" :type="tag.type">{{ tag.label }}</el-tag>
        <el-link style="padding-left:5px" type="primary" :underline="false" @click="navToDetails(item.id)">{{ item.title }}</el-link>
      </div>

      <div style="margin-top: 10px;">
        <el-link type="info" :underline="false" @click="navToProfile(item.author.loginname)">{{item.author.loginname}}</el-link>
        <el-divider direction="vertical"></el-divider>
        <span class="font14">发表于：{{ item.create_at|fmt }}</span>
      </div>
    </div>
    <div style="margin-left: auto;">
      <span class="font14">回复：{{item.reply_count}}</span>
      <el-divider direction="vertical"></el-divider>
      <span class="font14">访问：{{item.visit_count}}</span>
    </div>
  </div>
</template>

<script>
const tags = {
  top: { type: 'danger', label: '置顶' },
  good: { type: 'warning', label: '精华' },
  ask: { type: 'info', label: '问答' },
  share: { type: 'info', label: '分享' },
  job: { type: 'info', label: '招聘' },
  dev: { type: 'info', label: '测试' }
}
export default {
  name: 'ListItem',
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    navToDetails (id) {
      console.log(id)
      this.$router.push({ name: 'details', params: { id } })
      // this.$emit('click', id)
    },
    navToProfile (id) {
      this.$router.push({ name: 'profile', params: { id } })
    }
  },
  filters: {
    fmt: function (value) {
      return value.split('T')[0]
    }
  },
  computed: {
    tag () {
      let { tab, top, good } = this.item
      return top ? tags.top : good ? tags.good : tags[tab]
    }
  }
}
</script>

<style scoped>
.list-item-text {
  display: flex;
  align-items: center;
}
.font14 {
  font-size: 14px;
}
</style>