<template>
  <div class="min-h-dvh min-w-full relative flex flex-col">
    <nav-bar />
    <router-view
      class="md:w-11/12 md:mx-auto md:max-w-[70rem] md:self-center"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from './components/NavBar.vue'

export default defineComponent({
  name: 'app',
  components: {
    NavBar
  }
})
</script>
