import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
;(async () => {
  const data = window.sessionStorage.getItem('userData')
  if (data && JSON.parse(data)) {
    store.commit('setUserData', JSON.parse(data))
    return
  } else if (data === 'null') {
    return
  }
  const baseUrl = process.env.VUE_APP_API_URL
  if (!baseUrl) return
  try {
    const result = await fetch(`${baseUrl}/user/info/me`, {
      credentials: 'include'
    })
    const json = await result.json()
    if (json.success) {
      store.commit('setUserData', json.data)
      return
    }
    store.commit('setUserData', null)
  } catch {
    store.commit('setUserData', null)
  }
})()

createApp(App).use(store).use(router).mount('#app')
