import Vue from 'vue'

const state = {
  list: [1, 2, 3]
}

const mutations = {
  SET_LIST (state, payload) {
    state.list = payload
  }
}

const actions = {
  async getList ({ commit }, tab) {
    // do something async
    console.log(tab)
    let url = 'https://cnodejs.org/api/v1/topics?tab=' + tab
    let res = await Vue.http(url)
    console.log(res)
    let list = res.data.data
    commit('SET_LIST', list)

    return res.data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
