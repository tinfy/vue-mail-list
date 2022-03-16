import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 联系人 id
    contactId: 0
  },
  mutations: {
    getNextContactId (state) {
      state.contactId++
    }
  },
  actions: {},
  modules: {}
})
