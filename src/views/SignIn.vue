<template>
  <article
    class="flex flex-col justify-center items-center absolute w-full h-full"
  >
    <h1 class="text-white text-5xl font-bold">Sign In</h1>
    <form @submit.prevent>
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
      <button type="submit" class="btn">Sign In</button>
    </form>
    <strong v-if="registered" class="text-green-300 p-4 max-w-[25ch]"
      >You have successfully registered now you must sign up</strong
    >
  </article>
</template>

<script lang="ts">
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
      registered: false
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
  @apply bg-matte-blue text-white py-2 w-full mt-4 rounded-xl hover:text-matte-light-blue hover:bg-white;
}
</style>
