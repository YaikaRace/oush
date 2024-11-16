<template>
  <header class="sticky top-0 left-0 z-10">
    <nav
      class="min-h-fit min-w-full bg-zinc-900 border-b-[1px] border-zinc-700"
    >
      <ul class="flex py-2 md:w-11/12 md:mx-auto md:max-w-[70rem]">
        <li>
          <router-link :to="{ name: 'home' }" class="nav-button"
            >Home</router-link
          >
        </li>
        <li class="ml-auto">
          <router-link :to="{ name: 'signin' }" class="nav-button"
            >Sign In</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ name: 'signup' }"
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
  @apply inline-block text-zinc-200 p-2 font-semibold mx-2;
}
.nav-button:hover {
  @apply bg-matte-blue text-zinc-200 rounded-xl;
}
</style>
