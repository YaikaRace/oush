<template>
  <article
    class="h-dvh w-full absolute flex flex-col justify-center items-center text-center flex-1"
  >
    <header>
      <h1 class="text-6xl text-matte-light-blue font-bold">OUSH</h1>
      <h2 class="text-xl text-zinc-600 font-semibold">Open URL Shortener</h2>
    </header>
    <section>
      <form class="m-4" @submit.prevent="short">
        <url-input v-model="url" :disabled="disabled" />
      </form>
      <div v-if="shortUrl" class="text-white font-semibold">
        Short Url:
        <br />
        <a
          :href="shortUrl"
          target="_blank"
          class="text-matte-light-blue hover:underline hover:text-white"
          >{{ shortUrl }}</a
        >
        <div class="relative inline-block">
          <button @click="copyUrl">
            <i class="fa-solid fa-copy ml-3 hover:text-matte-light-blue"></i>
          </button>
          <transition name="copied">
            <span
              v-if="copied"
              class="bg-white text-zinc-950 p-1 rounded-lg absolute text-xs min-w-max -bottom-8 -left-1/2 -translate-x-1/2 -z-10"
              >Copied to clipboard!</span
            >
          </transition>
        </div>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import UrlInput from '@/components/form/UrlInput.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      url: '',
      shortUrl: '',
      disabled: false,
      copied: false
    }
  },
  components: {
    UrlInput
  },
  methods: {
    async short() {
      const baseUrl = process.env.VUE_APP_API_URL ?? 'http://localhost:3000'
      try {
        this.disabled = true
        const response = await fetch(`${baseUrl}/url/short`, {
          method: 'POST',
          headers: [['Content-Type', 'application/json']],
          body: JSON.stringify({
            url: this.url
          }),
          credentials: 'include'
        })
        const json = await response.json()
        if (!json.success) {
          this.disabled = false
        }
        this.shortUrl = json.data.short
        this.disabled = false
      } catch {
        this.disabled = false
      }
    },
    copyUrl() {
      navigator.clipboard.writeText(this.shortUrl)
      this.copied = true
      const timeout = setTimeout(() => {
        this.copied = false
        clearTimeout(timeout)
      }, 3000)
    }
  }
})
</script>

<style lang="postcss" scoped>
.copied-enter-from,
.copied-leave-to {
  @apply opacity-0 -translate-y-8;
}
.copied-enter-active,
.copied-leave-active {
  @apply transition-all duration-200;
}
article {
  background: radial-gradient(circle, rgb(39 39 42 / 0.25) 10%, transparent 11%),
    radial-gradient(
      circle at bottom left,
      rgb(39 39 42 / 0.25) 5%,
      transparent 6%
    ),
    radial-gradient(
      circle at bottom right,
      rgb(39 39 42 / 0.25) 5%,
      transparent 6%
    ),
    radial-gradient(circle at top left, rgb(39 39 42 / 0.25) 5%, transparent 6%),
    radial-gradient(
      circle at top right,
      rgb(39 39 42 / 0.25) 5%,
      transparent 6%
    );
  background-size: 3em 3em;
  background-color: #18181b;
  opacity: 1;
}
</style>
