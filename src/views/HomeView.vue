<template>
  <article
    class="h-dvh w-full absolute flex flex-col justify-center items-center text-center flex-1"
  >
    <header>
      <h1 class="text-6xl text-matte-light-blue font-bold">OUS</h1>
      <h2 class="text-xl text-zinc-600 font-semibold">Open URL Shortener</h2>
    </header>
    <section>
      <form class="m-4" @submit.prevent="short">
        <form-input v-model="url" :disabled="disabled" />
      </form>
      <span v-if="shortUrl" class="text-white font-semibold"
        >Short Url:
        <br />
        <a :href="shortUrl" class="text-matte-light-blue">{{ shortUrl }}</a
        ><button @click="copyUrl"><i class="fa-solid fa-copy ml-3"></i></button
      ></span>
    </section>
  </article>
</template>

<script lang="ts">
import FormInput from '@/components/form/FormInput.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      url: '',
      shortUrl: '',
      disabled: false
    }
  },
  components: {
    FormInput
  },
  methods: {
    async short() {
      const baseUrl = process.env.VUE_APP_API_URL ?? 'http://localhost:300'
      try {
        this.disabled = true
        const response = await fetch(`${baseUrl}/api/v1/url/short`, {
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
    }
  }
})
</script>
