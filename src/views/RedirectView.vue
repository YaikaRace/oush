<template>
  <article
    class="text-white h-full min-w-full flex flex-col justify-center items-center absolute bg-zinc-900 z-20 text-center"
  >
    <div v-if="!error">
      <h1 class="text-5xl font-bold">You are being redirected...</h1>
      <span class="text-zinc-600 font-semibold text-xl"
        >This may take a while depending on your connection.</span
      >
    </div>
    <div v-else>
      <h1 class="text-5xl font-bold">There was an error redirecting</h1>
      <span class="text-zinc-500 font-semibold text-xl"
        >Do you want to try it again?</span
      >
      <div class="mt-8">
        <router-link :to="{ name: 'home' }" class="btn">Home</router-link>
        <button @click="refresh" class="btn">Try again</button>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RedirectView',
  data() {
    return {
      error: false
    }
  },
  async mounted() {
    const id = this.$route.params.id
    const baseUrl = process.env.VUE_APP_API_URL
    if (!id || !baseUrl || id.length !== 8) {
      this.error = true
      return
    }
    try {
      const response = await fetch(`${baseUrl}/api/v1/url/redirect/${id}`)
      const json = await response.json()
      console.log(json)
      if (!json.success) {
        this.error = true
        return
      }
      window.location.replace(json.data.url)
    } catch (e) {
      this.error = true
    }
  },
  methods: {
    refresh() {
      window.location.reload()
    }
  }
})
</script>

<style lang="postcss" scoped>
.btn {
  @apply bg-matte-blue py-2 px-4 inline-block rounded-xl mx-2 min-w-32 font-semibold;
}
.btn:hover {
  @apply bg-white text-matte-light-blue;
}
</style>
