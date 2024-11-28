import { createStore } from 'vuex'

export default createStore({
  state: {
    userData: null,
    loggedIn: false
  },
  getters: {},
  mutations: {
    setUserData(state, payload) {
      state.userData = payload
      if (payload !== null) {
        window.sessionStorage.setItem('userData', JSON.stringify(payload))
        state.loggedIn = true
        return
      }
      window.sessionStorage.setItem('userData', 'null')
      state.loggedIn = false
    }
  },
  actions: {},
  modules: {}
})
