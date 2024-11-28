<template>
  <article
    class="flex flex-col justify-center items-center absolute w-full h-full"
  >
    <h1 class="text-white text-5xl font-bold">Sign Up</h1>
    <form @submit.prevent="signup" class="max-w-[17rem] w-full">
      <label for="username">Username <span class="required">*</span></label>
      <input
        :class="{ error: errors.username }"
        v-model="username"
        id="username"
        placeholder="Your Username"
        type="text"
        required
      />
      <strong v-if="errors.username" class="required">{{
        errors.email
      }}</strong>
      <label for="email">Email</label>
      <input
        :class="{ error: errors.email }"
        v-model="email"
        id="email"
        placeholder="example@email.com"
        type="email"
      />
      <strong v-if="errors.email" class="required">{{ errors.email }}</strong>
      <label for="password">Password <span class="required">*</span></label>
      <input
        :class="{ error: errors.password }"
        v-model="password"
        id="password"
        placeholder="Your Password"
        type="password"
        required
      />
      <strong v-if="errors.password" class="required">{{
        errors.password
      }}</strong>
      <label for="cpassword"
        >Confirm Password <span class="required">*</span></label
      >
      <input
        :class="{ error: errors.cPassword }"
        v-model="cPassword"
        id="cpassword"
        placeholder="Your Password again"
        type="password"
        required
      />
      <strong v-if="errors.cPassword" class="required">{{
        errors.cPassword
      }}</strong>
      <button type="submit" class="btn" :disabled="loading">Sign Up</button>
    </form>
    <strong v-if="errors.general" class="required">{{ errors.general }}</strong>
  </article>
</template>

<script lang="ts">
import isEmail from '@/utils/isEmail'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SignUp',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      cPassword: '',
      loading: false,
      errors: {
        username: '',
        email: '',
        password: '',
        cPassword: '',
        general: ''
      }
    }
  },
  methods: {
    async signup() {
      const baseUrl = process.env.VUE_APP_API_URL
      if (!baseUrl) return
      let error = false
      if (this.username.length < 3) {
        this.errors.username = 'Username must be at least 3 characters'
        error = true
      }
      if (this.email && !isEmail(this.email)) {
        this.errors.email = 'Email is invalid'
        error = true
      }
      if (this.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters'
        error = true
      }
      if (this.password !== this.cPassword) {
        this.errors.cPassword = 'Passwords do not match'
        error = true
      }
      if (error) return
      this.errors.username = ''
      this.errors.email = ''
      this.errors.password = ''
      this.errors.cPassword = ''
      this.loading = true
      try {
        const result = await fetch(`${baseUrl}/user/register`, {
          method: 'POST',
          headers: [['Content-Type', 'application/json']],
          body: JSON.stringify({
            username: this.username,
            email: this.email !== '' ? this.email : undefined,
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
        this.$router.replace({ name: 'signin', query: { success: 'true' } })
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
  @apply block text-white w-full;
}
label {
  @apply mt-2 ml-2;
}
.required {
  @apply text-red-300 text-wrap;
}
.error {
  @apply text-red-300 border-red-300 caret-red-300;
}
input {
  @apply py-2 px-3 bg-zinc-900 border-2 border-zinc-700 rounded-xl outline-none placeholder:text-zinc-600;
}
.btn {
  @apply bg-matte-blue text-white py-2 w-full mt-4 rounded-xl hover:text-matte-light-blue hover:bg-white disabled:bg-matte-medium-blue disabled:text-gray-500 disabled:cursor-not-allowed;
}
</style>
