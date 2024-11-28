<template>
  <article class="px-4">
    <section>
      <div v-for="(url, index) in urls" :key="index">
        <a target="_blank" :href="getBaseUrl + '/r/' + url.short">{{
          getBaseUrl + '/r/' + url.short
        }}</a>
        <div class="relative inline-block">
          <button @click="copyUrl(getBaseUrl + '/r/' + url.short)">
            <i
              class="fa-solid fa-copy ml-3 text-zinc-300 hover:text-matte-light-blue"
            ></i>
          </button>
        </div>
      </div>
    </section>
    <button class="btn" @click.prevent="reload" :disabled="loading">
      Reload
    </button>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserDashboard',
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      urls: [] as any[],
      loading: false
    }
  },
  computed: {
    getBaseUrl() {
      return window.location.origin
    }
  },
  methods: {
    async reload() {
      this.loading = true
      await this.getUrls()
      this.loading = false
    },
    async getUrls() {
      try {
        const baseUrl = process.env.VUE_APP_API_URL
        if (!baseUrl) return
        const result = await fetch(`${baseUrl}/user/info/urls`, {
          credentials: 'include'
        })
        const json = await result.json()
        if (json.success) {
          this.urls = json.data
          window.sessionStorage.setItem('urls', JSON.stringify(json.data))
          return
        }
        window.sessionStorage.setItem('urls', '[]')
      } catch {
        this.urls = []
      }
    },
    copyUrl(url: string) {
      navigator.clipboard.writeText(url)
    }
  },
  async created() {
    const data = window.sessionStorage.getItem('urls')
    if (data) {
      this.urls = JSON.parse(data)
      return
    }
    await this.getUrls()
  }
})
</script>

<style lang="postcss" scoped>
a {
  @apply text-matte-light-blue py-4;
}
.btn {
  @apply bg-matte-light-blue p-2 rounded-lg text-zinc-200 my-10 disabled:bg-matte-medium-blue disabled:text-zinc-500 disabled:cursor-not-allowed;
}
</style>
