<template>
  <article
    class="flex flex-col justify-center items-center absolute w-full h-full"
  >
    <h1 class="text-white text-5xl font-bold">Sign In</h1>
    <form @submit.prevent="signIn">
      <label for="username">Username / Email</label>
      <input
        v-model="username"
        id="username"
        placeholder="example@email.com"
        type="text"
        required
      />
      <label for="password">Password</label>
      <input
        v-model="password"
        id="password"
        placeholder="Your Password"
        type="password"
        required
      />
      <button type="submit" class="btn" :disabled="loading">Sign In</button>
    </form>
    <strong v-if="registered" class="text-green-300 p-4 max-w-[25ch]"
      >You have successfully registered now you must sign in</strong
    >
  </article>
</template>

<script lang="ts">
import store from '@/store'
import isEmail from '@/utils/isEmail'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SignIn',
  mounted() {
    this.registered = Boolean(this.$route.query.success)
  },
  data() {
    return {
      username: '',
      password: '',
      errors: {
        username: '',
        password: '',
        general: ''
      },
      registered: false,
      loading: false
    }
  },
  methods: {
    async signIn() {
      const baseUrl = process.env.VUE_APP_API_URL
      if (!baseUrl) return
      let error = false
      if (!isEmail(this.username) && this.username.length < 3) {
        this.errors.username = 'Username must be at least 3 characters'
        error = true
      }
      if (this.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters'
        error = true
      }
      if (error) return
      this.errors.username = ''
      this.errors.password = ''
      this.loading = true
      try {
        const result = await fetch(`${baseUrl}/user/login`, {
          method: 'POST',
          headers: [['Content-Type', 'application/json']],
          body: JSON.stringify({
            username: this.username,
            password: this.password
          }),
          credentials: 'include'
        })
        const json = await result.json()
        if (!json.success) {
          this.loading = false
          if (Object.keys(this.errors).includes(json.field)) {
            // eslint-disable-next-line @typescript-eslint/no-extra-semi
            ;(this.errors as { [key: string]: string })[json.field as string] =
              json.message
            return
          }
          this.errors.general = json.message
          return
        }
        this.loading = false
        console.log(json.data)
        store.commit('setUserData', json.data.user)
        this.$router.replace({ name: 'home' })
      } catch {
        this.errors.general = 'There was an error, please try again later.'
        this.loading = false
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
label,
input {
  @apply block text-white;
}
label {
  @apply mt-2 ml-2;
}
input {
  @apply py-2 px-3 bg-zinc-900 border-2 border-zinc-700 rounded-xl outline-none placeholder:text-zinc-600;
}
.btn {
  @apply bg-matte-blue text-white py-2 w-full mt-4 rounded-xl hover:text-matte-light-blue hover:bg-white disabled:bg-matte-medium-blue disabled:text-gray-500 disabled:cursor-not-allowed;
}
</style>
