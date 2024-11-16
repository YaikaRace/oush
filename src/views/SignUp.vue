<template>
  <article
    class="flex flex-col justify-center items-center absolute w-full h-full"
  >
    <h1 class="text-white text-5xl font-bold">Sign Up</h1>
    <form @submit.prevent>
      <label for="username">Username <span class="required">*</span></label>
      <input
        v-model="username"
        id="username"
        placeholder="Your Username"
        type="text"
        required
      />
      <label for="email">Email</label>
      <input
        v-model="email"
        id="email"
        placeholder="example@email.com"
        type="email"
      />
      <label for="password">Password <span class="required">*</span></label>
      <input
        v-model="password"
        id="password"
        placeholder="Your Password"
        type="password"
        required
      />
      <label for="cpassword"
        >Confirm Password <span class="required">*</span></label
      >
      <input
        v-model="cPassword"
        id="cpassword"
        placeholder="Your Password again"
        type="password"
        required
      />
      <button type="submit" class="btn">Sign Up</button>
    </form>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SignUp',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      cPassword: ''
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
.required {
  @apply text-red-300;
}
input {
  @apply py-2 px-3 bg-zinc-900 border-2 border-zinc-700 rounded-xl outline-none placeholder:text-zinc-600;
}
.btn {
  @apply bg-matte-blue text-white py-2 w-full mt-4 rounded-xl hover:text-matte-light-blue hover:bg-white;
}
</style>
