<template>
  <header class="sticky top-0 left-0">
    <nav class="bg-zinc-900 min-h-fit min-w-full">
      <ul class="flex py-2 md:w-11/12 md:mx-auto md:max-w-[70rem]">
        <li>
          <router-link :to="{ name: 'home' }" class="nav-button"
            >Home</router-link
          >
        </li>
        <li class="ml-auto">
          <router-link :to="{ name: 'home' }" class="nav-button"
            >Sign In</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ name: 'home' }"
            class="signup bg-matte-blue text-white rounded-xl hover:bg-white hover:text-matte-medium-blue"
            >Sign Up</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavBar'
})
</script>

<style lang="postcss" scoped>
.nav-button,
.signup {
  @apply inline-block text-white p-2 font-semibold mx-2;
}
.nav-button:hover {
  @apply bg-matte-blue text-white rounded-xl;
}
</style>
